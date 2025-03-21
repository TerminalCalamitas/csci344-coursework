import React from "react";
import Profile from "./Profile.jsx";
import ButtonCount from "./ButtonCount.jsx";

export default function App() {
  const people = [
    {
        "name": "Anita",
        "image_url": "https://picsum.photos/id/216/100/100"
    },
    {
        "name": "Ben",
        "image_url": "https://picsum.photos/id/217/100/100"
    },
    {
        "name": "Adwaina",
        "image_url": "https://picsum.photos/id/218/100/100"
    },
    {
        "name": "Laciesha",
        "image_url": "https://picsum.photos/id/219/100/100"
    }
  ];

  function getProfileComponents() {
   return people.map((person) => {
           return <Profile
             name={person.name}
             picture={person.image_url}
           />
   });

  }
  

    return (
        <>
            <header>
                <h1>My First App</h1>
            </header>
            <main>
                <p>Hello React!</p>
                {getProfileComponents()}
                <ButtonCount />
                <ButtonCount />
                <ButtonCount />
                <ButtonCount />
                <ButtonCount />
                <ButtonCount />
            </main>
        </>
    );
}
                //<Profile name="Anita" picture="https://picsum.photos/id/216/100/100" />
                //<Profile name="Ben" picture="https://picsum.photos/id/217/100/100" />
                //<Profile name="Adwaina" picture="https://picsum.photos/id/218/100/100" />
                //<Profile name="Laciesha" picture="https://picsum.photos/id/219/100/100" />
