import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

export default function ForumMitra() {
  return (
    <Card
      variant="elevated"
      bgColor="#ffffff"
      h="40px"
      justifyContent="center"
      mt="10px"
      alignItems="center"
    >
      <Link to="/forum_mitra">
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faHandshake} color="#03045e" />
          <Text ml="10px" fontWeight="bold" color="#03045e" fontSize="md">
            Forum Mitra
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
