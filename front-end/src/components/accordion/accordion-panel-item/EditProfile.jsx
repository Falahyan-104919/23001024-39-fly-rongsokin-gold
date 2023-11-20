import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function EditProfile({ userId }) {
  return (
    <Card
      variant="elevated"
      bgColor="teal.300"
      h="40px"
      justifyContent="center"
      alignItems="center"
    >
      <Link to={`/profile/${userId}`}>
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faEdit} color="white" />
          <Text ml="10px" fontWeight="bold" color="white">
            Edit Profile
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
