import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Spinner,
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
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../utils/axios';

export default function CardStats() {
  const fetchCardStats = async () => {
    const stats = await axiosInstance
      .get('admin/card_stats')
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
    return stats;
  };
  const { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchCardStats,
  });
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
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            ) : (
              <Text fontSize="4xl" fontWeight="bold">
                {data.user_count}
              </Text>
            )}
          </Flex>
        </CardBody>
        <CardFooter borderTop="1px">
          <ChakraLink as={ReactRouterLink} to="user_configuration">
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
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            ) : (
              <Text fontSize="4xl" fontWeight="bold">
                {data.product_count}
              </Text>
            )}
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
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            ) : (
              <Text fontSize="4xl" fontWeight="bold">
                {data.discussion_count}
              </Text>
            )}
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
            {isLoading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            ) : (
              <Text fontSize="4xl" fontWeight="bold">
                {data.transaction_count}
              </Text>
            )}
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

/*
user_count: "18", product_count: "17", discussion_count: "9", transaction_count: "8"
*/
