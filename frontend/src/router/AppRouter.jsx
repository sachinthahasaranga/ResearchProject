import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListeningHomePage from "../pages/ListeningHomePage";
import SelectCategory from "../pages/SelectCategory";
import App from "../App";
import SelectListenings from "../pages/SelectListenings";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listening" element={<ListeningHomePage />} />
        <Route path="/SelectListeningCategory" element={<SelectCategory />} />
        <Route path="/SelectListenings/:categoryId" element={<SelectListenings />} /> 
        {/* Modified to accept categoryId */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
