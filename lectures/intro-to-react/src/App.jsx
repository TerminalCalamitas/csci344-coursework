import React from "react";
import Profile from "./Profile.jsx";
import ButtonCount from "./ButtonCount.jsx";
import { Welcome } from './MyComponent.jsx'
import "./App.css"

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
            <Welcome 
              name="Kellan" 
              imgUrl="https://picsum.photos/200"/>

            <Welcome 
              name="Jahfari" 
              imgUrl="https://picsum.photos/200"/>

            <Welcome 
              name="Eric" 
              imgUrl="https://picsum.photos/200"/>

            <Welcome 
              name="Kati" 
              imgUrl="https://imgs.search.brave.com/eGSgSPzq8EcMdVPYv5bHY3K9TWpULbuO-hqcrPVFRfA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdlLzhi/LzMwLzdlOGIzMDc5/NWY0MzU0ZjRiYTQz/M2IxYzM4Mzc3YTVj/LmpwZw"/>

            <Welcome 
              name="Torin" 
              imgUrl="https://picsum.photos/200"/>

            <Welcome 
              name="Caleb" 
              imgUrl="https://imgs.search.brave.com/lj_3K4VrZOFagKSOTv43qd85d6qD5Qggw1yRgOhiRoY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmluZWFydGFt/ZXJpY2EuY29tL2lt/YWdlcy1tZWRpdW0t/bGFyZ2UtNS9yZWQt/Zm94LXlhd25pbmct/aW4tc25vdy1kci1w/LW1hcmF6emlzY2ll/bmNlLXBob3RvLWxp/YnJhcnkuanBn"/>
          </main>
        </>
    );
}
                //<Profile name="Anita" picture="https://picsum.photos/id/216/100/100" />
                //<Profile name="Ben" picture="https://picsum.photos/id/217/100/100" />
                //<Profile name="Adwaina" picture="https://picsum.photos/id/218/100/100" />
                //<Profile name="Laciesha" picture="https://picsum.photos/id/219/100/100" />
