import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

export default function ForumMitra() {
  return (
    <Card
      variant="elevated"
      bgColor="teal.300"
      h="40px"
      justifyContent="center"
      mt="10px"
      alignItems="center"
    >
      <Link to="/forum_mitra">
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faHandshake} color="white" />
          <Text ml="10px" fontWeight="bold" color="white" fontSize="md">
            Forum Mitra
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
