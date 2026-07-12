import React, { useRef } from 'react'
import axios from 'axios' //used to talk to the backend (axios is mainly for web communication)
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    // const fileInputRef = useRef(null)
    // const captionInputRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target)

        const formData = new FormData(e.target)
        // formData.append('image', fileInputRef.current.files[0])
        // formData.append('caption', captionInputRef.current.value)

        await axios.post('http://localhost:3000/create-post', formData)
            .then((res) => {
                console.log(res)
                navigate('/feed')
            }).catch((error)=>{
            console.error("Error creating post:", error)
            })
    }

    return (
        <section className="create-post-section">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                />
                <input
                    type="text"
                    name="caption"
                    placeholder="Enter caption"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default CreatePost
