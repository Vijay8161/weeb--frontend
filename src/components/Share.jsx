import React, { useContext, useRef, useState } from 'react';
import styles from "../styles/share.module.css";
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/client.js';

// Replace icons with alternative elements
import { AiOutlineFileImage } from 'react-icons/ai';  // Photo or Video icon
import { GrClose } from 'react-icons/gr';  // Cancel icon

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }

        console.log(newPost);
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;

            try {
                await axios.post("/", data);
            }
            catch (err) {
                console.log(err);
            }
        }

        try {
            const response = await axios.post("/posts", newPost);
            // Update your UI or state as needed without reloading
            console.log("New post added:", response.data);
            desc.current.value = '';
            setFile(null);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.share}>
            <div className={styles.shareWrapper}>

                <div className={styles.shareTop}>
                    {/* src=profilePic */}
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "blank-profile-picture.png"} alt="" className={styles.shareProfileImg} />
                    <input placeholder={"What's happening on campus " + user.username + "?"} className={styles.shareInput} ref={desc} />
                </div>
                <hr className={styles.shareHr} />
                {file && (
                    <div className={styles.shareImgContainer}>
                        <img className={styles.shareImg} src={URL.createObjectURL(file)} alt="" />
                        <GrClose className={styles.shareCancelImg} onClick={() => setFile(null)} />
                    </div>
                )}
                <form className={styles.shareBottom} onSubmit={submitHandler}>
                    <div className={styles.shareOptions}>
                        <label htmlFor="file" className={styles.shareOption}>
                            <AiOutlineFileImage className={styles.shareIcon} />
                            <span className={styles.shareOptionText}>Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                    <button className={styles.shareButton} type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
