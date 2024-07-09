import React, { useContext, useEffect, useState } from 'react';
import styles from "../styles/feed.module.css";
import Share from "./Share.jsx";
import Post from "./Post.jsx";
import axios from '../utils/client.js';
import { AuthContext } from '../context/AuthContext';

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    console.log(user._id);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = username
                    ? await axios.get(`/posts/profile/${username}`)
                    : await axios.get(`/posts/timeline/${user._id}`);
                setPosts(
                    res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
                );
            } catch (err) {
                console.error('Failed to fetch posts:', err);
            }
        };

        fetchPosts();
    }, [username, user._id]);

    return (
        <div className={styles.feed}>
            <div className={styles.feedWrapper}>
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
