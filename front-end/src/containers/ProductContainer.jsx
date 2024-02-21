import {
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import TabsDetailProduct from '../components/tabs/TabsDetailProduct';
import FormOrderProduct from '../components/form/FormOrderProduct';

export default function ProductContainer() {
  const { productId } = useParams();

  const fetchProduct = async (productId) => {
    return await axiosInstance
      .get(`product/${productId}`)
      .then((res) => res.data);
  };

  const { data, isError, isLoading, isFetched, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  if (isError) {
    return (
      <Flex alignItems="center" justifyContent="center" h="80vh">
        <Text>
          Product not Found <br />
          {error.message}
        </Text>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" h="80vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  const displayImage = (path) => {
    const baseURL = 'http://localhost:8080/';
    const imagePath = path.replace(/\\/g, '/');
    const encodePath = encodeURI(imagePath);
    const publicURL = baseURL + encodePath;
    return publicURL;
  };
  if (isFetched) {
    return (
      <Grid
        h="575px"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={3}
        bgColor="whiteAlpha.600"
        m="15px"
        p="25px"
        borderRadius="15px"
      >
        <GridItem rowSpan={5} colSpan={2} p="5px" borderRadius="10px">
          <Image
            src={displayImage(data?.productData.images[0]['image_path'])}
            objectFit="cover"
            w="100%"
            h="100%"
            borderRadius="10px"
          />
        </GridItem>
        <GridItem rowSpan={3} colSpan={3} p="10px" borderRadius="10px">
          <Card>
            <Heading ml="20px" mt="15px">
              {data?.productData.name}
            </Heading>
            <CardBody>
              <TabsDetailProduct
                data={data?.productData}
                owner={data?.productOwner}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} p="10px" borderRadius="10px">
          <Card>
            <Heading size="md" ml="15px" mt="15px">
              Place Order
            </Heading>
            <FormOrderProduct
              price={data?.productData.price}
              quantity={data?.productData.quantity}
              ownerId={data?.productOwner.mitra_id}
              productId={data?.productData.product_id}
              minOrder={data?.productData.minimum_order}
            />
          </Card>
        </GridItem>
      </Grid>
    );
  }
}
