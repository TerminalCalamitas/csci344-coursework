import React from "react";
import { postDataToServer, getDataFromServer } from "../server-requests";

export const AddComment = ({ token, postId, postData, setPostData }) => {
  const post_tag = "#post" + postId;

  //TODO: add Comment to post
  const addComment = async (e) => {
    e.preventDefault();
    const inputBox = document.querySelector(post_tag).querySelector("input");
    const comment = inputBox.value;

    if (comment !== "") {
      sendComment(comment)
        .then(reaquirePostData)
        .then(() => {
          inputBox.value = "";
          inputBox.focus();
        });
    }
  };

  async function sendComment(comment) {
    const commentData = {
      post_id: `${postId}`,
      text: `${comment}`,
    };
    const response = await postDataToServer(
      token,
      "/api/comments",
      commentData,
    );
  }

  async function reaquirePostData() {
    const newData = await getDataFromServer(token, `/api/posts/${postId}/`);
    setPostData(newData);
  }

  return (
    <div>
      <form
        onSubmit={addComment}
        className="flex justify-between items-center p-3"
      >
        <div className="flex items-center gap-3 min-w-[80%]">
          <i className="far fa-smile text-lg"></i>
          <input
            aria-label="add a comment"
            type="text"
            className="min-w-[80%] focus:outline-none"
            placeholder="Add a comment..."
          />
        </div>
        <button
          aria-label="post comment"
          className="text-blue-700 py-2"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
};
