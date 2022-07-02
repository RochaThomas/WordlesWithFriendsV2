import React, { useState } from "react";
import styles from "./CreatorForm.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
var CryptoJS = require("crypto-js");

const initForm = {
    name: "",
    word: "",
};

const CreatorForm = () => {
    const [errors, setErrors] = useState([]);

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
    // const [wordAPIResp, setWordAPIResp] = useState(false);
    const history = useHistory();

    /*=========================================================================
        Handle API Request with AXIOS
    =========================================================================*/
    // const postAPI = () => {
    //     axios
    //         .post(`http://localhost:8000/api/creators/new`, {
    //                 name: form.name,
    //                 word: form.word,
    //                 guessers: []
    //         })
    //         .then((response) => {
    //             if (wordAPIResp === false) {
    //                 throw Error;
    //             }
    //             else {
    //                 console.log("Creator ID:", response.data.creator._id);
    //                 console.log(response.data);
    //                 // Testing Hashed URLS ======================================
    //                 // encryptObj({ ...form, id: response.data.id });
    //                 history.push(
    //                     `/creator/${encryptObj({
    //                         ...form,
    //                         _id: response.data.creator._id,
    //                     })}`
    //                 );
    //                 refreshPage();
    //             }
    //             // ==========================================================
    //             // history.push(`/${response.data.id}/${form.name}=${form.word}`);
    //             // refreshPage();
    //         })
    //         .catch((err) => {
    //             const errorResponse = err.response.data.errors;
    //             const errorArr = [];
    //             if (wordAPIResp === false && form.word.length === 5) {
    //                 errorArr.push("This word is not valid. Try again.");
    //             }
    //             for (const key of Object.keys(errorResponse)){
    //                 errorArr.push(errorResponse[key].message)
    //             }
    //             setErrors(errorArr);
    //             setWordAPIResp(false);
    //         });
    // };

    // const callWordAPI = () => {
    //     axios
    //         .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${form.word}`)
    //         .then((response) => {
    //             console.log("----- Creator Form -----")
    //             console.log(response.data);
    //             setWordAPIResp(true);
    //         })
    //         .catch((err) => {
    //             // if there is an error then push a message to errors
    //             // "This word is not valid. Try again."
    //             // setErrors([...errors, "This word is not valid. Try again."])
    //             console.log(err);
    //             setWordAPIResp(false);
    //         })
    //         .then(postAPI());
    // };

    const runAPIs = () => {
        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${form.word}`)
            .then((response) => {
                console.log("----- Creator Form -----")
                // console.log(response.data);
                return axios
                    .post(`http://localhost:8000/api/creators/new`, {
                        name: form.name,
                        word: form.word,
                        guessers: []
                    })
                    .then((response) => {
                        // console.log("Creator ID:", response.data.creator._id);
                        // console.log(response.data);
                        // Testing Hashed URLS ======================================
                        // encryptObj({ ...form, id: response.data.id });
                        history.push(
                            `/creator/${encryptObj({
                                ...form,
                                _id: response.data.creator._id,
                            })}`
                        );

                    })
                    .catch(err => {
                        const errorResponse = err.response.data.errors;
                        const errorArr = [];
                        for (const key of Object.keys(errorResponse)){
                            errorArr.push(errorResponse[key].message)
                        }
                        setErrors(errorArr);
                    })
            })
            .catch((err) => {
                // if there is an error then push a message to errors
                // "This word is not valid. Try again."
                // setErrors([...errors, "This word is not valid. Try again."])
                // console.log(err);
                const errorArr = [];
                if (!form.word) {
                    errorArr.push("Enter a valid 5 letter word.");
                }
                else {
                    errorArr.push("This word is not valid. Try again.");
                }

                if (!form.name) {
                    errorArr.push("Please enter your name.")
                }
                else if (form.name.length < 2) {
                    errorArr.push("Name must be at least 2 characters.")
                }
                else if (form.name.length > 32) {
                    errorArr.push("Name must be less than 32 characters.")
                }
                
                setErrors(errorArr);
            })
    }

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
        runAPIs();
        // some submission function here to post to the spring db
        //hash name and word
        //redirect to creatorView page... route to redirect to will be in app.js\
        // let validNameFlag = true,
        //     validWordFlag = true;
        // if (!form.name) {
        //     validNameFlag = false;
        // }
        // if (!form.word || form.word.length !== 5) {
        //     validWordFlag = false;
        // }
        // setErrors({
        //     ...errors,
        //     nameValid: validNameFlag,
        //     wordValid: validWordFlag,
        // });
        // if (validNameFlag && validWordFlag) {
        //     callWordAPI();
        // }
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
                {errors.map((err, index) => {
                    if (err.toUpperCase().includes("NAME")) {
                        return <p className={styles.errorMsg} key={index}>{err}</p>
                    }
                    return <></>
                })}
                <input
                    type="text"
                    name="word"
                    value={form.word}
                    onChange={handleChange}
                    placeholder="Enter Word"
                />
                {errors.map((err, index) => {
                    if (err.toUpperCase().includes("WORD")) {
                        return <p className={styles.errorMsg} key={index}>{err}</p>
                    }
                    return <></>
                })}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatorForm;
