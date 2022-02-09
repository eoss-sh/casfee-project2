import React from "react";
import { Redirect } from "react-router";
import { useAppSelector } from "../../helpers/hooks";

export interface IAdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = (props: IAdminRouteProps) => {
  const { children } = props;
  const currentUser = useAppSelector((state) => state.auth.user);

  if (!currentUser.admin) {
    return <Redirect to="/register" />;
  }

  return <div>{children}</div>;
};

export default AdminRoute;
