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
        <>
            <Header />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <PageHeader title="ListeningHomePage" />
                 <div className="d-flex m-0 p-0" style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      {/* Main Session - Left Side */}
      <div
        className="session-box"
        style={{ backgroundImage: `url(${mainSessionImage})` }}
        onClick={() => navigate("/SelectListeningCategory", {
          state: { isPractise: false }, // Pass only the listening ID
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
        style={{ backgroundImage: `url(${practiceSessionImage})` }}
        onClick={() => navigate("/SelectListeningCategory", {state: { isPractise: true },})} // Updated navigation path
      >
        <div className="session-content">
          <h2>Practice Session</h2>
          <p>Practice your listening skills here.</p>
        </div>
      </div>
    </div>

            </div>
            <Footer />
        </>
    );
};

export default ListeningHomePage;
