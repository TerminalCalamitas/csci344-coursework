import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        """
        Return the first 20 posts in the user's feed.
        If user specifies a limit, honor it unless it's above 50, then return an error.
        """

        limit = request.args.get("limit")
        if limit is None:
            limit = 20

        try:
            limit = int(limit)
        except:
            return Response(json.dumps({"message": "limit must be an integer"}), mimetype="application/json", status=400)

        if limit > 50:
            return Response(json.dumps({"message": "limit must be less than 50"}), mimetype="application/json", status=400)

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        posts = (
            Post.query
            .filter(Post.user_id.in_(ids_for_me_and_my_friends))
            .limit(limit)
        )

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        # required
        data = request.json

        image_url = data.get("image_url")
        if image_url is None:
            return Response(
                json.dumps({"message": "image_url is a required field"}),
                mimetype="application/json",
                status=400
            )

        # optional
        caption = data.get("caption")
        alt_text = data.get("alt_text")

        post = Post(
            image_url=image_url,
            user_id=self.current_user.id,
            caption=caption,
            alt_text=alt_text,
        )

        db.session.add(post)
        db.session.commit()

        return Response(
            json.dumps(post.to_dict(user=self.current_user)),
            mimetype="application/json",
            status=201,
        )


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)

        data = request.json
        post = Post.query.get(id)

        # check if post doesn't exist then send error
        if post is None:
            return Response(
                json.dumps({"message": "post not found"}),
                mimetype="application/json",
                status=404,
            )

        # if post not by logged in user then send error 
        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "you are not authorized to edit this post"}),
                mimetype="application/json",
                status=404,
            )

        image_url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")

        # if image_url exits update image_url
        if image_url is not None:
            post.image_url = image_url

        # if caption exits update caption
        if caption is not None:
            post.caption = caption

        # if alt_text exits update alt_text
        if alt_text is not None:
            post.alt_text = alt_text

        # save changes to the database
        db.session.commit()
        
        # return the updated post
        new_post = Post.query.get(id)
        return Response(json.dumps(new_post.to_dict()), mimetype="application/json", status=200)

    def delete(self, id):
        print("POST id=", id)

        post = Post.query.get(id)

        # check if post doesn't exist then send error
        if post is None:
            return Response(
                json.dumps({"message": f"post id={id} not found"}),
                mimetype="application/json",
                status=404,
            )

        # if post not by logged in user then send error
        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": f"you are not authorized to get post id={id}"}),
                mimetype="application/json",
                status=404,
            )

        # delete the post
        Post.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(
                json.dumps({"message": f"post id={id} deleted"}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        print("POST id=", id)

        post = Post.query.get(id)
        
        # check if post doesn't exist then send error
        if post is None:
            return Response(
                json.dumps({"message": "post not found"}),
                mimetype="application/json",
                status=404,
            )

        # if post not by logged in user then send error
        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "you are not authorized to get this post"}),
                mimetype="application/json",
                status=404,
            )


        return Response(
            json.dumps(post.to_dict()),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
