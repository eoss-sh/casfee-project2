import {database} from '../../config/firebase'


export const getAdditionalUserInfo = async (collectionName: string, uid: string | undefined) => {
    return await database.collection(collectionName).doc(uid).get();
}
