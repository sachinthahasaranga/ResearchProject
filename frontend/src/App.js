import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'swiper/css';
import ScrollToTop from "./component/layout/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute"; 
import ErrorPage from "./page/404";
import AboutPage from "./page/about";
import ContactPage from "./page/contact";
import CoursePage from "./page/course";
import CourseView from "./page/course-view";
import ForgetPass from "./page/forgetpass";
import Home from "./page/home";
import LoginPage from "./page/login";
import SearchNone from "./page/search-none";
import SearchPage from "./page/search-page";
import SignupPage from "./page/signup";
import TeamPage from "./page/team";
import TeamSingle from "./page/team-single";
import PaperList from "./page/PaperList";
import PaperDetails from "./page/PaperDetails";
import StudentProfile from "./page/StudentProfile";
import GameLaunch from "./page/GameLaunch";
import AutoCapture from "./page/CameraCapturing";

 import ReadingActivity from "./page/readingActivity";
 import ReadingActivityHome from "./page/readingActivityHome";
 import ReadingTest from "./page/readingTest";
 import ReadingResults from "./page/readingResult";
 import ListeningHomePage from "./page/ListeningHomePage";
 import SelectCategory from "./page/SelectCategory";
 import SelectListeningsPractise from "./page/SelectListeningsPractise";
 import SelectListenings from "./page/SelectListenings";
 import Listening from "./page/Listening";
import ListeningResult from "./page/ListeningResult";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <AutoCapture />
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgetpass" element={<ForgetPass />} />
        

        {/* Protected Routes: Requires Login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="game-launch" element={<GameLaunch />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="course-view/:id" element={<CourseView />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="team-single" element={<TeamSingle />} />
          <Route path="search-page/:name" element={<SearchPage />} />
          <Route path="search-none" element={<SearchNone />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="paperlist" element={<PaperList />} />
          <Route path="paper-details/:paperId" element={<PaperDetails />} />
          <Route path="studentprofile" element={<StudentProfile />} />

          <Route path="reading" element={<ReadingActivity />} />
          <Route path="readingHome/:categoryId" element={<ReadingActivityHome />} />
          <Route path="/readingtest/:readingId" element={<ReadingTest />} />
          <Route path="/readingResults" element={<ReadingResults />} />
          <Route path="ListeningHomePage" element={<ListeningHomePage />} />
          <Route path="SelectListeningCategory" element={<SelectCategory/>} />
          <Route path="SelectListeningsPractise" element={<SelectListeningsPractise />} /> 
          <Route path="SelectListenings" element={<SelectListenings />} />
          <Route path="listening" element={<Listening />} />
          <Route path="listeningResult" element={<ListeningResult />} />

        </Route>

        {/* 404 Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
