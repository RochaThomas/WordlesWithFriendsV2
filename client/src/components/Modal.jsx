import React, { useState } from "react";
import styles from "./Modal.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Modal = (props) => {
    const [guesserName, setGuesserName] = useState("");
    const [error, setError] = useState(false);
    const history = useHistory();
    // const [score, setScore] = useState(5);
    const refreshPage = () => {
        window.location.reload(false);
    };
    // name=Ryan Renolds&attempts=4&creator_id=98
    /*=========================================================================
        Handle API Request with AXIOS
    =========================================================================*/
    const postAPI = () => {
        axios
            .post(`http://localhost:8080/api/guessers`, null, {
                params: {
                    name: guesserName,
                    attempts: props.score,
                    creator_id: props.creatorId,
                },
            })
            .then((response) => {
                // console.log("Creator ID:", response.data.id);
                console.log(response);
                // history.push(`/`);
                // refreshPage();
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        let errorFlag = false;
        if (!guesserName) {
            errorFlag = true;
        } else {
            postAPI();
            history.push(`/`);
            refreshPage();
        }
        setError(errorFlag);
    };

    return (
        <div className={styles.Modal}>
            <h1>Thanks for playing!</h1>
            {props.score === 10 ? (
                <div style={{ "text-align": "center" }}>
                    <h3>You didn't solve the word!</h3>
                    <h3>The word was: {props.word}</h3>
                </div>
            ) : (
                <h3>Score: {props.score}</h3>
            )}
            <form onSubmit={handleSubmission} autoComplete="off">
                <input
                    type="text"
                    name="name"
                    value={guesserName}
                    onChange={(e) =>
                        setGuesserName(e.target.value.toUpperCase())
                    }
                    placeholder="Enter Name"
                />
                {error ? (
                    <p className={styles.errorMsg}>Please enter a name.</p>
                ) : (
                    <></>
                )}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Modal;
