import React, { useState, useEffect } from "react";
import { LikeButton } from "./LikeButton.jsx";
import { BookmarkButton } from "./BookmarkButton.jsx";
import { AddComment } from "./AddComment.jsx";

export function Post({ token, postJSON }) {
  const [postData, setPostData] = useState(postJSON);
  const [likeNum, setLikeNum] = useState(postJSON.likes.length);
  const [commentNum, setCommentNum] = useState(
    Object.keys(postJSON.comments).length,
  );
  const postId = postData.id;

  useEffect(() => {
    setLikeNum(postData.likes.length);
    setCommentNum(Object.keys(postData.comments).length);
  }, [postData]);

  return (
    <section id={"post" + postId} className="bg-white border mb-10">
      <div className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">
          {postData.user.username}
        </h3>
        <button aria-label="post options" className="icon-button">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      <img
        src={postData.image_url}
        alt={postData.alt_text || "Post Photo"}
        width="300"
        height="300"
        className="w-full bg-cover"
      />
      <div className="p-4">
        <div className="flex justify-between text-2xl mb-3">
          <div className="flex gap-2">
            <LikeButton
              token={token}
              likeId={postData.current_user_like_id}
              postId={postId}
              likeNum={likeNum}
              setLikeNum={setLikeNum}
            />
            <button aria-label="view comment section">
              <i className="far fa-comment"></i>
            </button>
            <button aria-label="share post">
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
          <BookmarkButton
            token={token}
            bookmarkId={postData.current_user_bookmark_id}
            postId={postId}
          />
        </div>
        <p className="font-bold mb-3">{likeNum} likes</p>
        <div className="text-sm mb-3">
          <p className="flex gap-2">
            <strong>{postData.user.username}</strong>
            {postData.caption}
          </p>
        </div>
        <p className="uppercase text-gray-500 text-xs">
          {postData.display_time}
        </p>

        {commentNum > 1 && (
          <button
            aria-label="view all comments"
            className="text-blue-700 text-sm py-2"
          >
            View all {commentNum} comments
          </button>
        )}
        {commentNum > 0 && (
          <div>
            <p className="text-sm mb-3 flex gap-2">
              <strong>{postData.comments[commentNum - 1].user.username}</strong>
              {postData.comments[commentNum - 1].text}
            </p>

            <p className="uppercase text-gray-500 text-xs">
              {postData.comments[commentNum - 1].display_time}
            </p>
          </div>
        )}
      </div>
      <AddComment
        token={token}
        postId={postId}
        postData={postData}
        setPostData={setPostData}
      />
    </section>
  );
}
