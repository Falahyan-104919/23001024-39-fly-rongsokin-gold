import { Link } from 'react-router-dom';
import { Box, Card, CardBody, GridItem, Image, Text } from '@chakra-ui/react';
export default function ProductCard({ name, price, imageURL, productId }) {
  const preppedURL = (path) => {
    const baseURL = 'http://localhost:7000/';
    const imagePath = path?.replace(/\\/g, '/');
    const encodedPath = encodeURI(imagePath);
    const imageURL = baseURL + encodedPath;
    return imageURL;
  };
  return (
    <GridItem w="100%" boxShadow="base">
      <Card p="10px">
        <CardBody p="5px">
          <Box h="200" w="150">
            <Image
              src={preppedURL(imageURL)}
              alt="placeholder"
              mb="10px"
              objectFit="cover"
              w="100%"
              h="100%"
              borderRadius="10px"
            />
          </Box>
          <Link to={`/products/${productId}`}>
            <Text>{name}</Text>
          </Link>
          <Text>Rp. {price}</Text>
        </CardBody>
      </Card>
    </GridItem>
  );
}
