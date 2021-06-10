import React from "react";
import { useState, useContext } from "react";
// app
// p5
import { Menu } from "../components/menu";
import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";
import { P5DispatchContext, P5StateContext } from "../components/P5Manager";
import { MenuButton } from "../components/menuButton";

const Artwork_wrapper = P5Wrapper("my artwork");
const Button_refresh = P5Wrapper("refresh");

const ArtWork = () => (
  <>
    <P5Manager>
      <div style={{ position: "absolute" }}>
        <ComponentBuffer comp={Artwork_wrapper} />
      </div>
      <div style={{ position: "absolute" }}>
        <Menu></Menu>
        <MenuButton comp={Button_refresh} label="REFRESH" what="add_x" />
      </div>
    </P5Manager>
  </>
);

export default ArtWork;

let buf = {
  value: 0,
};

function ComponentBuffer(props) {
  const { x } = useContext(P5StateContext);
  const [state_data, set_data] = useState(buf);
  if (x !== state_data.value) {
    buf.value = x;
    set_data(buf);
  }

  return <props.comp sketch={goban} data={state_data}></props.comp>;
}

/**
 *
 * P5JS / PROCESSING SKETCH
 *
 */
function goban(p5) {
  // VARIABLE GLOBAL
  
  // PROCESSING FUNCTION
  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  };

  p5.draw = function () {
    p5.background("red");
    // p5.background(param.bg, param.bg_alpha);
    // // show_goban(goban);
    // // show_stones(stones);
    // apparence(param);
    // let_s_dance(stones, param);
    // show_gui(info_is);
    p5.rectMode(p5.CENTER);
    variant_taille(p5.mouseX,p5.mouseY,300,50,"red", "yellow", 10);
    variant_taille(p5.mouseY,p5.mouseX,50,50,"pink", "blue", 20);
  };

  function variant_taille (x, y, tx, ty, interieur, exterieur, epaisseur) {
    apparence (interieur, exterieur, epaisseur);
    let value = p5.sin(p5.frameCount /100);
    let coeur_x = value * tx;
    let coeur_y =value * ty;
    p5.rect(x,y,coeur_x,coeur_y);
  }

  function apparence (interieur, exterieur, epaisseur) {
    p5.fill(interieur);
    p5.stroke(exterieur);
    p5.strokeWeight(epaisseur);
  }
}
