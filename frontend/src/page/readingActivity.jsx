import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

const ReadingActivity = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await apiClient.get("/api/ctgry/");
            // Filter here before setting state
            const readingCategories = response.data.filter(cat => cat.categoryType === "reading");
            setCategories(readingCategories);
            console.log("Filtered categories (reading):", readingCategories);
        } catch (error) {
            console.error("Error fetching reading categories:", error);
        }
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title="Reading Activity" />
                <div style={{ flex: 1, padding: '20px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        justifyItems: 'center'
                    }}>
                        {categories.map((cat) => (
                            <Link 
                                key={cat._id} 
                                to={`/readingHome/${cat._id}`} 
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                            >
                                <div style={{
                                    width: '100%',
                                    maxWidth: '250px',
                                    height: '220px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#f9f9f9',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    cursor: 'pointer',
                                    padding: '15px',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s'
                                }}>
                                    <h3 style={{ marginBottom: '10px' }}>{cat.callingName}</h3>
                                    <p style={{ fontSize: '14px', color: '#666' }}>{cat.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingActivity;
