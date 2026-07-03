import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Extracting form data directly from the submitted form
        const formData = new FormData(e.target);

        try {
            // Making a POST request to the backend endpoint
            const response = await axios.post('http://localhost:3000/create-post', formData, {
                // Ensure credentials (like cookies) are sent if needed later
                withCredentials: true 
            });
            
            console.log(response.data);
            
            // Navigate to the feed page after successful creation
            navigate('/feed');
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

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
    );
};

export default CreatePost;