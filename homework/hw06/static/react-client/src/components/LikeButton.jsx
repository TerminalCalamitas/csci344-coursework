import React, { useState } from "react";
import { deleteDataFromServer, postDataToServer } from "../server-requests.jsx";

export function LikeButton({ token, likeId, postId, likeNum, setLikeNum }) {
  const [stateLikeId, setStateLikeId] = useState(likeId);

  async function addLike() {
    const postData = {
      post_id: postId,
    };

    const responseData = await postDataToServer(token, "/api/likes", postData);

    setStateLikeId(responseData.id);
    setLikeNum(likeNum + 1);
  }

  async function removeLike() {
    const responseData = await deleteDataFromServer(
      token,
      "/api/likes/" + stateLikeId,
    );

    setStateLikeId(null);
    setLikeNum(likeNum - 1);
  }
  if (stateLikeId) {
    return (
      <button
        aria-label="remove like from post"
        aria-checked="true"
        role="toggle"
        onClick={removeLike}
      >
        <i className="text-red-600 fas fa-heart"></i>
      </button>
    );
  } else {
    return (
      <button
        aria-label="add like to post"
        aria-checked="false"
        role="toggle"
        onClick={addLike}
      >
        <i className="far fa-heart"></i>
      </button>
    );
  }
}
