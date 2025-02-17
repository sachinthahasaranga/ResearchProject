import { useNavigate } from "react-router-dom";

const ListeningHomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex m-0 p-0"
      style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}
    >
      {/* Main Session - Left Side */}
      <div
        className="d-flex align-items-center justify-content-center bg-primary text-white"
        style={{ width: "50vw", height: "100vh", cursor: "pointer" }}
        onClick={() => navigate("/main-session")}
      >
        <div className="text-center">
          <h2>Main Session</h2>
          <p>Start the main listening session.</p>
        </div>
      </div>

      {/* Practice Session - Right Side */}
      <div
        className="d-flex align-items-center justify-content-center bg-success text-white"
        style={{ width: "50vw", height: "100vh", cursor: "pointer" }}
        onClick={() => navigate("/practice-session")}
      >
        <div className="text-center">
          <h2>Practice Session</h2>
          <p>Practice your listening skills here.</p>
        </div>
      </div>
    </div>
  );
};

export default ListeningHomePage;
