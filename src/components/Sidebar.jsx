import React from 'react';
import styles from "../styles/sidebar.module.css";
import { RssFeed, Chat, Videocam, Group } from "@material-ui/icons";
import { Users } from "../dummyData.js";
import CloseFriends from "./CloseFriend.jsx";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarWrapper}>
                <ul className={styles.sidebarList}>
                    <li className={styles.sidebarListItem}>
                        <RssFeed className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="twitter.com" style={{ textDecoration: "none" }}>Twitter</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <Chat className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="facebook.com" style={{ textDecoration: "none" }}>Facebook</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <Videocam className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="youtube.com" style={{ textDecoration: "none" }}>Youtube</a></span>
                    </li>
                    <li className={styles.sidebarListItem}>
                        <Group className={styles.sidebarIcon} />
                        <span className={styles.sidebarListItemText}><a href="github.com" style={{ textDecoration: "none" }}>Github</a></span>
                    </li>
                </ul>
                <hr className={styles.sidebarHR} />
                <b>All Friends:</b>
                <ul className={styles.sidebarFriendList}>
                    {Users.map(u => (
                        <CloseFriends key={u.id} user={u} />
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}