import "./Profile.css";
import React from "react";

export default function Profile({ name, picture }) {
  return (
    <section className="profile">
      Profile Goes here!
      <img src={picture} alt="Profile picture"/>
      <h3>{ name }</h3>
    </section>
  )
}
