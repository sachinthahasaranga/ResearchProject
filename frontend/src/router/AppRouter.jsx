import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListeningHomePage from "../pages/ListeningHomePage";
import App from "../App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listening" element={<ListeningHomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
