import { useNavigate } from "react-router-dom";
import mainSessionImage from "../assets/Main_session.jpg"; // Import Main Session Image
import practiceSessionImage from "../assets/practice_session.jpg"; // Import Practice Session Image

const ListeningHomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex m-0 p-0"
      style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      {/* Main Session - Left Side (With Background Image) */}
      <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          width: "50vw",
          height: "100vh",
          cursor: "pointer",
          backgroundImage: `url(${mainSessionImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => navigate("/main-session")}
      >
        <div className="text-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px", borderRadius: "8px" }}>
          <h2>Main Session</h2>
          <p>Start the main listening session.</p>
        </div>
      </div>

      {/* Practice Session - Right Side (With Background Image) */}
      <div
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          width: "50vw",
          height: "100vh",
          cursor: "pointer",
          backgroundImage: `url(${practiceSessionImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => navigate("/practice-session")}
      >
        <div className="text-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "10px", borderRadius: "8px" }}>
          <h2>Practice Session</h2>
          <p>Practice your listening skills here.</p>
        </div>
      </div>
    </div>
  );
};

export default ListeningHomePage;
