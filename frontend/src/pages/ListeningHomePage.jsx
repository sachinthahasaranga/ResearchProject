import { useNavigate } from "react-router-dom";

const ListeningHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid text-center vh-100 d-flex p-0">
      <div className="row w-100 h-100 m-0">
        {/* Main Session */}
        <div className="col-md-6 d-flex p-0">
          <div
            className="card shadow-lg bg-primary text-white w-100 h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/main-session")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h2 className="card-title">Main Session</h2>
              <p className="card-text text-center">Start the main listening session.</p>
            </div>
          </div>
        </div>

        {/* Practice Session */}
        <div className="col-md-6 d-flex p-0">
          <div
            className="card shadow-lg bg-success text-white w-100 h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/practice-session")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h2 className="card-title">Practice Session</h2>
              <p className="card-text text-center">Practice your listening skills here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningHomePage;
