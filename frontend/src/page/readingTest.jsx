import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactMic } from "react-mic";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import apiClient from "../api";
import "../assets/css/LatestCourse.css";

const ReadingTest = () => {
    const { readingId } = useParams();
    const [reading, setReading] = useState(null);
    const [record, setRecord] = useState(false);
    const [spokenText, setSpokenText] = useState("");
    const [status, setStatus] = useState("");
    const [analysisResult, setAnalysisResult] = useState(null);
    const readingRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (readingId) {
            fetchReadingDetail(readingId);
        }
    }, [readingId]);

    const fetchReadingDetail = async (id) => {
        try {
            const res = await apiClient.get(`/api/readings/${id}`);
            setReading(res.data);
            readingRef.current = res.data;
        } catch (err) {
            console.error("Error fetching reading detail:", err);
        }
    };

    const startRecording = () => {
        setRecord(true);
        setSpokenText("");
        setAnalysisResult(null);
        setStatus("Recording...");
    };

    const stopRecording = () => {
        setRecord(false);
        setStatus("Processing...");
    };

    const onStop = async (recordedBlob) => {
        try {
            const formData = new FormData();
            formData.append("audio", recordedBlob.blob, "speech.wav");

            const token = localStorage.getItem("token");

            const res = await apiClient.post(
                "/api/readings/transcribe",
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const transcript = res.data.transcript?.trim();
            setSpokenText(transcript);
            setStatus("Analyzing...");

            const originalText = readingRef.current?.content?.trim();

            if (!originalText || !transcript) {
                console.error("Missing content for analysis", { originalText, transcript });
                setStatus("Missing data for analysis.");
                return;
            }

            const analyzeRes = await apiClient.post(
                "/api/readings/analyze",
                {
                    original: originalText,
                    given: transcript
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setAnalysisResult(analyzeRes.data);
            setStatus("Done");
            console.log("Analysis result:", analyzeRes.data);
            // Navigate to results page with data
            navigate("/readingResults", {
                state: {
                    transcript,
                    analysis: analyzeRes.data,
                    readingTitle: readingRef.current?.name,
                    readingContent: readingRef.current?.content
                }
            });

        } catch (err) {
            console.error("Transcription or analysis failed:", err);
            setStatus("Failed to transcribe or analyze");
        }
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title={reading ? reading.name : "Loading..."} />
                <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                    {reading && (
                        <div style={{ marginBottom: '30px' }}>
                            <p style={{ maxWidth: '600px', margin: 'auto', fontSize: '18px' }}>
                                {reading.content}
                            </p>
                        </div>
                    )}

                    <ReactMic
                        record={record}
                        className="sound-wave"
                        mimeType="audio/webm"
                        onStop={onStop}
                        strokeColor="#000000"
                        backgroundColor="#FF4081"
                    />

                    <div style={{ marginTop: "20px" }}>
                        <button onClick={startRecording} disabled={record}>Start</button>
                        <button onClick={stopRecording} disabled={!record}>Stop</button>
                    </div>

                    {status && <p style={{ marginTop: '20px' }}>{status}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingTest;
