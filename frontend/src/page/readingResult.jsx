import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

const ReadingResults = () => {
    
    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title="Your Results" />
                <div style={{ flex: 1, padding: '20px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '20px',
                    }}>
                       
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingResults;
