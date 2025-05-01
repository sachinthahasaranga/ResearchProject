import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

const ReadingActivityHome = () => {
    const { categoryId } = useParams();
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        if (categoryId) {
            fetchReadings(categoryId);
        }
    }, [categoryId]);

    const fetchReadings = async (id) => {
        try {
            const res = await apiClient.get(`/api/readings/category/${id}`);
            setReadings(res.data);
        } catch (err) {
            console.error("Error fetching readings:", err);
        }
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title="Select Reading" />
                <div style={{ flex: 1, padding: '20px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '20px',
                    }}>
                        {readings.map((item) => (
                            <Link
                                key={item._id}
                                to={`/readingtest/${item._id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    width: '100%',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    textAlign: 'center',
                                }}>
                                    <h3>{item.name}</h3>
                                    <p>Click to read</p>
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

export default ReadingActivityHome;
