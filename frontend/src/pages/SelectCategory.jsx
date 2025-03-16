import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectCategory.css';

const SelectCategory = () => {
    const [categories, setCategories] = useState([]); 
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const containerRef = useRef(null); // Ref for the container

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        axios.get('http://localhost:3000/api/ctgry', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => setCategories(response.data))
            .catch(error => {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories. Please try again.');
            });
    }, []);

    // Function to scroll left
    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -700, // Scroll by 700px to the left
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 700, // Scroll by 700px to the right
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    return (
        <div>
            <h1 className="category-title">Select A Category</h1>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div className="category-container" ref={containerRef}>
                <div className="cards-wrapper">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="card"
                            onClick={() => navigate(`/SelectListenings/${category._id}`)}
                            style={{
                                backgroundImage: `url(/images/listeningCategories/${category.backgroundImage})`,
                            }}
                        >
                            <h2>{category.callingName}</h2>
                            <p>{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Navigation buttons */}
            <button className="scroll-button left" onClick={scrollLeft}>‹</button>
            <button className="scroll-button right" onClick={scrollRight}>›</button>
        </div>
    );
};

export default SelectCategory;