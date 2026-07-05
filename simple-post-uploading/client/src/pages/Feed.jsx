import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([])

    //useeffect to only call the api once otherwise it will get called everytime
    useEffect(() => {
            axios.get('http://localhost:3000/posts')
            .then((res) => {
                console.log(res.data.posts)
                setPosts(res.data.posts)
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
            })
        },[])

    return (
        <section className="feed-section">
            {

                //Arrow function with () automatically returns 
                // But with {} we need to explicitely write the return statement 
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt="Post content" />
                            <h3>{post.caption}</h3>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }
        </section>
    )
}

export default Feed