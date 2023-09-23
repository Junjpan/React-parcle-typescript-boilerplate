import { useRef, useState, useEffect } from "react";
import A from "./assets/1.jpg";
import B from "./assets/2.jpg";
import C from "./assets/3.jpg";
import D from "./assets/4.jpg";
import ASM from "./assets/1_sm.jpg";
import BSM from "./assets/2_sm.jpg";
import CSM from "./assets/3_sm.jpg";
import DSM from "./assets/4_sm.jpg";

//you can test this effect by going to the inpsector and select network, and set it to fast 3G.

const App = () => {
  useEffect(() => {
    const blurDivs = document.querySelectorAll(".blur-load");

    const loadedListender = [];

    blurDivs.forEach((div) => {
      const image: HTMLImageElement = div.querySelector("img");

      const loaded = () => {
        div.classList.add("loaded");
      };
      if (image.complete) {
        loaded();
      } else {
        //make sure the image is full loaded
        image.addEventListener("load", loaded);
        loadedListender.push({ image, loaded });
      }
    });

    return () => {
      loadedListender.forEach((image, loader) => {
        image.removeEventListener("load", loader);
      });
    };
  }, []);
  return (
    <div className="container">
      <div className="blur-load" style={{ backgroundImage: `url(${ASM})` }}>
        {" "}
        <img className="images" loading="lazy" src={A} />
      </div>
      <div className="blur-load" style={{ backgroundImage: `url(${BSM})` }}>
        {" "}
        <img className="images" loading="lazy" src={B} />
      </div>
      <div className="blur-load" style={{ backgroundImage: `url(${CSM})` }}>
        {" "}
        <img className="images" loading="lazy" src={C} />
      </div>
      <div className="blur-load" style={{ backgroundImage: `url(${DSM})` }}>
        {" "}
        <img className="images" loading="lazy" src={D} />
      </div>
    </div>
  );
};

export default App;
