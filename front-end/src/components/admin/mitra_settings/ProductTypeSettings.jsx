import { Flex } from '@chakra-ui/react';
import FormProductType from './form/FormProductType';
import ProductTypeTable from './table/ProductTypeTable';

export default function ProductTypeSettings() {
  return (
    <Flex flexDir="row" columnGap="72px">
      <FormProductType />
      <ProductTypeTable />
    </Flex>
  );
}
