import {
  Box,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import ProfileContainers from '../containers/ProfileContainers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faComments,
  faHouse,
  faStore,
  faToolbox,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar() {
  return (
    <VStack mt="10px" padding="12px" gap="18px">
      <ProfileContainers />
      <ChakraLink
        as={ReactRouterLink}
        to="user_configuration"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
        style={{ textDecoration: 'none' }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          textAlign="center"
        >
          <FontAwesomeIcon icon={faUsers} color="white" />
          <Text fontWeight="bold" color="white">
            Users Configuration
          </Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to="product_configuration"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
        style={{ textDecoration: 'none' }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          textAlign="center"
        >
          <FontAwesomeIcon icon={faBoxesPacking} color="white" />
          <Text fontWeight="bold" color="white">
            Product Configuration
          </Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to="mitra_settings"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
        style={{ textDecoration: 'none' }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          textAlign="center"
        >
          <FontAwesomeIcon icon={faStore} color="white" />
          <Text fontWeight="bold" color="white" fontSize="14px">
            Mitra Settings
          </Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to="forum_customer"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
        style={{ textDecoration: 'none' }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyItems="center"
          gap="16px"
        >
          <FontAwesomeIcon icon={faComments} color="white" size="1x" />
          <Text
            fontWeight="bold"
            color="white"
            wordBreak="break-word"
            fontSize="xs"
          >
            Forum Customer Configuration
          </Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to="forum_mitra"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
        style={{ textDecoration: 'none' }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyItems="center"
          gap="16px"
        >
          <FontAwesomeIcon icon={faComments} color="white" size="1x" />
          <Text
            fontWeight="bold"
            color="white"
            wordBreak="break-word"
            fontSize="sm"
          >
            Forum Mitra Configuration
          </Text>
        </Box>
      </ChakraLink>
      <ChakraLink
        as={ReactRouterLink}
        to="/"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="8px"
          textAlign="center"
        >
          <FontAwesomeIcon icon={faHouse} color="white" />
          <Text fontWeight="bold" color="white">
            Back To Home
          </Text>
        </Box>
      </ChakraLink>
    </VStack>
  );
}
