import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../../store/AuthProvider';

export default function MyOrder() {
  const { user } = useContext(AuthContext);
  return (
    <Card
      variant="elevated"
      bgColor="teal.300"
      h="40px"
      justifyContent="center"
      alignItems="center"
    >
      <Link to={`/order/${user.userId}`}>
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faBoxesStacked} color="white" />
          <Text ml="10px" fontWeight="bold" color="white" fontSize="md">
            My Order
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
