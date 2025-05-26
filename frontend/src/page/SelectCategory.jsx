import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SelectCategory.css';
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import "../assets/css/LatestCourse.css";
import apiClient from "../api";

const SelectCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const location = useLocation();
    const { isPractise } = location.state || { isPractise: true };

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
            const response = await apiClient.get('/api/ctgry');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories. Please try again.');
        }
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -700, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 700, behavior: 'smooth' });
        }
    };

    return (
        <div className="page-container">
            <Header />
            <PageHeader title="Select Category" />
            
            <div className="main-content-wrapper">
                <div className="content-section">
                    {/* Background image with blur */}
                    <div 
                        className="background-image" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    ></div>
                    
                    {/* Content area */}
                    <div className="content-area">
                        {error && <p className="error-message">{error}</p>}
                        
                        <div className="category-container" ref={containerRef}>
                            <div className="cards-wrapper">
                                {categories.map((category) => (
                                    <div
                                        key={category._id}
                                        className="cards"
                                        onClick={() => navigate(isPractise ? '/SelectListeningsPractise' : '/SelectListenings', 
                                            { state: { categoryId: category._id } })}
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
                        
                        <button className="scroll-button left" onClick={scrollLeft}>‹</button>
                        <button className="scroll-button right" onClick={scrollRight}>›</button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default SelectCategory;