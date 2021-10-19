import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import config from './config';

const Firebase = firebase.initializeApp(config.firebase);

export const auth = firebase.auth();
export const storage = firebase.storage(); 
export const database = firebase.firestore(); 
export default Firebase; 