import { Container } from '@chakra-ui/react';
import LastUserRegisteredTable from './table/LastUserRegisteredTable';
import LastUProductsAddedTable from './table/LastProductsAddedTable';
import LastDiscussionPostedTable from './table/LastDiscussionPostedTable';
import LastTransactionPlacedTable from './table/LastTransactionPlaced';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../utils/axios';

export default function SummaryTable() {
  const summaryTable = async () => {
    const summary = await axiosInstance
      .get('admin/summary_table')
      .then((res) => {
        return res.data;
      })
      .catch((err) => err.data.message);
    return summary;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['summary_table'],
    queryFn: summaryTable,
  });
  return (
    <Container
      display="flex"
      flexDir="row"
      rowGap="48px"
      flexGrow="1"
      maxW="full"
      flexWrap="wrap"
      justifyContent="space-evenly"
    >
      <LastUserRegisteredTable
        loading={isLoading}
        activity={data?.userLastAct}
      />
      <LastUProductsAddedTable
        loading={isLoading}
        activity={data?.productLastAct}
      />
      <LastDiscussionPostedTable
        loading={isLoading}
        activity={data?.forumLastAct}
      />
      <LastTransactionPlacedTable
        loading={isLoading}
        activity={data?.transactionLastAct}
      />
    </Container>
  );
}

/* 
userLastAct: (5) […], productLastAct: (5) […], forumLastAct: (5) […], transactionLastAct: (5) […]
*/
