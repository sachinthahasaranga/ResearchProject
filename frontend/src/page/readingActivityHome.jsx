import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import "../assets/css/LatestCourse.css";
import apiClient from "../api"; // your configured axios instance

const ReadingActivityHome = () => {
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const res = await apiClient.get("/api/readings/category/680ccd8e81e2d4911e2d81a9");
                setReadings(res.data);
            } catch (err) {
                console.error("Error fetching readings:", err);
            }
        };

        fetchReadings();
    }, []);

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
                            <div key={item._id} style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '20px',
                                width: '100%',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                textAlign: 'center',
                            }}>
                                <h3>{item.name}</h3>
                                <Link to={`/reading/${item._id}`}>Read More</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingActivityHome;
