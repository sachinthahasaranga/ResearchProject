import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectCategory.css';

const SelectCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(''); // State for random background
    const navigate = useNavigate();
    const containerRef = useRef(null); // Ref for the container

    // Function to generate a random background image path
    const getRandomBackgroundImage = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
        return `/images/background/bg${randomNumber}.png`; // Construct the image path
    };

    // Set the random background image on component mount
    useEffect(() => {
        setBackgroundImage(getRandomBackgroundImage());
    }, []);

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
        <div
            className="main-container"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Set random background image
                backgroundSize: 'cover', // Ensure the background covers the entire container
                backgroundPosition: 'center', // Center the background image
                minHeight: '100vh', // Ensure the container takes up the full viewport height
                padding: '20px', // Add some padding

            }}
        >
             <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${backgroundImage})`, // Set random background image
                    backgroundSize: 'cover', // Ensure the background covers the entire container
                    backgroundPosition: 'center', // Center the background image
                    filter: 'blur(8px)', // Apply blur effect
                    WebkitFilter: 'blur(8px)', // For Safari support
                    zIndex: 0, // Place the blurred background behind the content
                    minHeight: '100vh', // Ensure the container takes up the full viewport height
                    padding: '20px', 
                }}
            ></div>
            <h1
                className={`text-white text-center w-100 p-3 bg-dark bg-opacity-50`}
                style={{ zIndex: 1, position: "relative", top: "10px" }}
            >
                Select a Category
            </h1>
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