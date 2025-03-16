import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListeningHomePage from "../pages/ListeningHomePage";
import SelectCategory from "../pages/SelectCategory";
import App from "../App";
import SelectListenings from "../pages/SelectListenings";
import Listening from '../pages/Listening';
import ListeningResult from "../pages/ListeningResult";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listeningHome" element={<ListeningHomePage />} />
        <Route path="/SelectListeningCategory" element={<SelectCategory />} />
        <Route path="/SelectListenings" element={<SelectListenings />} /> 
        <Route path="/listening" element={<Listening />} />
        <Route path="/listeningResult" element={<ListeningResult />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Modified to accept categoryId */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
