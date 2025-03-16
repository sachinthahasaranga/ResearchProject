import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../styles/SelectCategory.css';

const SelectCategory = () => {
    const [categories, setCategories] = useState([]); 
    const [error, setError] = useState(''); // State to handle errors
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        // Fetch categories with the token
        axios.get('http://localhost:3000/api/ctgry', {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
        })
            .then(response => setCategories(response.data))
            .catch(error => {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories. Please try again.');
            });
    }, []);

    return (
        <div>
            <h1 className="category-title">Select A Category</h1>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Display error message */}
            <div className="category-container">
                <div className="cards-wrapper">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="card"
                            onClick={() => navigate(`/SelectListenings/${category._id}`)} // Navigate with category _id
                            style={{
                                backgroundImage: `url(/images/listeningCategories/${category.backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer' // Make it clickable
                            }}
                        >
                            <h2>{category.callingName}</h2>
                            <p>{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectCategory;