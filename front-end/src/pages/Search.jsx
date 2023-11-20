import { Box, Grid, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import SearchContainer from '../containers/SearchContainer';

export default function Search() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('name');

  return (
    <Box m="25px">
      <Box mb="25px">
        <Text as="b" fontSize="3xl">
          Search for {searchQuery}...
        </Text>
      </Box>
      <Grid templateColumns="repeat(5,1fr)" gap={3}>
        <SearchContainer keyword={searchQuery} />
      </Grid>
    </Box>
  );
}
