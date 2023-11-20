import {
  Box,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function TabsDetailProduct(props) {
  const { name, product_type, description, price, quantity } = props.data;
  const { mitra_id, mitra_name, address, type, phone_number } = props.owner;
  return (
    <Tabs variant="enclosed" isFitted p="0">
      <TabList>
        <Tab>Product Information</Tab>
        <Tab>Product Owner Information</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p="0">
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td>
                  <Flex>
                    Product Name:
                    <Spacer />
                    {name}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    Product Type: <Spacer />
                    {product_type}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    Product Description: <Spacer />
                    {description}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    Price: <Spacer />
                    RP. {price}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    Quantity: <Spacer />
                    {quantity} kg/pcs
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TabPanel>
        <TabPanel p="0">
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td>
                  <Flex>
                    Mitra Name : <Spacer />{' '}
                    <Link to={`/mitra/${mitra_id}`}>{mitra_name}</Link>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    Mitra Type : <Spacer /> {type}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td wordBreak="break-word">
                  <Flex>
                    Address : <Spacer />
                    {address}
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Flex>
                    Phone : <Spacer /> {phone_number}
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
