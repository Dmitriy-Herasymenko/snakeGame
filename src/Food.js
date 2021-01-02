import React from 'react';

export default function Food (props) {
    const style = {
        left: `${props.dot.left}%`,
        top: `${props.dot.top}%`
    };

    return <div className='food' style={style}/>
}
