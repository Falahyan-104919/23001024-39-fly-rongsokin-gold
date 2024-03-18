import { Flex } from '@chakra-ui/react';
import FormMitraSettings from './form/FormMitraType';
import MitraTypeList from './table/MitraTypeList';

export default function MitraTypeSettings() {
  return (
    <Flex
      flexDir="row"
      columnGap="72px"
      mt="12px"
      borderBottom="1px"
      paddingBottom="32px"
    >
      <FormMitraSettings />
      <MitraTypeList />
    </Flex>
  );
}
