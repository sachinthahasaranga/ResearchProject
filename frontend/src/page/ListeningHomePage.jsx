import { useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import "../assets/css/LatestCourse.css";
import "react-circular-progressbar/dist/styles.css";
import "../styles/listeningHome.css"; 
import mainSessionImage from "../assets/mainSessionJake.jpg";
import practiceSessionImage from "../assets/finn_practise.png";

const ListeningHomePage = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <PageHeader title="ListeningHomePage" />
            
            {/* Main content container */}
            <div style={{ 
                display: 'flex', 
                flex: 1, // Takes up remaining space
                width: '100%',
                overflow: 'hidden' // Prevents internal scrolling
            }}>
                {/* Main Session - Left Side */}
                <div
                    className="session-box"
                    style={{ 
                        backgroundImage: `url(${mainSessionImage})`,
                        width: '50%'
                    }}
                    onClick={() => navigate("/SelectListeningCategory", {
                        state: { isPractise: false },
                    })}
                >
                    <div className="session-content">
                        <h2>Main Session</h2>
                        <p>Start the main listening session.</p>
                    </div>
                </div>

                {/* Practice Session - Right Side */}
                <div
                    className="session-box"
                    style={{ 
                        backgroundImage: `url(${practiceSessionImage})`,
                        width: '50%'
                    }}
                    onClick={() => navigate("/SelectListeningCategory", {
                        state: { isPractise: true },
                    })}
                >
                    <div className="session-content">
                        <h2>Practice Session</h2>
                        <p>Practice your listening skills here.</p>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ListeningHomePage;