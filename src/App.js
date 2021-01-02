import './App.css';
import React, {useState, useEffect} from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
    let min = 0;
    let max = 100;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return {left:x, top: y};

};

const initialState = {
    direction: 'RIGHT',
    food: getRandomCoordinates(),
    game: true,
    speed: 200,
    snakeDots: [
        {left: 10, top:26},
        {left: 12, top:26},
        {left: 14, top:26},
    ],
};

function App() {

    const [state, setState] = useState(initialState);

    useEffect(() => {
        const id = setInterval(() => {
            moveSnake();
        }, state.speed);
        return () => {
            clearInterval(id);
        }
    }, []);

    useEffect(() => {
        //checkIfOutOfBorder();
        //checkIfCollapsed();
        //checkEat();
    }, []);

    // const checkEat = () => {
    //     setState(prev=> {
    //     // prev.snakeDots.find(dots => {
    //     //         if(dots.top === prev.food.top && dots.left === prev.food.left) {
    //     //          const newDot = {top: 2, left: 2};
    //     //          // const newSnake = [...prev.snakeDots, newDot];
    //     //          //    return {
    //     //          //        ...prev,
    //     //          //        food: getRandomCoordinates(),
    //     //          //        snakeDots: newSnake,
    //     //          //    };
    //     //         }
    //     //
    //     //     });
    //     });
    // };

    const onKeyDown = e => {
        let key = '';
        switch (e.keyCode) {
            case 38:
                key = 'UP';
                break;
            case 40:
                key = 'DOWN';
                break;
            case 37:
                key = 'LEFT';
                break;
            case 39:
                key = 'RIGHT';
                break;
            default:
                console.log('default value');
        }
        if (key) {
            const reverseDots = [...state.snakeDots].reverse();
            setState(prev => {
                return {
                    ...prev,
                    direction: key,
                    snakeDots: reverseDots,
                }
            })
        }
    };
    const moveSnake = () => {
        setState(prev => {
            let dots = [...prev.snakeDots];
            switch (prev.direction) {
                case 'RIGHT':
                   dots = dots.map(dots => {
                       return {
                           left: dots.left + 2,
                           top: dots.top
                       }
                    });
                    break;
                case 'LEFT':
                    dots = dots.map(dots => {
                        return {
                            left: dots.left - 2,
                            top: dots.top
                        }
                    });
                    break;
                case 'DOWN':
                    dots = dots.map(dots => {
                        return {
                            left: dots.left,
                            top: dots.top + 2
                        }
                    });
                    break;
                case 'UP':
                    dots = dots.map(dots => {
                        return {
                            left: dots.left,
                            top: dots.top - 2,
                        }
                    });
                    break;
                default:
                    console.log('default value');
            }
            return {
                ...prev,
                snakeDots: dots,
            }
        });
    };

    return (
        <div className="game-arena" onKeyDown={onKeyDown}  tabIndex={0}>
            <Snake snakeDots={state.snakeDots} />
            <Food dot={state.food} />
        </div>
    );
}

export default App;
