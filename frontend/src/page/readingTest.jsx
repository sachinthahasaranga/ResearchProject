import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

const ReadingTest = () => {
    const { readingId } = useParams();  // ✅ Correct param
    const [reading, setReading] = useState(null);

    useEffect(() => {
        if (readingId) {
            fetchReadingDetail(readingId);
        }
    }, [readingId]);

    const fetchReadingDetail = async (id) => {
        try {
            const res = await apiClient.get(`/api/readings/${id}`);
            setReading(res.data);
        } catch (err) {
            console.error("Error fetching reading detail:", err);
        }
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title={reading ? reading.name : "Loading..."} />
                <div style={{ flex: 1, padding: '20px' }}>
                    {reading && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ maxWidth: '600px', textAlign: 'center', fontSize: '18px' }}>
                                {reading.content}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingTest;
