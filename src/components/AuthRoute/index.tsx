import React from "react";
import { Redirect } from "react-router";
import { auth } from "../../config/firebase";
import { useAppSelector } from "../../helpers/hooks";

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = (props: IAuthRouteProps) => {
  const { children } = props;
  const user = useAppSelector((state) => state.auth.user);

  if (!auth.currentUser && !user.loading) {
    return <Redirect to="/login" />;
  }

  return <div>{children}</div>;
};

export default AuthRoute;
