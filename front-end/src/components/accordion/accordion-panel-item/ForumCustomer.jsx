import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faHandshake,
} from '@fortawesome/free-regular-svg-icons';

export default function ForumCustomer() {
  return (
    <Card
      variant="elevated"
      bgColor="teal.300"
      h="40px"
      justifyContent="center"
      alignItems="center"
    >
      <Link to="/forum_customer">
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faCommentDots} color="white" />
          <Text ml="10px" fontWeight="bold" color="white" fontSize="md">
            Forum Customer
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
