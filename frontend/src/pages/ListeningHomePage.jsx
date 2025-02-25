import { useNavigate } from "react-router-dom";
import "../styles/listeningHome.css"; // Corrected CSS import
import mainSessionImage from "../assets/mainSessionJake.jpg";
import practiceSessionImage from "../assets/finn_practise.png";

const ListeningHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex m-0 p-0" style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      {/* Main Session - Left Side */}
      <div
        className="session-box"
        style={{ backgroundImage: `url(${mainSessionImage})` }}
        onClick={() => navigate("/main-session")}
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
        onClick={() => navigate("/SelectListeningCategory")} // Updated navigation path
      >
        <div className="session-content">
          <h2>Practice Session</h2>
          <p>Practice your listening skills here.</p>
        </div>
      </div>
    </div>
  );
};

export default ListeningHomePage;
