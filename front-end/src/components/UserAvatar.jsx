import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';
import { Avatar } from '@chakra-ui/react';

export default function UserAvatar() {
  const { user } = useContext(AuthContext);
  const resolvePathImg = (path) => {
    const baseURL = 'http://localhost:8080/';
    const imagePath = path?.replace(/\\/g, '/');
    const encodedPath = encodeURI(imagePath);
    const imageURL = baseURL + encodedPath;
    return imageURL;
  };

  return (
    <Avatar
      size="lg"
      name={user.fullname}
      showBorder="true"
      src={
        user.profileImg == null || user.profileImg == undefined
          ? '/user-placeholder.png'
          : resolvePathImg(user.profileImg)
      }
    />
  );
}
