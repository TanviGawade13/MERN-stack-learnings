import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Function to fetch posts from the backend
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/post', {
                    withCredentials: true 
                });
                
                // Update state with the fetched data array
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <section className="feed-section">
            {posts.map((post) => (
                <div key={post._id} className="post-card">
                    {/* post.image holds the Cloud URL (ImageKit) stored in the database */}
                    <img 
                        src={post.image} 
                        alt={post.caption} 
                        style={{ maxWidth: '100%', borderRadius: '8px' }} 
                    />
                    <h3>{post.caption}</h3>
                </div>
            ))}
        </section>
    );
};

export default Feed;