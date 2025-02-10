import { useNavigate } from "react-router-dom";

const ListeningHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Listening Home Page</h1>
      <p>This is where users can practice listening skills.</p>

      <div className="row mt-4">
        {/* Main Session */}
        <div
          className="col-md-6 p-4 border rounded shadow-lg bg-primary text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/main-session")}
        >
          <h2>Main Session</h2>
          <p>Start the main listening session.</p>
        </div>

        {/* Practice Session */}
        <div
          className="col-md-6 p-4 border rounded shadow-lg bg-success text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/practice-session")}
        >
          <h2>Practice Session</h2>
          <p>Practice your listening skills here.</p>
        </div>
      </div>
    </div>
  );
};

export default ListeningHomePage;
