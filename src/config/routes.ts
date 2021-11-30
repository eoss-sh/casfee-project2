import IRoute from "../interfaces/route";
import RegisterPage from "../features/auth/register";
import LoginPage from "../features/auth/login";
import HomePage from "../pages/home";
import ForgotPwPage from "../features/auth/forgot";
import ProfilePage from "../pages/profile";
import SingleCourse from "../features/singleCourse/singleCourse";
import AddCoursePage from "../pages/kurs-erfassen";

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home Page',
    component: HomePage,
    exact: true,
    protected: false,
  },
  {
    path: '/course/:id',
    name: 'Home Page',
    component: SingleCourse,
    exact: true,
    protected: false,
  },
  {
    path: '/register',
    name: 'Register Page',
    component: RegisterPage,
    exact: true,
    protected: false,
  },
  {
    path: '/login',
    name: 'Login Page',
    component: LoginPage,
    exact: true,
    protected: false,
  },
  {
    path: '/forgot',
    name: 'Forgot PW Page',
    component: ForgotPwPage,
    exact: true,
    protected: true,
  },
  {
    path: '/profile',
    name: 'Profile Page',
    component: ProfilePage,
    exact: true,
    protected: true,
  },
  {
    path: '/add-course',
    name: 'Add Course Page',
    component: AddCoursePage,
    exact: true,
    protected: true,
  },
];

export default routes; 