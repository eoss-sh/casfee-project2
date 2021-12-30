import { useEffect, useState } from "react";
import { getAdditionalUserInfo } from "../../features/Auth/authApi";
import { AvatarSmall, UserDataSection } from "../../styles/user";

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
    <UserDataSection>
      <AvatarSmall src={image} />
      <p>{name}</p>
    </UserDataSection>
  );
};

export default UserData;
