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
            fetchDictionaryDefinitions();
        }
    }, [transcript, analysis, navigate]);

    const fetchDictionaryDefinitions = async () => {
        const words = (analysis?.defects || [])
            .filter(d => [1, 2, 3].includes(d.error_type) && d.original)
            .map(d => d.original.toLowerCase());

        const uniqueWords = [...new Set(words)];
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
    if (!analysis?.defects || !Array.isArray(analysis.defects)) return readingContent;

    // Split into words + keep spaces/punctuation
    const tokens = readingContent.split(/(\s+|[^\w\s]+)/g); // Match words, spaces, punctuation
    if (!tokens) return readingContent;

    let defectIndex = 0;

    return tokens.map((token, idx) => {
        // If it's not a word (e.g., space or punctuation), just render normally
        if (!/\w/.test(token)) {
            return <span key={idx}>{token}</span>;
        }

        const defect = analysis.defects[defectIndex++];

        // Only highlight specific error types
        if (
            defect &&
            defect.error_type !== 4 && // Skip UNKNOWN_ERROR
            (
                (defect.error_type === 6 && !defect.given) ||
                [1, 2, 3].includes(defect.error_type)
            )
        ) {
            return (
                <span
                    key={idx}
                    style={{
                        backgroundColor: errorTypeColors[defect.error_type] || "#fdd",
                        color: "white",
                        fontWeight: "bold",
                        padding: "0 3px",
                        borderRadius: "4px"
                    }}
                    title={errorTypeLabels[defect.error_type]}
                >
                    {token}
                </span>
            );
        }

        return <span key={idx}>{token}</span>;
    });
};

const renderErrorCards = () => {
    const filteredDefects = (analysis?.defects || []).filter(
        defect =>
            defect.error_type !== 0 &&
            defect.error_type !== 4 &&
            defect.error_type !== 6
    );

    if (filteredDefects.length === 0) {
        return <p style={{ textAlign: 'center' }}>No displayable errors found.</p>;
    }

    return filteredDefects.map((defect, index) => {
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

                {[1, 2].includes(defect.error_type) && dictionary && (
                    <div style={{ marginTop: "10px", fontSize: "14px" }}>
                        <p><strong>Definition:</strong> {dictionary.meanings?.[0]?.definitions?.[0]?.definition || "Not found"}</p>
                        <p><strong>Part of Speech:</strong> {dictionary.meanings?.[0]?.partOfSpeech || "N/A"}</p>
                        <p><strong>Synonyms:</strong> {dictionary.meanings?.[0]?.synonyms?.slice(0, 5).join(', ') || "N/A"}</p>

                        {defect.error_type === 1 && (() => {
                            const audioUrl = dictionary.phonetics?.find(p => p.audio)?.audio;
                            if (audioUrl) {
                                return (
                                    <div style={{ marginTop: '10px' }}>
                                        <strong>Pronunciation:</strong><br />
                                        <audio controls src={audioUrl}>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                );
                            }
                            return null;
                        })()}
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
