import React, { useState } from "react";
import { deleteDataFromServer, postDataToServer } from "../server-requests.jsx";

export function BookmarkButton({ token, bookmarkId, postId }) {
  const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

  async function createBookmark() {
    const postData = {
      post_id: postId,
    };

    const responseData = await postDataToServer(
      token,
      "/api/bookmarks",
      postData,
    );

    setStateBookmarkId(responseData.id);
  }

  async function removeBookmark() {
    const responseData = await deleteDataFromServer(
      token,
      "/api/bookmarks/" + stateBookmarkId,
    );

    setStateBookmarkId(null);
  }

  if (stateBookmarkId) {
    return (
      <button
        aria-label="remove bookmark from post"
        aria-checked="true"
        role="toggle"
        onClick={removeBookmark}
      >
        <i className="fas fa-bookmark"></i>
      </button>
    );
  } else {
    return (
      <button
        aria-label="add bookmark to post"
        aria-checked="false"
        role="toggle"
        onClick={createBookmark}
      >
        <i className="far fa-bookmark"></i>
      </button>
    );
  }
}
