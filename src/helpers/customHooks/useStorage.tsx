import { useState, useEffect } from "react";
import {storage} from '../../config/firebase'


const useStorage = (file: File) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        const storageRef = storage.ref(file.name)
        storageRef.put(file).on('state_changed', (snapshot) => {
            let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(uploadProgress);
            
        }, (err) => {
            setError(err.message);
        }, async () => {
            const url = await storageRef.getDownloadURL()
            setUrl(url)
        })

    }, [file])
    return {progress, url, error}
}
export default useStorage;