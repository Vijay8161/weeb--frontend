import React, { useContext, useEffect, useState } from 'react';
import styles from "../styles/post.module.css";
import { MoreVert } from "@material-ui/icons";
import axios from '../utils/client.js';
import likeIcon from "../assets/likeIcon.png";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export default function Post({ post }) {
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(post.userId));
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    const handleClick = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { userId: currentUser._id }  // Pass userId in the request body
            });
            alert("Post deleted successfully");
        } catch (err) {
            console.error('Failed to delete the post:', err);
            alert('Error deleting post');
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setUser(res.data);
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            setIsLiked(!isLiked);
        } catch (err) {
            console.error('Failed to like the post:', err);
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    };

    return (
        <div className={styles.post}>
            <div className={styles.postWrapper}>
                <div className={styles.postTop}>
                    <div className={styles.postTopLeft}>
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className={styles.postProfileImg}
                                src={user.profilePicture ? PF + user.profilePicture : PF + "blank-profile-picture.png"}
                                alt={user.username}
                            />
                        </Link>
                        <span className={styles.postUsername}>{user.username}</span>
                        <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className={styles.postTopRight}>
                        <MoreVert />
                    </div>
                </div>
                <div className={styles.postCenter}>
                    {post.desc && <span className={styles.postText}>{post.desc}</span>}
                    {post.img && <img className={styles.postImage} src={PF + post.img} alt="Post content" />}
                </div>
                <div className={styles.postBottom}>
                    <div className={styles.postBottomLeft}>
                        <img
                            className={styles.likeIcon}
                            src={likeIcon}
                            onClick={likeHandler}
                            alt="Like button"
                        />
                        <span className={styles.postLikeCounter}>{likeCount} people like it</span>
                    </div>
                    {currentUser._id === post.userId && (
                        <div>
                            <button onClick={handleClick} className="btn btn-danger">
                                Delete Post
                            </button>
                        </div>
                    )}
                    <div className={styles.postBottomRight}>
                        <span className={styles.postCommentText}>{post.commentCount || 0} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
