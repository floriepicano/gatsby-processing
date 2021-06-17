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
    p5.background("black");
    // p5.background(param.bg, param.bg_alpha);
    // // show_goban(goban);
    // // show_stones(stones);
    // apparence(param);
    // let_s_dance(stones, param);
    // show_gui(info_is);
    p5.rectMode(p5.CENTER);
    // variant_taille(p5.mouseX,p5.mouseY,300,50,"red", "yellow", 10);
    // variant_taille(p5.mouseY,p5.mouseX,50,50,"pink", "blue", 20);

    grille(15);
    p5.stroke(255);
  };

  function grille (step) {
    let offset = step /2;
    let inc = 0;
    
    for (let i = 0 ; i < p5.width ; i = i + step) {
     for (let p = 0; p < p5.height ; p = p + step) {
       let x = i + offset ;
       let y = p + offset;
       inc +=1;
       pierre (x,y,11,inc);
       // p5.rect(x,y,20,20);
     }
    }
  }

  function pierre (x,y,taille, inc) {
    let value = p5.sin(p5.frameCount /100);
    let coeur_x = value * taille;
    let coeur_y =value * taille *100;
    p5.fill('hsla(150, 5%, 50%, 0.3)');
    p5.noStroke();
    if(inc%10=== 0) {
      // rect (x,y,taille,taille*4);
      pierre_rotation(x,y,coeur_x, coeur_y, inc);
    }
  }

  function pierre_rotation(x, y, w, h, rotation) {
    // console.log("rotation",rotation);
    let offset_x = w /2;
    let offset_y = h /2;
    p5.push();
    p5.translate(x, y);
    p5.push();
    p5.rotate((rotation + p5.frameCount) * 0.01);
    p5.translate(-offset_x, -offset_y);
    p5.ellipse(0, 0, h,w/3);
    p5.pop();
    p5.pop();
  }
  

  // function variant_taille (x, y, tx, ty, interieur, exterieur, epaisseur) {
  //   apparence (interieur, exterieur, epaisseur);
  //   let value = p5.sin(p5.frameCount /100);
  //   let coeur_x = value * tx;
  //   let coeur_y =value * ty;
  //   p5.rect(x,y,coeur_x,coeur_y);
  // }

  // function apparence (interieur, exterieur, epaisseur) {
  //   p5.fill(interieur);
  //   p5.stroke(exterieur);
  //   p5.strokeWeight(epaisseur);
  // }
}
