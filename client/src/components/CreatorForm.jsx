import React, { useState, useEffect } from "react";
import styles from "./CreatorForm.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
var CryptoJS = require("crypto-js");

const initForm = {
    name: "",
    word: "",
};

const initErrors = {
    nameValid: true,
    wordValid: true,
    nameMsg: "Enter your name.",
    wordMsg: "Enter a valid 5 letter word.",
};

const CreatorForm = () => {
    const refreshPage = () => {
        window.location.reload(false);
    };

    /*=========================================================================
        Encryption with Crypt-JS
    =========================================================================*/
    const encryptObj = (data) => {
        let encryptedObject = encodeURIComponent(
            CryptoJS.AES.encrypt(JSON.stringify(data), "secret-key").toString()
        );

        return encryptedObject;
    };
    /*=========================================================================
        React Hooks
    =========================================================================*/
    const [form, setForm] = useState(initForm);
    const [errors, setErrors] = useState(initErrors);
    const history = useHistory();

    /*=========================================================================
        Handle API Request with AXIOS
    =========================================================================*/
    const postAPI = () => {
        axios
            .post(`http://localhost:8080/api/creators`, null, {
                params: {
                    name: form.name,
                    word: form.word,
                },
            })
            .then((response) => {
                console.log("Creator ID:", response.data.id);
                console.log(response);
                // Testing Hashed URLS ======================================
                // encryptObj({ ...form, id: response.data.id });
                history.push(
                    `/creator/${encryptObj({
                        ...form,
                        id: response.data.id,
                    })}`
                );
                refreshPage();
                // ==========================================================
                // history.push(`/${response.data.id}/${form.name}=${form.word}`);
                // refreshPage();
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    };

    const callWordAPI = () => {
        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${form.word}`)
            .then((response) => {
                console.log(response);
                // setAPIResp(true);
                postAPI();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const validateForm = () => {
    //     let validNameFlag = true,
    //         validWordFlag = true;
    //     // Name Valid?
    //     if (!form.name) {
    //         validNameFlag = false;
    //     }
    //     if (!form.word || form.word.length != 5) {
    //         validWordFlag = false;
    //     }
    //     setErrors({
    //         ...errors,
    //         nameValid: validNameFlag,
    //         wordValid: validWordFlag,
    //     });
    //     // Word == 5?
    //     // is word a valid word in dictionary?
    //     if (validNameFlag && validWordFlag) {
    //         console.log("Dictionary API Call:", callWordAPI());
    //         return true;
    //     }

    //     return false;
    // };

    // === WORKING ==========================================
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8080/api`)
    //         .then((response) => {
    //             // console.log(response.data.products);
    //             console.log(response);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    /*=========================================================================
        Form Handlers
    =========================================================================*/
    const handleSubmission = (e) => {
        e.preventDefault();
        // some submission function here to post to the spring db
        //hash name and word
        //redirect to creatorView page... route to redirect to will be in app.js\
        let validNameFlag = true,
            validWordFlag = true;
        if (!form.name) {
            validNameFlag = false;
        }
        if (!form.word || form.word.length != 5) {
            validWordFlag = false;
        }
        setErrors({
            ...errors,
            nameValid: validNameFlag,
            wordValid: validWordFlag,
        });
        if (validNameFlag && validWordFlag) {
            callWordAPI();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value.toUpperCase() });
    };

    return (
        <div className={styles.creatorForm}>
            {/* {JSON.stringify(form)}; */}
            <div>
                <p>
                    Create a{" "}
                    <a href="https://www.nytimes.com/games/wordle/index.html">
                        <span style={{ padding: "0px 5px" }}>W</span>
                        <span style={{ padding: "0px 7px" }}>O</span>
                        <span style={{ padding: "0px 9px" }}>R</span>
                        <span style={{ padding: "0px 8px" }}>D</span>
                        <span style={{ padding: "0px 11px" }}>L</span>
                        <span style={{ padding: "0px 10px" }}>E</span>
                    </a>{" "}
                    game and send the share link with your friends!
                </p>
            </div>
            <form onSubmit={handleSubmission} autoComplete="off">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                />
                {errors.nameValid ? (
                    <></>
                ) : (
                    <p className={styles.errorMsg}>{errors.nameMsg}</p>
                )}
                <input
                    type="text"
                    name="word"
                    value={form.word}
                    onChange={handleChange}
                    placeholder="Enter Word"
                />
                {errors.wordValid ? (
                    <></>
                ) : (
                    <p className={styles.errorMsg}>{errors.wordMsg}</p>
                )}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatorForm;
