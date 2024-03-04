import { Badge } from '@chakra-ui/react';

const BadgeStatus = ({ status }) => {
  switch (status) {
    case 'waiting_for_payment':
      return (
        <Badge variant="subtle" colorScheme="yellow">
          {status.replaceAll('_', ' ').toUpperCase()}
        </Badge>
      );
    case 'waiting_for_delivery':
      return (
        <Badge variant="subtle" colorScheme="blue">
          {status.replaceAll('_', ' ').toUpperCase()}
        </Badge>
      );
    case 'on_the_way':
      return (
        <Badge variant="subtle" colorScheme="green">
          {status.replaceAll('_', ' ').toUpperCase()}
        </Badge>
      );
    case 'success':
      return (
        <Badge variant="subtle" colorScheme="teal">
          {status.toUpperCase()}
        </Badge>
      );
    default:
      return (
        <Badge variant="subtle" colorScheme="red">
          {status.toUpperCase()}
        </Badge>
      );
  }
};

export default BadgeStatus;
