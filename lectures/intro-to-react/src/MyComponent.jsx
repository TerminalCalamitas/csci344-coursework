import React, { useState } from 'react'
import "./Welcome.css"

export function Welcome({ name, imgUrl }) {
  // state variables go at top of element
  const [style, setStyle] = useState("card");
  const [number, setNumber] = useState(0);

  function toggleClass() {
    if (style === "card") {
     setStyle("active-card")
    } else {
      setStyle("card")
    }

  }
  
  function countClass(ev) {
    setNumber(number + 1)
    ev.stopPropagation();
  
  }

  return(
    <section className={style} onClick={toggleClass}>
      <h2>Hello, {name}</h2>
      <img src={imgUrl} alt="picture"/>
      <button onClick={countClass}>This has been clicked {number} times</button>
    </section>
  );

}
