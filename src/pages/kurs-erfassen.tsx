import React from "react";
import { useAppSelector } from "../helpers/hooks";
import IPage from "../interfaces/page";
import AddCourse from "../features/SingleCourse/AddCourse";

const AddCoursePage = (props: IPage) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  if (currentUser.uid) {
    return <div>{currentUser.admin && <AddCourse />}</div>;
  }
};

export default AddCoursePage;
