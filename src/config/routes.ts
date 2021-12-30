import IRoute from "../interfaces/route";
import RegisterPage from "../features/Auth/register";
import LoginPage from "../features/Auth/login";
import HomePage from "../pages/home";
import ForgotPwPage from "../features/Auth/forgot";
import ProfilePage from "../pages/profile";
import SingleCourse from "../features/SingleCourse/singleCourse";
import AddCoursePage from "../pages/kurs-erfassen";
import Scores from "../features/Scores/Scores";
import AddScore from "../features/SingelScore/AddScore";
import SingleScore from "../features/SingelScore/SingleScore";
import Statistics from "../features/Statistics/Statistics";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
    exact: true,
    protected: false,
  },
  {
    path: "/course/:id",
    name: "Home Page",
    component: SingleCourse,
    exact: true,
    protected: false,
  },
  {
    path: "/register",
    name: "Register Page",
    component: RegisterPage,
    exact: true,
    protected: false,
  },
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage,
    exact: true,
    protected: false,
  },
  {
    path: "/forgot",
    name: "Forgot PW Page",
    component: ForgotPwPage,
    exact: true,
    protected: true,
  },
  {
    path: "/profile",
    name: "Profile Page",
    component: ProfilePage,
    exact: true,
    protected: true,
  },
  {
    path: "/add-course",
    name: "Add Course Page",
    component: AddCoursePage,
    exact: true,
    protected: true,
  },
  {
    path: "/scores",
    name: "Scores Page",
    component: Scores,
    exact: true,
    protected: false,
  },
  {
    path: "/add-score",
    name: "New Score Page",
    component: AddScore,
    exact: true,
    protected: false,
  },
  {
    path: "/singlescore/:id",
    name: "Single Score Page",
    component: SingleScore,
    exact: true,
    protected: false,
  },
  {
    path: "/statistics",
    name: "Statistics Page",
    component: Statistics,
    exact: true,
    protected: false,
  },
];

export default routes;
