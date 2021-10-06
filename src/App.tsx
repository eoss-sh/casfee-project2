import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Header from './components/Header/Header';
import logging from './config/logging';
import routes from './config/routes';

const App: React.FunctionComponent<{}> = props => {
  useEffect(() => { 
    logging.info('loading application')
  }, [])

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Header />
          <switch>
            {routes.map((route, index) => { 
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props:RouteComponentProps<any>) => (
                    <route.component
                      name={ route.name}
                        {...props}
                        {...route.props}
                      />
                  )}
                />
              )
            })}
          </switch>
        </BrowserRouter>

      </div>
    </>
   
  );
}

export default App;
