import {
  CardHeader,
  Text,
  Flex,
  CardBody,
  Card,
  Avatar,
  Heading,
  CardFooter,
} from '@chakra-ui/react';
import { Link, useHref } from 'react-router-dom';

export default function ForumCard(props) {
  const url = useHref();
  const formattedTime = new Date(props.time).toString();
  const path_decider = url.includes('customer') ? '/user/' : '/mitra/';
  return (
    <Card m="10px" mb="25px">
      <CardHeader>
        <Flex>
          <Avatar src="user-placeholder.png" />
          <Flex direction={'column'} ml="10px">
            <Link to={`${path_decider}${props.userId}`}>
              <Text as="b">{props.fullname}</Text>
            </Link>
            <Text>{props.email}</Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Heading size="md" mb="25px">
          {props.title}
        </Heading>
        <Text>{props.content}</Text>
      </CardBody>
      <CardFooter>
        <Text color="gray.500">{formattedTime}</Text>
      </CardFooter>
    </Card>
  );
}
