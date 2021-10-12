import { useAppSelector } from './helpers/hooks';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Header from './components/Header/Header';
import routes from './config/routes';
import AuthRoute from './components/AuthRoute';

const App = () => {

  const currentUser = useAppSelector((state) => state.auth.user.email)


  return (
    <>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Header />
          <h1>Current User: { currentUser}</h1>
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
