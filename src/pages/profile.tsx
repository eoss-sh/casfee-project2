import React from "react";
import IPage from "../interfaces/page";
import ChangePwPage from "../features/Auth/change";
import Profile from "../features/Auth/profileBlock";
import SmallHero from "../components/SmallHero";

const ProfilePage = (props: IPage) => {
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
};

export default ProfilePage;
