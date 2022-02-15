import { database } from "../../config/firebase";
import singelCourse from "../../interfaces/course";

const fetchCoursesFunc = async () => {
  const coursesCollection: singelCourse[] = [];
  const snapshot = await database.collection("courses").get();
  snapshot.forEach((doc) => {
    coursesCollection.push({
      course: {
        name: doc.data().name,
        shortDesc: doc.data().shortDesc,
        desc: doc.data().desc,
        type: doc.data().type,
        url: doc.data().url,
        par: doc.data().par,
        uid: doc.id,
        error: "",
      },
    });
  });
  return coursesCollection;
};

export default fetchCoursesFunc;
