import { Card, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faHandshake,
} from '@fortawesome/free-regular-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboard() {
  return (
    <Card
      variant="elevated"
      bgColor="#ffffff"
      h="40px"
      justifyContent="center"
      alignItems="center"
      mt="10px"
    >
      <Link to="/admin_dashboard">
        <Flex as="span" alignItems="center" textAlign="left">
          <FontAwesomeIcon icon={faChartPie} color="#03045e" />
          <Text ml="10px" fontWeight="bold" color="#03045e" fontSize="md">
            Admin Dashboard
          </Text>
        </Flex>
      </Link>
    </Card>
  );
}
