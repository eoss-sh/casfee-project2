import { useEffect, useState } from "react";
import { getAdditionalUserInfo } from "../../features/Auth/authApi";

interface UserAvatarProps {
  id: string;
}

const UserData = ({ id }: UserAvatarProps) => {
  const [image, setImage] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/birdiebook-c8af5.appspot.com/o/golfer-gd2c89f964_1280.png?alt=media&token=9489c1f6-1ead-481a-a9a3-8442551e8071"
  );
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function fetchUserImage() {
      const result = await getAdditionalUserInfo("appUser", id);
      const userData = result.data();
      userData?.url ? setImage(userData?.url) : setImage(image);
      userData?.name ? setName(userData?.name) : setName("unbekannter User");
    }
    fetchUserImage();
  }, [id]);

  return (
    <section className="userdata">
      <img className="userdata-img" src={image} alt="User" />
      <p className="userdata-name">{name}</p>
    </section>
  );
};

export default UserData;
