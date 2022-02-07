import React, { useEffect } from "react";
import useStorage from "../../helpers/customHooks/useStorage";

interface UploaderProps {
  image: File;
  setImage: (image: File) => void;
  setUrl: (url: string) => void;
}

const Uploader = ({ image, setImage, setUrl }: UploaderProps) => {
  const { url, progress } = useStorage(image);
  console.log(progress, url);
  // ToDos
  // 1. Add Progressbar
  // 2. Use SetImage to remove Progressbar
  // 3. Pass also setURL and set URL via Function in Parent to use.
  useEffect(() => {
    setUrl(url);
  }, [url, setUrl]);

  return (
    <>
      <small>Upload</small>
      <img src={url} alt="Uploaded" />
    </>
  );
};

export default Uploader;
