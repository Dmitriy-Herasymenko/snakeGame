import './App.css';
import React, {useState, useEffect} from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  let min = 0;
  let max = 100;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x, y];

};

const initialState = {
  direction: 'RIGHT',
  food: getRandomCoordinates(),
  game: true,
  speed: 200,
  snakeDots: [
    [10,26],
    [12,26],
    [14,26],
  ]
};

function App() {

const [state, setState] = useState(initialState);

useEffect( () => {
 document.onkeydown = onKeyDown;
}, [state.direction]);
useEffect( () => {
  setTimeout( () => {
    moveSnake();
 }, state.speed)
}, [state.snakeDots]);
useEffect(()=> {
  //checkIfOutOfBorder();
  //checkIfCollapsed();
  checkEat();
},[state.snakeDots]);

const gameOver = () => {
  setState( prev => {
      return {
        ...prev,
        game: !prev.game,
        snakeDots: [
          [10,26],
          [12,26]
        ]
      }
    });
 alert(`Game over. Snake length ${state.snakeDots.length}`);
  };

const checkIfOutOfBorder = () => {
  let head = state.snakeDots[state.snakeDots.length - 1];
  if (head[0] >= 100 || head[1] >= 100 || head[0] <= 0 || head[1] <= 0) {
    gameOver();
  }
};
const checkIfCollapsed = () => {
    let snake = [...state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    })
  };
const checkEat = () => {
  let head = state.snakeDots.flatMap(dots => dots);
  let food = state.food;
  if(head[1] === food[1] && head[0] === food[0] ) {
    setFoods();
    largeSnake();
    //increaseSpeed();
  }
};

const largeSnake = () => {
  let newSnake = [...state.snakeDots];
  newSnake.unshift([]);
  console.log(newSnake);
  setSnakeDots(newSnake);
};

const increaseSpeed = () => {
    if (state.speed > 10) {
      setState(prev => {
        return {
          ...prev,
          speed: state.speed - 10
        }
      });
    }
};

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
const setFoods = () => {
  setState(prev => {
    return {
      ...prev,
      food: getRandomCoordinates()
    }
  });
};

const onKeyDown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
      case 40:
        setDirection('DOWN');
        break;
      case 37:
        setDirection('LEFT');
        break;
      case 39:
        setDirection('RIGHT');
        break;
      default:
        console.log('default value');
    }
  };
const moveSnake = () => {
    let dots = [...state.snakeDots];
    let head = dots[dots.length - 1];
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
      default:
        console.log('default value');
    }
    dots = [...dots, head];
    dots.shift();
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
