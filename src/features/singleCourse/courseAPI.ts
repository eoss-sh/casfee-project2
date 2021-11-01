import { database } from '../../config/firebase';

export function fetchSingleCourse(uid: string) {
    database.collection('courses').doc().get();
}