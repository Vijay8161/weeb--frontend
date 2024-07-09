import React, { useContext } from 'react';
import styles from "../styles/topbar.module.css";
import { FaSearch, FaUser, FaComment, FaBell } from 'react-icons/fa';  // Import alternative icons
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={styles.topbarContainer}>
            <div className={styles.topbarLeft}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className={styles.logo}>Weeb</span>
                </Link>
            </div>
            <div className={styles.topbarCenter}>
                <div className={styles.searchBar}>
                    <FaSearch className={styles.searchIcon} />  {/* Search Icon */}
                    <input placeholder="Share your Thoughts !!" className={styles.searchInput} />
                </div>
            </div>
            <div className={styles.topbarRight}>
                <div className={styles.topbarLink}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className={styles.topbarLink}>Homepage</span>
                    </Link>
                    <Link to={`/timeline/${user.username}`} style={{ textDecoration: "none" }}>
                        <span className={styles.topbarLink}>Timeline</span>
                    </Link>
                </div>

                <div className={styles.topbarIcons}>
                    <div className={styles.topbarIconItem}>
                        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                            <FaUser className={styles.topbarIcon} />  {/* Person Icon */}
                            <span className={styles.topbarIconBadge}></span>
                        </Link>
                    </div>
                    <div className={styles.topbarIconItem}>
                        <FaComment className={styles.topbarIcon} />  {/* Chat Icon */}
                        <span className={styles.topbarIconBadge}></span>
                    </div>
                    <div className={styles.topbarIconItem}>
                        <FaBell className={styles.topbarIcon} />  {/* Notifications Icon */}
                        <span className={styles.topbarIconBadge}></span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "blank-profile-picture.png"} alt="" className={styles.topbarImg} />
                </Link>
            </div>
        </div>
    )
}
