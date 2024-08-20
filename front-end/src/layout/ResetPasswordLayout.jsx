import { Box, Button, Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import ResetPassword from '../components/form/ResetPassword';
import { useParams } from 'react-router-dom';

export function ResetPasswordLayout() {
  const { token } = useParams();
  return (
    <Grid templateColumns="repeat(2,1fr)" bg="#caf0f8" minHeight="100vh">
      <GridItem as="aside" bgColor="#03045e">
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Flex flexDir="column" width="60%" alignItems="center">
            <Box boxSize="175">
              <Image src="/logo-home.svg" />
            </Box>
            <Button mt="10">Home</Button>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem as="main">
        <ResetPassword token={token} />
      </GridItem>
    </Grid>
  );
}
