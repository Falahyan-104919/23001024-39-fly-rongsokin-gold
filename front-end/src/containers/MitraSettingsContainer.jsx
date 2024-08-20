import { Box, Container, Heading, Spacer } from '@chakra-ui/react';
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
      <Box boxShadow="outline" borderRadius="12px" p="4">
        <Heading size="lg" mb="4px">
          Mitra Settings
        </Heading>
        <MitraTypeSettings />
      </Box>
      <Box boxShadow="outline" borderRadius="12px" p="4" mt="4">
        <Heading size="lg" mb={4} mt="8px">
          Product Settings
        </Heading>
        <ProductTypeSettings />
      </Box>
    </Container>
  );
}
