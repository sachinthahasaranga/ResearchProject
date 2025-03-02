import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../styles/SelectCategory.css';

const SelectCategory = () => {
    const [categories, setCategories] = useState([]); 
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        axios.get('http://localhost:3000/api/ctgry')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div>
            <h1 className="category-title">Select A Category</h1>
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
