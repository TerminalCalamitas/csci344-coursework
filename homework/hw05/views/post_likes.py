import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from views import get_authorized_user_ids

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        # get request data
        request_data = request.get_json()
        
        # Step 1: Get the post_id from the request body
        post_id = request_data.get("post_id")
        
        # Step 1.5: Check if post_id is provided
        if post_id is None:
            return Response(
                json.dumps({"message": "post_id is a required field"}),
                mimetype="application/json",
                status=400
            )
        
        # Step 2: Check if post_id is an integer
        try:
            post_id = int(post_id)
        except Exception as e:
            return Response(
                json.dumps({"message": "post_id must be an integer"}),
                mimetype="application/json",
                status=400
            )

        # Step 3: Check if post_id exists in the database
        post = Post.query.get(post_id) 
        if post is None:
            return Response(
                json.dumps({"message": f"post id={post_id} not found"}),
                mimetype="application/json",
                status=404,
            )
        # Step 3.5: Check that the user has access to the post
        
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        
        if post.user_id not in ids_for_me_and_my_friends:
            return Response(
                json.dumps({"message": "you are not authorized to like this post"}),
                mimetype="application/json",
                status=404,
            )

        # Step 4: Check if post_id is already liked by the current user
        # get the like where the post_id matches the request post_id and the user_id matches the current user
        like = LikePost.query.filter(LikePost.post_id == post_id, LikePost.user_id == self.current_user.id).first()
        
        if like is not None:
            return Response(
                json.dumps({"message": "post already liked"}),
                mimetype="application/json",
                status=400,
            )

        # Step 5: Create a new like object and add it to the database
        new_like = LikePost(
            post_id=post_id,
            user_id=self.current_user.id,
        )

        db.session.add(new_like)
        db.session.commit()

        # Step 6: Return the new like object as a JSON response with a 201 status code
        return Response(
            json.dumps(new_like.to_dict()),
            mimetype="application/json",
            status=201,
        )



class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        like = LikePost.query.get(id)
        # check if like doesn't exist then send error
        if like is None:
            return Response(
                json.dumps({"message": f"like id={id} not found"}),
                mimetype="application/json",
                status=404,
            )

        # if like not by logged in user then send error
        if like.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": f"you are not authorized to delete like id={id}"}),
                mimetype="application/json",
                status=404,
            )
        # delete the like
        LikePost.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(
                json.dumps({"message": f"like id={id} deleted"}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
