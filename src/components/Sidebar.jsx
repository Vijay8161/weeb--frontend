import React from 'react';
import styles from "../styles/sidebar.module.css";
import { FaRss, FaFacebookF, FaYoutube, FaGithub } from 'react-icons/fa';  // Import alternative icons
import { Users } from "../dummyData.js";
import CloseFriends from "./CloseFriend.jsx";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarWrapper}>
                <ul className={styles.sidebarList}>
                    <li className={styles.sidebarListItem}>
                        <FaRss className={styles.sidebarIcon} />  {/* RSS Feed Icon */}
                        <span className={styles.sidebarListItemText}><a href="https://twitter.com" style={{ textDecoration: "none" }}>Twitter</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <FaFacebookF className={styles.sidebarIcon} />  {/* Facebook Icon */}
                        <span className={styles.sidebarListItemText}><a href="https://facebook.com" style={{ textDecoration: "none" }}>Facebook</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <FaYoutube className={styles.sidebarIcon} />  {/* Youtube Icon */}
                        <span className={styles.sidebarListItemText}><a href="https://youtube.com" style={{ textDecoration: "none" }}>Youtube</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <FaGithub className={styles.sidebarIcon} />  {/* Github Icon */}
                        <span className={styles.sidebarListItemText}><a href="https://github.com" style={{ textDecoration: "none" }}>Github</a></span>
                    </li>
                </ul>
                <hr className={styles.sidebarHR} />
                <b>All Friends:</b>
                <ul className={styles.sidebarFriendList}>
                    {Users.map(u => (
                        <CloseFriends key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
