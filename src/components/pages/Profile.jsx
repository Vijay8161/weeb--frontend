import React, { useEffect, useState } from 'react';
import styles from "../../styles/Profile.module.css";
import Sidebar from '../Sidebar.jsx';
import Topbar from "../Topbar.jsx";
import Feed from "../Feed.jsx";
import Rightbar from "../Rightbar.jsx";
import axios from '../../utils/client.js';
import { useParams } from "react-router";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Fetching user data");
                const res = await axios.get(`/users?username=${username}`);
                console.log(res);
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <div className={styles.profile}>
                <Sidebar />
                <div className={styles.profileRight}>
                    <div className={styles.profileRightTop}>
                        <div className={styles.profileCover}>
                            <img
                                className={styles.profileCoverImage}
                                src={
                                    user.coverPicture
                                        ? PF + user.coverPicture
                                        : PF + "forest.jpg"
                                }
                                alt=""
                            />
                            <img
                                className={styles.profileUserImage}
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "rawData1.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className={styles.profileInfo}>
                            <h4 className={styles.profileInfoName}>{user.username}</h4>
                            <h4 className={styles.profileInfoDesc}>{user.desc}</h4>
                        </div>
                    </div>
                    <div className={styles.profileRightBottom}>
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
