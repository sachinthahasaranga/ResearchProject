import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SelectCategory.css'; // Import the CSS file for styling

const SelectCategory = () => {
    const [categories, setCategories] = useState([]); // State to store categories

    // Fetch categories from API
    useEffect(() => {
        axios.get('http://localhost:3000/api/ctgry') // Ensure this matches your backend route
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
                            style={{
                                backgroundImage: `url(/images/listeningCategories/${category.backgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
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
