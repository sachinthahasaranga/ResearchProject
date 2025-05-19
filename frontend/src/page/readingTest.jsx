import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
    const readingRef = useRef(null); // ✅ ref to always access current reading

    useEffect(() => {
        if (readingId) {
            fetchReadingDetail(readingId);
        }
    }, [readingId]);

    const fetchReadingDetail = async (id) => {
        try {
            const res = await apiClient.get(`/api/readings/${id}`);
            setReading(res.data);
            readingRef.current = res.data; // ✅ update ref with latest reading
            console.log("Fetched reading:", res.data);
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

            const originalText = readingRef.current?.content?.trim(); // ✅ using ref

            if (!originalText || !transcript) {
                console.error("Missing content for analysis", { originalText, transcript });
                setStatus("Missing data for analysis.");
                return;
            }

            console.log("Sending to analysis:", {
                original: originalText,
                given: transcript
            });

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

                    {spokenText && (
                        <div style={{ marginTop: '30px' }}>
                            <h4>Transcript:</h4>
                            <p style={{ maxWidth: '600px', margin: 'auto', fontSize: '16px', color: '#333' }}>
                                {spokenText}
                            </p>
                        </div>
                    )}

                    {analysisResult && (
                        <div style={{ marginTop: '30px' }}>
                            <h4>Analysis Result:</h4>
                            <pre style={{ textAlign: 'left', maxWidth: '600px', margin: 'auto', background: '#f8f8f8', padding: '10px', borderRadius: '6px' }}>
                                {JSON.stringify(analysisResult, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ReadingTest;
