
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/SelectCategory.css';
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import "../assets/css/LatestCourse.css";
import apiClient from "../api";



const SelectCategory = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [backgroundImage, setBackgroundImage] = useState(''); // State for random background
    const navigate = useNavigate();
    const containerRef = useRef(null); // Ref for the container
    const location = useLocation();
    const { isPractise } = location.state || true;

    const getRandomBackgroundImage = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        return `/images/background/bg${randomNumber}.png`;
    };

    useEffect(() => {
        setBackgroundImage(getRandomBackgroundImage());
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            //setLoading(true);
            const response = await apiClient.get('/api/ctgry');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories. Please try again.');
        } finally {
            //setLoading(false);
        }
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -700, // Scroll by 700px to the left
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 700, // Scroll by 700px to the right
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };


    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title="SelectCategory" />
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
                    {/* <h1
                        className={`text-white text-center w-100 p-3 bg-dark bg-opacity-50`}
                        style={{ zIndex: 1, position: "relative", top: "10px" }}
                    >
                        Select a Category
                    </h1> */}
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <div className="category-container" ref={containerRef}>
                        <div className="cards-wrapper">
                            {categories.map((category) => (
                                <div
                                    key={category._id}
                                    className="card"
                                    onClick={() => navigate(isPractise ? '/SelectListeningsPractise' : '/SelectListenings', { state: { categoryId: category._id } })}
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

            </div>
            <Footer />
        </>
    );
};

export default SelectCategory;
