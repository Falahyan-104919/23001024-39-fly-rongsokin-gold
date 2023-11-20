import { Button, Text } from '@chakra-ui/react';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  return (
    <Button
      onClick={() => {
        logout();
      }}
      leftIcon={<FontAwesomeIcon icon={faRightToBracket} color="white" />}
      size="sm"
      bgColor="red.300"
    >
      <Text color="white">Logout</Text>
    </Button>
  );
}
