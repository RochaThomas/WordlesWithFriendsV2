import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import Keyboard from "../components/Keyboard";
import Modal from "../components/Modal";
import styles from "./GuesserView.modules.css";
var CryptoJS = require("crypto-js");

const GuesserView = () => {
    // prevGuesses state variable -> dont have to pass
    // currGuess state variable -> pass variable and setter as props to keyboard

    const [data, setData] = useState(null);
    const [prevGuesses, setPrevGuesses] = useState([]);
    const [currGuess, setCurrGuess] = useState(["", "", "", "", ""]);
    const { encryptedObj } = useParams();

    const [score, setScore] = useState(7);
    const [word, setWord] = useState("");

    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        console.log(encryptedObj);

        const bytes = CryptoJS.AES.decrypt(
            decodeURIComponent(encryptedObj),
            "secret-key"
        );
        const decryptedObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedObj.name);
        setData({
            id: decryptedObj.id,
            name: decryptedObj.name,
            word: decryptedObj.word,
        });
        setWord(decryptedObj.word);
        // const { id, name, word } = decryptedObject;
        console.log(decryptedObj);
    }, []);

    const empty = [];
    for (let i = 0; i < 5 - prevGuesses.length; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(j);
        }
        empty.push(row);
    }

    return (
        <div>
            {data ? (
                <div className="GuesserView">
                    <div>
                        {/* insert creator's name below this will come from the link*/}
                        <h2>You have 6 tries to guess {data.name}'s word</h2>
                        <div className="center">
                            <table>
                                <tbody>
                                    {/* use a for loop to spit out the rows
                        for i=0; i < guesses.length, i++
                        print out guessed words in boxes

                        have some way to continuously show the current guess

                        for i=0; i < 5-guesses.length, i++ 
                        print blank boxes
                        can you do double mapping to get the word from the prevGuesses array
                        and then get each letter from the word? */}
                                    {prevGuesses.map((word, i) => {
                                        return (
                                            <tr className="wordRow" key={i}>
                                                {word.map((letter, idx) => {
                                                    return (
                                                        <td
                                                            className={
                                                                letter["status"]
                                                            }
                                                            key={idx}
                                                        >
                                                            {
                                                                letter[
                                                                    "letterVal"
                                                                ]
                                                            }
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        {currGuess.map((letter, idx) => {
                                            return (
                                                <td
                                                    className={
                                                        letter !== ""
                                                            ? "currGuessLetter"
                                                            : "emptyBox"
                                                    }
                                                    key={idx}
                                                >
                                                    {letter}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {empty.map((emptyRow, i) => {
                                        return (
                                            <tr className="emptyRow" key={i}>
                                                {emptyRow.map(
                                                    (emptyBox, idx) => {
                                                        return (
                                                            <td
                                                                className="emptyBox"
                                                                key={idx}
                                                            ></td>
                                                        );
                                                    }
                                                )}
                                            </tr>
                                        );
                                    })}
                                    {/* how do we output empty boxes...
                        {() => {
                            let emptyBoxes =
                                (for i = 0; i < 5 - prevGuesses.length; i++) {
                                    emptyBoxes.push(<div className=""></div>)
                                }
                            return emptyBoxes;
                        }} */}
                                </tbody>
                            </table>
                        </div>
                        {/* insert keyboard component here */}
                        <div className="center">
                            {/* <div className="keyboard"> */}
                            <Keyboard
                                setCurrGuess={setCurrGuess}
                                setPrevGuesses={setPrevGuesses}
                                prevGuesses={prevGuesses}
                                currGuess={currGuess}
                                score={score}
                                setScore={setScore}
                                word={word}
                                setGameOver={setGameOver}
                            />
                            {/* </div> */}
                        </div>
                        {/* {JSON.stringify(gameOver)} */}
                        {/* ternary to check if the word was guessed (use Score state if gameOver === true) display modal*/}
                    </div>
                    {gameOver ? (
                        <Modal creatorId={data.id} score={score} word={word} />
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default GuesserView;
