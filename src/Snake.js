import React from "react";

export default function Snake (props) {
    return (
        <ul>
            {props.snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot.left}%`,
                    top: `${dot.top}%`
                };
                return <li key={i} className="snake" style={style} />

            })}
        </ul>
    )
};
