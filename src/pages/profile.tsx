import React from "react";
import { useAppSelector } from "../helpers/hooks";
import IPage from "../interfaces/page";
import ChangePwPage from "../features/Auth/change";
import Profile from "../features/Auth/profileBlock";
import SmallHero from "../components/SmallHero";

const ProfilePage = (props: IPage) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  if (currentUser.uid) {
    return (
      <>
        <SmallHero
          title="Nutzer Profil"
          subtitle="Alle Angaben zu deinem Nutzer."
        />
        <Profile />
        <ChangePwPage />
      </>
    );
  }
};

export default ProfilePage;
