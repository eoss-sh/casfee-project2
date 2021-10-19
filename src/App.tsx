import { useEffect } from 'react';
import { useAppSelector } from './helpers/hooks';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { auth } from './config/firebase'
import { database, storage } from './config/firebase';
import { login, logout } from './features/auth/authSlice'
import GlobalStyle from './styles/global';
import Header from './components/Header/Header';
import routes from './config/routes';
import AuthRoute from './components/AuthRoute';

const App = () => {

  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user.email)


  // useEffect to persist Login on Refreshs
  useEffect(() => {
      auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          dispatch(login({
            email: userAuth.email,
            uid: userAuth.uid
          }))
        }
        else {
          dispatch(logout())
        }
      });
    }, [dispatch])

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Header />
          <h1>Current User: {currentUser}</h1>
          <Switch>
            {routes.map((route, index) => { 
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(routeProps: RouteComponentProps<any>) => {
                    if (route.protected) {
                      return <AuthRoute><route.component {...routeProps} /></AuthRoute>
                    }
                    return <route.component {...routeProps} />
                  }}
                />
              )
            })}
          </Switch>
        </BrowserRouter>

      </div>
    </>
   
  );
}

export default App;
