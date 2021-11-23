import { database } from '../../config/firebase';

export function fetchSingleCourse(uid: string) {
    return database.collection('courses').doc().get()
}

export async function fetchHolesPerCourse(uid: string) {
    return await database.collection('courses').doc(uid).collection('Holes').get()
}