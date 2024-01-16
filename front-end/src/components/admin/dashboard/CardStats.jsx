import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Text,
} from '@chakra-ui/react';
import {
  faBoxesStacked,
  faComments,
  faMoneyBill,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function CardStats() {
  return (
    <Container
      display="flex"
      flexDir="row"
      columnGap="8px"
      flexGrow="1"
      maxW="full"
      justifyContent="space-evenly"
    >
      <Card width="250px" variant="filled">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold">
            Total Users
          </Text>
        </CardHeader>
        <CardBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            minW="max-content"
            columnGap="12px"
          >
            <FontAwesomeIcon icon={faUsers} fontSize="48px" color="teal" />
            <Text fontSize="4xl" fontWeight="bold">
              50
            </Text>
          </Flex>
        </CardBody>
        <CardFooter borderTop="1px">
          <ChakraLink as={ReactRouterLink} to="/">
            See More <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </CardFooter>
      </Card>
      <Card width="250px" variant="filled">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold">
            Total Products
          </Text>
        </CardHeader>
        <CardBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            minW="max-content"
            columnGap="12px"
          >
            <FontAwesomeIcon
              icon={faBoxesStacked}
              fontSize="48px"
              color="teal"
            />
            <Text fontSize="4xl" fontWeight="bold">
              50
            </Text>
          </Flex>
        </CardBody>
        <CardFooter borderTop="1px">
          <ChakraLink as={ReactRouterLink} to="/">
            See More <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </CardFooter>
      </Card>
      <Card width="250px" variant="filled">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold">
            Total Discussion
          </Text>
        </CardHeader>
        <CardBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            minW="max-content"
            columnGap="12px"
          >
            <FontAwesomeIcon icon={faComments} fontSize="48px" color="teal" />
            <Text fontSize="4xl" fontWeight="bold">
              50
            </Text>
          </Flex>
        </CardBody>
        <CardFooter borderTop="1px">
          <ChakraLink as={ReactRouterLink} to="/">
            See More <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </CardFooter>
      </Card>
      <Card width="250px" variant="filled">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold">
            Total Transaction
          </Text>
        </CardHeader>
        <CardBody>
          <Flex
            alignItems="center"
            justifyContent="center"
            minW="max-content"
            columnGap="12px"
          >
            <FontAwesomeIcon icon={faMoneyBill} fontSize="48px" color="teal" />
            <Text fontSize="4xl" fontWeight="bold">
              50
            </Text>
          </Flex>
        </CardBody>
        <CardFooter borderTop="1px">
          <ChakraLink as={ReactRouterLink} to="/">
            See More <ExternalLinkIcon mx="2px" />
          </ChakraLink>
        </CardFooter>
      </Card>
    </Container>
  );
}
