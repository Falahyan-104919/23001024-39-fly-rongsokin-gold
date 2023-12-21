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
  Divider,
  Spacer,
} from '@chakra-ui/react';
import { Link, useHref } from 'react-router-dom';
import MenuForumCard from '../button/MenuForumCard';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export default function ForumCard(props) {
  const { user } = useContext(AuthContext);
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
  const profile_image_path =
    props.profileImg[0].image_path == null
      ? 'user-placeholder.png'
      : `http://localhost:8080/${props.profileImg[0].image_path}`;

  return (
    <Card m="10px" mb="25px">
      <CardHeader>
        <Flex>
          <Flex>
            <Avatar src={profile_image_path} />
            <Flex direction={'column'} ml="10px">
              <Link to={`${path_decider}${props.userId}`}>
                <Text as="b">{props.fullname}</Text>
              </Link>
              <Text>{props.email}</Text>
            </Flex>
          </Flex>
          <Spacer />
          {user.userId == props.userId || user.mitraId == props.userId ? (
            <MenuForumCard />
          ) : null}
        </Flex>
      </CardHeader>
      <CardBody>
        <Heading size="md" mb="25px">
          {props.title}
        </Heading>
        <Text mb={5}>{props.content}</Text>
        <Divider />
        <Flex gap={2} mt={5}>
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
