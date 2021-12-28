import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { auth } from "./config/firebase";
import { login, logout } from "./features/auth/authSlice";
import GlobalStyle from "./styles/global";
import Header from "./features/Header/Header";
import routes from "./config/routes";
import AuthRoute from "./components/AuthRoute";
import { getAdditionalUserInfo } from "./features/auth/authApi";

const App = () => {
  const dispatch = useDispatch();

  // useEffect to persist Login on Refreshs
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const userData = await getAdditionalUserInfo("appUser", userAuth?.uid);
      const tokens = await userAuth?.getIdTokenResult();
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            url: userData.data()?.url,
            admin: tokens?.claims.admin,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(routeProps: RouteComponentProps<any>) => {
                    if (route.protected) {
                      return (
                        <AuthRoute>
                          <route.component {...routeProps} />
                        </AuthRoute>
                      );
                    }
                    return <route.component {...routeProps} />;
                  }}
                />
              );
            })}
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
