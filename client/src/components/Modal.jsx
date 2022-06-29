import React, { useState } from "react";
import styles from "./Modal.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Modal = (props) => {
    const [guesserName, setGuesserName] = useState("");
    const [errors, setErrors] = useState([]);
    let creatorGuessers = [];
    let newGuesser = {};
    const history = useHistory();
    const refreshPage = () => {
        window.location.reload(false);
    };
    // name=Ryan Renolds&attempts=4&creator_id=98
    /*=========================================================================
        Handle API Request with AXIOS
    =========================================================================*/
    // try chaining api calls
    const postAPI = () => {
        axios
            .post('http://localhost:8000/api/guessers/new', {
                name: guesserName,
                attempts: props.score,
                creator_id: props.creatorId,
            })
            .then((response) => {
                console.log(response.data.guesser);
                newGuesser = response.data.guesser;
                console.log("New Guesser", newGuesser);
                return axios
                    .get('http://localhost:8000/api/creators/' + newGuesser.creator_id);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log("Error with new guesser", err);
            })
            .then((response) => {
                console.log(response.data.creator);
                creatorGuessers = response.data.creator.guessers;
                console.log("Creator Guessers", creatorGuessers);
                return axios
                    .put('http://localhost:8000/api/creators/update/' + newGuesser.creator_id, {
                        guessers: [...creatorGuessers, newGuesser]
                    })
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log("Error with get creator", err);
            })
            .then((response) => {
                console.log(response.data.creator.guessers);
                history.push(`/leaderboard/${props.encryptedObj}`);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log("Error with updating creator guessers", err);
            })
    };
        
    const handleSubmission = (e) => {
        e.preventDefault();
        console.log("----- Modal -----")
        postAPI();
        // let errorFlag = false;
        // if (!guesserName) {
        //     errorFlag = true;
        // } else {
        //     postAPI();
        //     // history.push(`/`);
        //     // refreshPage();
        // }
        // setError(errorFlag);
    };

    return (
        <div className={styles.Modal}>
            <h1>Thanks for playing!</h1>
            {props.score === 10 ? (
                <div style={{ "textAlign": "center" }}>
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
                {errors.map((err, index) => <p className={styles.errorMsg} key={index}>{err}</p>)}
                {/* {error ? (
                    <p className={styles.errorMsg}>Please enter a name.</p>
                ) : (
                    <></>
                )} */}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Modal;
