import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import "../assets/css/LatestCourse.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const errorTypeLabels = {
    1: "Phonetic Error",
    2: "Semantic Error",
    3: "Spelling Error",
    4: "Unknown Error",
    5: "Extra Word",
    6: "Missing Word"
};

const errorTypeColors = {
    1: "#FFB347",
    2: "#87CEEB",
    3: "#FF6961",
    4: "#C0C0C0",
    5: "#FFD700",
    6: "#DC143C"
};

const ReadingResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { transcript, analysis, readingTitle, readingContent } = location.state || {};
    const [dictionaryData, setDictionaryData] = useState({});

    useEffect(() => {
        if (!transcript || !analysis) {
            navigate("/");
        } else {
            fetchPhoneticDefinitions();
        }
    }, [transcript, analysis, navigate]);

    const fetchPhoneticDefinitions = async () => {
        const phoneticWords = (analysis?.defects || [])
            .filter(d => d.error_type === 1 && d.original)
            .map(d => d.original.toLowerCase());

        const uniqueWords = [...new Set(phoneticWords)];

        const results = {};
        for (const word of uniqueWords) {
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const json = await res.json();
                results[word] = json[0];
            } catch (error) {
                results[word] = null;
            }
        }
        setDictionaryData(results);
    };

    const highlightErrorsInReadingContent = () => {
        if (!analysis?.defects) return readingContent;

        const errorMap = {};
        analysis.defects.forEach(defect => {
            if (defect.original && defect.error_type) {
                const word = defect.original.toLowerCase();
                errorMap[word] = defect.error_type;
            }
        });

        const words = readingContent.split(/\b/);
        return words.map((word, idx) => {
            const cleanWord = word.replace(/[^\w\s]|_/g, "").toLowerCase();
            const errorType = errorMap[cleanWord];
            if (errorType) {
                return (
                    <span
                        key={idx}
                        style={{
                            backgroundColor: errorTypeColors[errorType] || "#fdd",
                            color: "white",
                            fontWeight: "bold",
                            padding: "0 2px",
                            borderRadius: "3px"
                        }}
                        title={errorTypeLabels[errorType]}
                    >
                        {word}
                    </span>
                );
            }
            return <span key={idx}>{word}</span>;
        });
    };

    const renderErrorCards = () => {
        const nonMissingDefects = (analysis?.defects || []).filter(defect => defect.error_type !== 6);

        if (nonMissingDefects.length === 0) {
            return <p style={{ textAlign: 'center' }}>No non-missing-word errors found</p>;
        }

        return nonMissingDefects.map((defect, index) => {
            const wordKey = defect.original?.toLowerCase();
            const dictionary = dictionaryData[wordKey];

            return (
                <div key={index} style={{
                    border: `2px solid ${errorTypeColors[defect.error_type] || "#ccc"}`,
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    backgroundColor: "#fdfdfd",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}>
                    <p><strong>Error Type:</strong> {errorTypeLabels[defect.error_type] || "Unrecognized Error"}</p>
                    <p><strong>Should Be:</strong> {defect.original || "-"}</p>
                    <p><strong>You Said:</strong> {defect.given || "-"}</p>

                    {defect.error_type === 1 && dictionary && (
                        <div style={{ marginTop: "10px", fontSize: "14px" }}>
                            <p><strong>Definition:</strong> {dictionary.meanings?.[0]?.definitions?.[0]?.definition || "Not found"}</p>
                            {dictionary.phonetics?.[0]?.audio && (
                                <div>
                                    <strong>Pronunciation:</strong><br />
                                    <audio controls src={dictionary.phonetics[0].audio}>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title="Your Results" />
                <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                    <h2>{readingTitle}</h2>
                    <p style={{ maxWidth: '600px', margin: 'auto', lineHeight: '1.8em' }}>
                        {highlightErrorsInReadingContent()}
                    </p>

                    <h4 style={{ marginTop: '20px' }}>You Have Said</h4>
                    <p style={{ maxWidth: '600px', margin: 'auto', fontSize: '16px', color: '#333' }}>
                        {transcript}
                    </p>

                    <h4 style={{ marginTop: '30px' }}>Score</h4>
                    <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px auto' }}>
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbar
                                    value={analysis?.score || 0}
                                    text={`${analysis?.score || 0}%`}
                                    styles={buildStyles({
                                        textSize: '18px',
                                        pathColor: '#4CAF50',
                                        textColor: '#333',
                                        trailColor: '#eee'
                                    })}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', textAlign: 'left' }}>
                            {renderErrorCards()}
                        </div>
                    </div>

                    <Link to="/" style={{ marginTop: '30px', display: 'inline-block' }}>Go Home</Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingResults;
