import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./CreatorView.module.css";
import Leaderboard from "../components/Leaderboard";
var CryptoJS = require("crypto-js");

const CreatorView = () => {
    // const { id, name, word } = useParams();
    const [data, setData] = useState(null);
    const { encryptedObj } = useParams();

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
        // const { id, name, word } = decryptedObject;
        console.log(decryptedObj);
    }, []);

    return (
        <div className={styles.CreatorView}>
            {data ? (
                <div>
                    {/* <Header /> */}
                    {/* <h1>{data.name}'s Dashboard</h1> */}
                    <div className={styles.links}>
                        {/* <h3>Creator Link:</h3> */}
                        <a
                            href={`http://localhost:3000/creator/${encryptedObj}`}
                        >
                            Creator Link
                        </a>
                        <a
                            href={`http://localhost:3000/playgame/${encryptedObj}`}
                        >
                            Share Link
                        </a>
                    </div>
                    {/* <div className="links">
                        <h3>Share Link:</h3>
                    </div> */}
                    {/* insert leader board component here */}
                    <Leaderboard name={data.name} id={data.id} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CreatorView;
