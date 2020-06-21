import React, {useContext} from 'react'
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Ranking from '../pages/Ranking'

interface privateRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType
}

const PrivateRoute: React.FC<privateRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { id } = useContext(AuthContext)
  
  return (
    <Route
      {...rest}
      render={() =>
        id && id !== 'none' ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <PrivateRoute path="/game" component={Home} />
    <Route path="/ranking" component={Ranking} />
  </Switch>
)

export default Routes