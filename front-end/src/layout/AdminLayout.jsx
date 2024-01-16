import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AdminSidebar from '../components/AdminSidebar';

export function AdminLayout() {
  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(6, 1fr)" bg="teal.100">
        <GridItem as="aside" colSpan="1" bgColor="teal.600" minHeight="100vh">
          <AdminSidebar />
        </GridItem>
        <GridItem as="main" colSpan="5" margin="8px">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}
