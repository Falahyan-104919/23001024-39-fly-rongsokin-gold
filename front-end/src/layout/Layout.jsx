import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export function Layout() {
  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(6, 1fr)" bg="teal.100">
        <GridItem as="aside" colSpan="1" bgColor="teal.600" minHeight="100vh">
          <Sidebar />
        </GridItem>
        <GridItem as="main" colSpan="5">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}
