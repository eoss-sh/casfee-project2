import IRoute from "../interfaces/route";
import AboutPage from "../pages/about";
import RegisterPage from "../pages/auth/register";
import LoginPage from "../pages/auth/login";
import HomePage from "../pages/home";
import ChangePwPage from "../pages/auth/change";
import LogOutPage from "../pages/auth/logout";
import ForgotPwPage from "../pages/auth/forgot";

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
        protected: true,
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
        path: '/change',
        name: 'Passwort Change Page',
        component: ChangePwPage,
        exact: true,
        protected: true,
    },
        {
        path: '/logout',
        name: 'Logout',
        component: LogOutPage,
        exact: true,
        protected: true,
    },
        {
        path: '/forgot',
        name: 'Forgot PW Page',
        component: ForgotPwPage,
        exact: true,
        protected: true,
    },
]

export default routes; 