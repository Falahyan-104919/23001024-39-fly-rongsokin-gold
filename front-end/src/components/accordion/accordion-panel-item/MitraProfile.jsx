import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faStore } from '@fortawesome/free-solid-svg-icons';

export default function MitraProfile({ mitraId }) {
  return (
    <Card
      variant="elevated"
      bgColor="#ffffff"
      h="40px"
      justifyContent="center"
      alignItems="center"
      marginTop="10px"
    >
      <Link to={`/mitra/${mitraId}`}>
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faStore} color="#03045e" />
          <Text ml="10px" fontWeight="bold" color="#03045e">
            Mitra Profile
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
