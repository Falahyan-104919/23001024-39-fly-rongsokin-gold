import { Box, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react';
import ProfileContainers from '../containers/ProfileContainers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxesPacking,
  faComments,
  faHouse,
  faToolbox,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar() {
  return (
    <VStack mt="10px" padding="12px" gap="18px">
      <ProfileContainers />
      <LinkBox
        as="button"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
      >
        <LinkOverlay href="/">
          <Box
            display="flex"
            justifyContents="center"
            alignItems="center"
            gap="8px"
            textAlign="center"
          >
            <FontAwesomeIcon icon={faUsers} color="white" />
            <Text fontWeight="bold" color="white">
              Users Configuration
            </Text>
          </Box>
        </LinkOverlay>
      </LinkBox>
      <LinkBox
        as="button"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
      >
        <LinkOverlay href="/">
          <Box
            display="flex"
            justifyContents="center"
            alignItems="center"
            gap="8px"
            textAlign="center"
          >
            <FontAwesomeIcon icon={faBoxesPacking} color="white" />
            <Text fontWeight="bold" color="white">
              Product Configuration
            </Text>
          </Box>
        </LinkOverlay>
      </LinkBox>
      <LinkBox
        as="button"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
      >
        <LinkOverlay href="/">
          <Box
            display="flex"
            justifyContents="center"
            alignItems="center"
            gap="8px"
            textAlign="center"
          >
            <FontAwesomeIcon icon={faToolbox} color="white" />
            <Text fontWeight="bold" color="white" fontSize="14px">
              Product Type Configuration
            </Text>
          </Box>
        </LinkOverlay>
      </LinkBox>
      <LinkBox
        as="button"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
      >
        <LinkOverlay href="/">
          <Box
            display="flex"
            justifyContents="center"
            alignItems="center"
            gap="8px"
            textAlign="center"
          >
            <FontAwesomeIcon icon={faComments} color="white" />
            <Text fontWeight="bold" color="white">
              Forum Configuration
            </Text>
          </Box>
        </LinkOverlay>
      </LinkBox>
      <LinkBox
        as="button"
        width="100%"
        p="5"
        borderRadius="12px"
        backgroundColor="teal.300"
      >
        <LinkOverlay href="/">
          <Box
            display="flex"
            justifyContents="center"
            alignItems="center"
            gap="8px"
            textAlign="center"
          >
            <FontAwesomeIcon icon={faHouse} color="white" />
            <Text fontWeight="bold" color="white">
              Back To Home
            </Text>
          </Box>
        </LinkOverlay>
      </LinkBox>
    </VStack>
  );
}
