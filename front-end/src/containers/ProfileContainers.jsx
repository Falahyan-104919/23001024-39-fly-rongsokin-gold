import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import UserAvatar from '../components/UserAvatar';
import { Link } from 'react-router-dom';

export default function ProfileContainers() {
  const { user, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <Container
        // shadow="base"
        borderRadius="20px"
        // bgColor="#03045e"
        bgColor="#ffffff"
        boxShadow="outline"
      >
        <Flex alignItems="center" gap="10px" mt="10px" mb="10px">
          <UserAvatar />
          <Box w="100%">
            <Link to={`/user/${user.userId}`}>
              <Text fontSize="lg" fontWeight="bold" color="#03045e">
                {user.fullname}
              </Text>
            </Link>
            <Text fontSize="sm" color="#03045e">
              {user.email}
            </Text>
          </Box>
        </Flex>
      </Container>
    );
  }

  return null;
}
