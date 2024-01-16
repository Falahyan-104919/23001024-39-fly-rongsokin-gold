import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';
import CardStats from '../components/admin/dashboard/CardStats';
import SummaryTable from '../components/admin/dashboard/SummaryTable';

export default function AdminDashboardContainer() {
  const { user } = useContext(AuthContext);
  return (
    <Container
      display="flex"
      flexDir="column"
      backgroundColor="white"
      maxW="full"
      padding="16px"
      rowGap="8px"
      borderRadius="12px"
    >
      <Heading mb="24px">Welcome Back, {user.fullname}!</Heading>
      <CardStats />
      <Heading mt="24px" mb="24px">
        Summary Table
      </Heading>
      <SummaryTable />
    </Container>
  );
}
