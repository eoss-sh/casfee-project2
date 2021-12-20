import IRoute from "../interfaces/route";
import RegisterPage from "../features/auth/register";
import LoginPage from "../features/auth/login";
import HomePage from "../pages/home";
import ForgotPwPage from "../features/auth/forgot";
import ProfilePage from "../pages/profile";
import SingleCourse from "../features/singleCourse/singleCourse";
import AddCoursePage from "../pages/kurs-erfassen";
import Scores from "../features/scores/Scores";
import AddScore from "../features/singelScore/AddScore";
import SingleScore from "../features/singelScore/SingleScore";

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
];

export default routes;
