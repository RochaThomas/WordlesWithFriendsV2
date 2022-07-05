import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./CreatorView.module.css";
import Leaderboard from "../components/Leaderboard";
var CryptoJS = require("crypto-js");

const CreatorView = () => {
    // const { id, name, word } = useParams();
    const [data, setData] = useState(null);
    const { encryptedObj } = useParams();

    const [ifShareClicked, setIfShareClicked] = useState(false);
    const [ifCreatorClicked, setIfCreatorClicked] = useState(false);

    // copyLink code formed from Lissy93
    // https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext

    const copyLink = (text) => {
        if (navigator.clipboard === undefined){
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            }
            catch (err) {
                console.error("Copy link unsuccessful", err);
            }
            document.body.removeChild(textArea);
        }
        else {
            navigator.clipboard.writeText(text);
        }
    }

    useEffect(() => {
        console.log("----- Creator View -----")
        // console.log(encryptedObj);

        const bytes = CryptoJS.AES.decrypt(
            decodeURIComponent(encryptedObj),
            "secret-key"
        );
        const decryptedObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedObj.name);
        setData({
            _id: decryptedObj._id,
            name: decryptedObj.name,
            word: decryptedObj.word,
        });
        // const { id, name, word } = decryptedObject;
        // console.log(decryptedObj);
    }, []);

    return (
        <div className={styles.CreatorView}>
            {data ? (
                <div>
                    {/* <h1>{data.name}'s Dashboard</h1> */}
                    <div className={styles.links}>
                        {/* <h3>Creator Link:</h3> */}
                        {ifCreatorClicked ? (
                            <button
                                className={styles.clickedCreator}
                                // onClick={ () => {copyLink(`http://localhost:3000/creator/${encryptedObj}`)}}
                                onClick={ () => {
                                    copyLink(`http://54.176.242.11/creator/${encryptedObj}`);
                                }}
                            >
                                Copied!
                            </button>
                        ) : (
                            <button
                                className={styles.creatorLink}
                                onClick={ () => {
                                    // copyLink(`http://localhost:3000/creator/${encryptedObj}`);
                                    copyLink(`http://54.176.242.11/creator/${encryptedObj}`);
                                    setIfCreatorClicked(true);
                            }}
                            >
                                Creator Link
                            </button>
                        )}
                        {ifShareClicked ? (
                            <button
                                className={styles.clickedShare}
                                onClick={ () => {
                                    // copyLink(`http://localhost:3000/playgame/${encryptedObj}`);
                                    copyLink(`http://54.176.242.11/playgame/${encryptedObj}`);
                                }}
                            >
                                Copied!
                            </button>
                        ) : (
                            <button
                                className={styles.shareLink}
                                onClick={ () => {
                                    // copyLink(`http://localhost:3000/playgame/${encryptedObj}`);
                                    copyLink(`http://54.176.242.11/playgame/${encryptedObj}`);
                                    setIfShareClicked(true);
                                }}
                            >
                                Share Link
                            </button>
                        )}
                    </div>
                    {/* <div className="links">
                        <h3>Share Link:</h3>
                    </div> */}
                    {/* insert leader board component here */}
                    <Leaderboard name={data.name} id={data._id} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CreatorView;
