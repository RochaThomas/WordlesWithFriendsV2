import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Leaderboard.module.css";

const Leaderboard = (props) => {
    /*
    get all guessers with a specific creator id upon render
    save them into a state variable and sort by score...?
    secondary sorter would be time
    */
    const [guessers, setGuessers] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/creators/${props.id}`)
            .then((response) => {
                console.log("----- Leaderboard -----")
                console.log(response.data);
                setGuessers(response.data.creator.guessers.sort((a, b) => a.attempts - b.attempts));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    /*
    extra, dont worry about this right now
    onclick function that resorts the guessers state variable via time
    secondary sorter would be number of guesses
    */

    return (
        <div className={styles.Leaderboard}>
            <p>{props.name}'S LEADERBOARD</p>
            {/* {JSON.stringify(guessers)} */}
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    {/* for each guesser in guessers 
                    tr
                        td name
                        td score
                        td time
                    tr*/}

                    {guessers.map((guesser, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{guesser.name}</td>
                                {guesser.attempts === 10 ? (
                                    <td>FAIL</td>
                                ) : (
                                    <td>{guesser.attempts}/6</td>
                                )}
                                {/* <td>{guesser.attempts}/6</td> */}
                                {/* <td>{guesser.time}</td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
