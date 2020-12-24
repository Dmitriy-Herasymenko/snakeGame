import './App.css';
import React, {useState, useEffect} from "react";
import Snake from "./Snake";
import Food from "./Food";

function App() {

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)/2)*2);
  let y = Math.floor((Math.random()*(max-min+1)/2)*2);
  return [x,y]
};


const [state, setState] = useState({
  direction: 'RIGHT',
  food: getRandomCoordinates(),
  speed: 200,
  snakeDots: [
    [0,0],
    [2,0]
  ]
});

useEffect( () => {
 document.onkeydown = onKeyDown
}, [state.direction]);

useEffect( () => {
  setInterval( () => {
    moveSnake();
 }, state.speed)
}, [state.snakeDots]);

const setDirection = key => {
   setState(prev => {
     return {
       ...prev,
       direction: key,
     }
   });
 };

  const setSnakeDots = dots => {

    setState(prev => {
      return {
        ...prev,
        snakeDots: dots,
      }
    });
  };

  const onKeyDown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
    }
    switch (e.keyCode) {
      case 40:
        setDirection('DOWN');
        break;
    }
    switch (e.keyCode) {
      case 37:
        setDirection('LEFT');
        break;
    }
    switch (e.keyCode) {
      case 39:
        setDirection('RIGHT');
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...state.snakeDots];
    let head = dots[dots.length - 1];
    console.log("head", head)
    switch (state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots = [...dots, head];
    setSnakeDots(dots);
  };


  return (
    <div className="game-arena">
      <Snake snakeDots={state.snakeDots}/>
      <Food dot={state.food}/>

    </div>
  );
}

export default App;
