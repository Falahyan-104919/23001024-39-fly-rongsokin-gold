import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export function Layout() {
  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(6, 1fr)" bg="#ffffff">
        <GridItem
          as="aside"
          colSpan="1"
          bgColor="#ffffff"
          minHeight="100vh"
          p="2"
          borderRight="2px"
          borderColor="#ced4da"
        >
          <Sidebar />
        </GridItem>
        <GridItem as="main" colSpan="5">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}
