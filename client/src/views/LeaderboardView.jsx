import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./LeaderboardView.module.css";
import Leaderboard from "../components/Leaderboard";
var CryptoJS = require("crypto-js");

const LeaderboardView = () => {
    // const { id, name, word } = useParams();
    const [data, setData] = useState(null);
    const { encryptedObj } = useParams();

    const [ifShareClicked, setIfShareClicked] = useState(false);

    useEffect(() => {
        console.log(" ----- Leaderboard View ----- ")
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
        <div className={styles.LeaderboardView}>
            {data ? (
                <div>
                    {/* <h1>{data.name}'s Dashboard</h1> */}
                    <div className={styles.links}>
                        {ifShareClicked ? (
                            <button
                                className={styles.clickedShare}
                                onClick={ () => {
                                    navigator.clipboard.writeText(`http://localhost:3000/playgame/${encryptedObj}`);
                                }}
                            >
                                Copied!
                            </button>
                        ) : (
                            <button
                                className={styles.shareLink}
                                onClick={ () => {
                                    navigator.clipboard.writeText(`http://localhost:3000/playgame/${encryptedObj}`);
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

export default LeaderboardView;
