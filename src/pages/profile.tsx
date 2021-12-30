import React from "react";
import { useAppSelector } from "../helpers/hooks";
import IPage from "../interfaces/page";
import MakeAdmin from "../features/Auth/makeAdmin";
import ChangePwPage from "../features/Auth/change";
import LogOutPage from "../features/Auth/logout";

const ProfilePage = (props: IPage) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  if (currentUser.uid) {
    return (
      <div>
        <ChangePwPage />
        <LogOutPage />
        {currentUser.admin && <MakeAdmin />}
      </div>
    );
  }
};

export default ProfilePage;
