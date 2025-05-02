import React from "react";
import { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests.jsx";

export default function Stories({ token }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getDataFromServer(token, "/api/stories/").then((data) => {
      setStories(data);
    });
  }, []);

  return (
    <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="flex flex-col justify-center items-center"
        >
          <img
            src={story.user.thumb_url}
            alt={story.user.thumb_url + "'s profile picture"}
            className="rounded-full border-4 border-gray-300"
          />
          <p className="text-xs text-gray-500">{story.user.username}</p>
        </div>
      ))}
    </header>
  );
}
