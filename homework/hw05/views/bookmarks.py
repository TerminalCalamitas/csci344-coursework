import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import get_authorized_user_ids


class BookmarksListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        # Get all bookmarks for the current user

        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id)

        # From bookmarks only get the id, and post data, the post data should only have id, image_url, caption, alt_text, and user data
        data = [item.to_dict() for item in bookmarks.all()]

        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )

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
                status=400,
            )

        # Step 2: Check if post_id is an integer
        try:
            post_id = int(post_id)
        except Exception:
            return Response(
                json.dumps({"message": "post_id must be an integer"}),
                mimetype="application/json",
                status=400,
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
                json.dumps({"message": "you are not authorized to bookmark this post"}),
                mimetype="application/json",
                status=404,
            )

        # Step 4: Check if post_id is already bookmarked by the current user
        # get the bookmark where the post_id matches the request post_id and the user_id matches the current user
        bookmark = Bookmark.query.filter(
            Bookmark.post_id == post_id, Bookmark.user_id == self.current_user.id
        ).first()

        if bookmark is not None:
            return Response(
                json.dumps({"message": "post already bookmarked"}),
                mimetype="application/json",
                status=400,
            )

        # Step 5: Create a new bookmark object and add it to the database
        new_bookmark = Bookmark(
            post_id=post_id,
            user_id=self.current_user.id,
        )

        db.session.add(new_bookmark)
        db.session.commit()

        # Step 6: Return the new bookmark object as a JSON response with a 201 status code
        return Response(
            json.dumps(new_bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        print("Bookmark id=", id)

        bookmark = Bookmark.query.get(id)
        # check if bookmark doesn't exist then send error
        if bookmark is None:
            return Response(
                json.dumps({"message": f"bookmark id={id} not found"}),
                mimetype="application/json",
                status=404,
            )

        # if bookmark not by logged in user then send error
        if bookmark.user_id != self.current_user.id:
            return Response(
                json.dumps(
                    {"message": f"you are not authorized to delete bookmark id={id}"}
                ),
                mimetype="application/json",
                status=404,
            )
        # delete the bookmark
        Bookmark.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(
            json.dumps({"message": f"bookmark id={id} deleted"}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
