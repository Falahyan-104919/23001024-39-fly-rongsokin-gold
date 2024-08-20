import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../../store/AuthProvider';

export default function MyTransaction() {
  const { user } = useContext(AuthContext);
  return (
    <Card
      variant="elevated"
      bgColor="#ffffff"
      h="40px"
      justifyContent="center"
      mt="10px"
      alignItems="center"
    >
      <Link to={`/transaction/${user.mitraId}`}>
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faClockRotateLeft} color="#03045e" />
          <Text ml="10px" fontWeight="bold" color="#03045e" fontSize="md">
            My Transaction
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
