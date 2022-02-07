import React from "react";
import { useAppSelector } from "../helpers/hooks";
import IPage from "../interfaces/page";
import MakeAdmin from "../features/Auth/makeAdmin";
import ChangePwPage from "../features/Auth/change";
import Profile from "../features/Auth/profileBlock";
import LogOutPage from "../features/Auth/logout";
import { TwoColumns, HalfWidthColumn } from "../styles/layouts";

const ProfilePage = (props: IPage) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  if (currentUser.uid) {
    return (
      <>
        <TwoColumns small>
          <ChangePwPage />
          <LogOutPage />
        </TwoColumns>
        <HalfWidthColumn>{currentUser.admin && <MakeAdmin />}</HalfWidthColumn>
        <Profile />
      </>
    );
  }
};

export default ProfilePage;
