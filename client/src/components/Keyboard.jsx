import React, { useState, useEffect } from "react";
import Letter from "./Letter";
import style from "./Keyboard.modules.css";
import axios from "axios";

const Keyboard = (props) => {
    const [letterDictionary, setLetterDictionary] = useState({});
    const [isLoaded, setIsLoded] = useState(false);
    const [validWord, setValidWord] = useState(false);

    const letterVals = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
    ];

    //might have to make temp dictionary then setLetterDictionary(tempDictionary);
    useEffect(() => {
        for (let i = 0; i < letterVals.length; i++) {
            for (let j = 0; j < letterVals[i].length; j++) {
                if (letterVals[i][j] === "ENTER") {
                    letterDictionary[letterVals[i][j]] = "enter";
                } else if (letterVals[i][j] === "DELETE") {
                    letterDictionary[letterVals[i][j]] = "delete";
                } else {
                    letterDictionary[letterVals[i][j]] = "default";
                }
            }
        }
        setLetterDictionary({ ...letterDictionary });
        setIsLoded(true);
    }, []);

    // const callWordAPI = () => {
    //     // let flag = false;
    //     axios
    //         .get(
    //             `https://api.dictionaryapi.dev/api/v2/entries/en/${props.currGuess.join(
    //                 ""
    //             )}`
    //         )
    //         .then((response) => {
    //             console.log(response);
    //             // setAPIResp(true);
    //             setValidWord(true);
    //             // flag = true;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setValidWord(false);
    //             // flag = false;
    //         });
    //     // return flag;
    // };

    const clickKeyboard = (letter) => {
        /*
        if the value of the click key is enter and the currGuess.length == 5
        add currGuess to prevGuesses
        clear currGuess
        */

        //creating string of the last guess to compare to the word string in order to trigger setScore
        let lastGuess = "";

        if (letter === "ENTER" && !props.currGuess.includes("")) {
            axios
                .get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${props.currGuess.join(
                        ""
                    )}`
                )
                .then((response) => {
                    console.log(response);
                    let currGuessArr = [];
                    for (let i = 0; i < props.currGuess.length; i++) {
                        let letterObj = {};
                        letterObj["letterVal"] = props.currGuess[i];
                        lastGuess += props.currGuess[i];
                        for (let j = 0; j < props.word.length; j++) {
                            if (props.currGuess[i] === props.word[j]) {
                                if (i === j) {
                                    letterObj["status"] = "rightSpot";
                                    letterDictionary[props.currGuess[i]] =
                                        "rightSpot";
                                    break;
                                } else {
                                    letterObj["status"] = "wrongSpot";
                                    if (
                                        letterDictionary[props.currGuess[i]] !==
                                        "rightSpot"
                                    ) {
                                        letterDictionary[props.currGuess[i]] =
                                            "wrongSpot";
                                    }
                                    break;
                                }
                            } else if (
                                props.currGuess[i] !== props.word[j] &&
                                j === i
                            ) {
                                letterObj["status"] = "incorrect";
                                letterDictionary[props.currGuess[i]] =
                                    "incorrect";
                                // break;
                            }
                        }
                        setLetterDictionary({ ...letterDictionary });
                        currGuessArr.push(letterObj);
                    }
                    props.setPrevGuesses([...props.prevGuesses, currGuessArr]);

                    //for loop through currGuess change letter status in dictionary if needed;

                    props.setCurrGuess(["", "", "", "", ""]);
                    console.log(
                        props.prevGuesses[props.prevGuesses.length - 1]
                    );
                    console.log(letterDictionary);

                    if (
                        lastGuess === props.word ||
                        props.prevGuesses.length + 2 > 6
                    ) {
                        props.setScore(props.prevGuesses.length + 1);
                        if (lastGuess != props.word) {
                            props.setScore(10);
                        }
                        props.setGameOver(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        //add in case where the submitted current guess is the correct word
        //  record the length of prev guesses (score) -> save as a state value
        // if (lastGuess === props.word || props.prevGuesses.length + 1 > 6) {
        //     props.setScore(props.prevGuesses.length + 1);
        //     props.setGameOver(true);
        // }

        if (
            letter !== "ENTER" &&
            letter !== "DELETE" &&
            props.currGuess.length < 6
        ) {
            if (props.currGuess.includes("")) {
                let index = props.currGuess.indexOf("");
                props.currGuess[index] = letter;
            }
            props.setCurrGuess([...props.currGuess]);
        } else if (letter === "DELETE") {
            let index = props.currGuess.length - 1;
            for (let i = 0; i < props.currGuess.length - 1; i++) {
                if (
                    props.currGuess[i] !== "" &&
                    props.currGuess[i + 1] === ""
                ) {
                    index = i;
                }
            }
            props.currGuess[index] = "";
            props.setCurrGuess([...props.currGuess]);
        }
    };

    // const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ENTER','DELETE'];

    return (
        <div>
            {isLoaded ? (
                <div className="Keyboard">
                    {/* for every letter output a buttonComponent with value as letter */}
                    {letterVals.map((row, i) => {
                        return (
                            <div
                                className="keyboardRow"
                                // style={{ display: "flex" }}
                                key={i}
                            >
                                {row.map((letter, idx) => {
                                    return (
                                        <Letter
                                            letterStatus={
                                                letterDictionary[letter]
                                            }
                                            onClickFunction={clickKeyboard}
                                            letter={letter}
                                            key={idx}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Keyboard;
