import {
  CardHeader,
  Text,
  Flex,
  CardBody,
  Card,
  Avatar,
  Heading,
  CardFooter,
  Box,
  Image,
} from '@chakra-ui/react';
import { Link, useHref } from 'react-router-dom';

export default function ForumCard(props) {
  const url = useHref();
  const image_path =
    props.images[0].image_path != null
      ? props.images.map((image) => {
          if (image['image_path'] != null) {
            const fixed_path =
              'http://localhost:8080/' +
              image['image_path'].replace(/\\/g, '/');
            // const fixed_path =
            //   'https://vxvs523h-8080.asse.devtunnels.ms/' +
            //   image['image_path'].replace(/\\/g, '/');
            return fixed_path;
          }
        })
      : null;
  const formattedTime = new Date(props.time).toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    dayPeriod: 'narrow',
    hour: 'numeric',
    minute: 'numeric',
  });
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
        <Flex gap={2}>
          {image_path != null || undefined
            ? image_path.map((path, index) => {
                return (
                  <Box key={index}>
                    <Image
                      src={path}
                      alt={`attached_image_${index}`}
                      boxSize="150px"
                      objectFit="cover"
                    />
                  </Box>
                );
              })
            : null}
        </Flex>
      </CardBody>
      <CardFooter>
        <Text color="gray.500">{formattedTime}</Text>
      </CardFooter>
    </Card>
  );
}
