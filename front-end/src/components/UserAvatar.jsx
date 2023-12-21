import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';
import { Avatar } from '@chakra-ui/react';

export default function UserAvatar() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const resolvePathImg = (path) => {
    const baseURL = 'http://localhost:8080/';
    const imagePath = path?.replace(/\\/g, '/');
    const encodedPath = encodeURI(imagePath);
    const imageURL = baseURL + encodedPath;
    return imageURL;
  };

  if (isLoggedIn && user.imageId) {
    return <div>Avatar</div>;
  }

  return (
    <Avatar
      size="lg"
      name={user.fullname}
      src={
        user.profileImg !== undefined
          ? resolvePathImg(user.profileImg)
          : '/user-placeholder.png'
      }
    />
  );
}
