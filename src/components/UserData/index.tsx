import { useEffect, useState } from "react";
import { getAdditionalUserInfo } from "../../features/Auth/authApi";

interface UserAvatarProps {
  id: string;
}

const UserData = ({ id }: UserAvatarProps) => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function fetchUserImage() {
      const result = await getAdditionalUserInfo("appUser", id);
      const userData = result.data();
      setImage(userData?.url);
      setName(userData?.name);
    }
    fetchUserImage();
  }, [id]);

  return (
    <section>
      <img src={image} alt="User" />
      <p>{name}</p>
    </section>
  );
};

export default UserData;
