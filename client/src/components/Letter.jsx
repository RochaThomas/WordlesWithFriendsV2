import React from "react";
// import style from "./Keyboard.modules.css";

const Letter = (props) => {
    return (
        <div>
            <button
                className={props.letterStatus}
                onClick={(e) => {
                    props.onClickFunction(props.letter);
                }}
            >
                {props.letter}
            </button>
        </div>
    );
};

export default Letter;
