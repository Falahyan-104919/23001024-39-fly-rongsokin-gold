import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';
import { Avatar } from '@chakra-ui/react';

export default function UserAvatar() {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn && user.imageId) {
    return <div>Avatar</div>;
  }

  return <Avatar size="lg" name={user.fullname} src="/user-placeholder.png" />;
}
