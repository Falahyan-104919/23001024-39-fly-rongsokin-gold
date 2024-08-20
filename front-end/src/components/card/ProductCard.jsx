import { Link } from 'react-router-dom';
import { Box, Card, CardBody, GridItem, Image, Text } from '@chakra-ui/react';
import formatNumberWithCommas from '../../utils/helper';
export default function ProductCard({ name, price, imageURL, productId }) {
  const preppedURL = (path) => {
    const baseURL = 'http://localhost:8080/';
    // const baseURL = 'https://vxvs523h-8080.asse.devtunnels.ms/';
    const imagePath = path?.replace(/\\/g, '/');
    const encodedPath = encodeURI(imagePath);
    const imageURL = baseURL + encodedPath;
    return imageURL;
  };
  return (
    <GridItem w="100%" boxShadow="base">
      <Link to={`/products/${productId}`}>
        <Card p="10px" bgColor="#fffff" border="1px" borderColor="#ced4da">
          <CardBody p="5px">
            <Box h="200" w="150" justifyContent="center">
              <Image
                src={preppedURL(imageURL)}
                alt="placeholder"
                mb="10px"
                objectFit="cover"
                h="100%"
                w="100%"
                borderRadius="10px"
              />
            </Box>
            <Link to={`/products/${productId}`}>
              <Text noOfLines={1} color="black" fontWeight="semibold">
                {name}
              </Text>
            </Link>
            <Text color="black" fontWeight="bold">
              Rp. {formatNumberWithCommas(price)}
            </Text>
          </CardBody>
        </Card>
      </Link>
    </GridItem>
  );
}
