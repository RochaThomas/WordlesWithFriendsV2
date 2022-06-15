import React from 'react';
import styles from "./GuesserForm.module.css";

const GuesserForm = (props) => {

    const score = props.score;
    const word = props.word;

    const handleSubmission = (e) => {
        e.preventDefault();
        // some submission function here to post to the spring db
        //submit the name and the score
        //redirect
    }

    return (
        <div>
            <h1>Congradulations! You got it! The word was <span>{word}</span>!</h1>
            <form className={styles.guesserForm} onSubmit={handleSubmission}>
                <input type="text" name="name" id="name" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default GuesserForm