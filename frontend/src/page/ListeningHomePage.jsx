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
        <div className="page-container">
            <Header />
            <PageHeader title="Listening Sessions" />
            
            <div className="sessions-wrapper">
                {/* Main Session */}
                <div 
                    className="session-box main-session"
                    onClick={() => navigate("/SelectListeningCategory", { state: { isPractise: false } })}
                >
                    <div className="session-overlay"></div>
                    <div className="session-content">
                        <h2>Main Session</h2>
                        <p>Start the official listening test</p>
                    </div>
                </div>

                {/* Practice Session */}
                <div 
                    className="session-box practice-session"
                    onClick={() => navigate("/SelectListeningCategory", { state: { isPractise: true } })}
                >
                    <div className="session-overlay"></div>
                    <div className="session-content">
                        <h2>Practice Session</h2>
                        <p>Practice your listening skills</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ListeningHomePage;