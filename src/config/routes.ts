import IRoute from "../interfaces/route";
import AboutPage from "../pages/about";
import RegisterPage from "../pages/auth/register";
import LoginPage from "../pages/auth/login";
import HomePage from "../pages/home";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true,
        protected: false,
    },
    {
        path: '/about',
        name: 'About Page',
        component: AboutPage,
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
    }
]

export default routes; 