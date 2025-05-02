import React from "react";
import { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests.jsx";

export default function Profile({ token }) {
  const [username, setUsername] = useState("username");
  const [userPicture, setUserPicture] = useState([]);

  useEffect(() => {
    getDataFromServer(
      token,
      "/api/profile/",
  ).then((userData) => {
      setUsername(userData.username);
      setUserPicture(userData.thumb_url);
    });
  }, []);

  return (
    <header className="flex gap-4 items-center">
      <img
        src={userPicture}
        alt={username + "\'s profile picture"}
        className="rounded-full w-16"
      />
      <h2 className="font-Comfortaa font-bold text-2xl">{username}</h2>
    </header>
  );
}
