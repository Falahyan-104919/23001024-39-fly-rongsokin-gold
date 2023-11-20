import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubesStacked } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../../store/AuthProvider';

export default function MyProducts() {
  const { user } = useContext(AuthContext);
  return (
    <Card
      variant="elevated"
      bgColor="teal.300"
      h="40px"
      justifyContent="center"
      alignItems="center"
    >
      <Link to={`/product_configuration/${user.mitraId}`}>
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faCubesStacked} color="white" />
          <Text ml="10px" fontWeight="bold" color="white" fontSize="md">
            My Products
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
