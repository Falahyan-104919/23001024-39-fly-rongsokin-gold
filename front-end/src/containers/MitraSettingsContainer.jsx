import { Container, Heading } from '@chakra-ui/react';
import MitraTypeSettings from '../components/admin/mitra_settings/MitraTypeSettings';
import ProductTypeSettings from '../components/admin/mitra_settings/ProductTypeSettings';

export default function MitraSettingsContainer() {
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
      <Heading size="lg" mb={4}>
        Mitra Settings
      </Heading>
      <MitraTypeSettings />
      <Heading size="lg" mb={4} mt="48px">
        Product Settings
      </Heading>
      <ProductTypeSettings />
    </Container>
  );
}
