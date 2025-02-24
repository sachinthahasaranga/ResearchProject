import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListeningHomePage from "../pages/ListeningHomePage";
import SelectCategory from "../pages/SelectCategory";
import App from "../App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listening" element={<ListeningHomePage />} />
        <Route path="/SelectListeningCategory" element={<SelectCategory />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
