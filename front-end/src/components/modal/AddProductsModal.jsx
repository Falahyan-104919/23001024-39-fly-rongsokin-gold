import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import * as Yup from 'yup';
import { AttachmentIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';

const ProductTypeOption = ({ mitraType }) => {
  const fetchProductType = async (type) => {
    const listType = await axiosInstance
      .get(`product_types?type=${type}`)
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return listType;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['product_types'],
    queryFn: () => fetchProductType(mitraType),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return data['productTypes'].map((type) => {
    const { product_type_id, name } = type;
    return (
      <option
        key={product_type_id}
        value={product_type_id}
        id={product_type_id}
      >
        {name}
      </option>
    );
  });
};

const ProductUnitOption = () => {
  const units = ['Kilogram', 'Piece', 'Bulk'];
  return units.map((unit, index) => {
    return (
      <option key={index} value={unit} id={unit}>
        {unit}
      </option>
    );
  });
};

export default function AddProductsModal({ open, toggleOff }) {
  const { user } = useContext(AuthContext);
  const [uploadProductImage, setUploadProductImage] = useState({});
  const toast = useToast();

  const initialValues = {
    productName: '',
    productType: '',
    descriptionProduct: '',
    productPrice: '',
    productQuantity: '',
    productUnit: '',
    min_order: '',
    productImage: '',
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .min(10, 'Product Name is Need at least 10 Character')
      .required('Product Name is Required'),
    productType: Yup.string().required('Product Type is Required'),
    descriptionProduct: Yup.string()
      .min(20, 'Product Description is Need at least 20 Character')
      .required('Product Description is Required'),
    productPrice: Yup.number('Product Price is Must Be a Number Types')
      .required('Product price is Required')
      .positive('Product Price is Must Be a Positive Number'),
    productQuantity: Yup.number('Product Quantity is Must Be a Number Types')
      .required('Product Quantity is Required')
      .positive('Product Quantity is Must Be a Positive Number'),
    productUnit: Yup.string().required('Please Select One'),
    min_order: Yup.number().required('Minimum Order is Required'),
    productImage: Yup.mixed().required('File is required'),
  });

  const formData = new FormData();
  const resetFormData = (formData) => {
    for (var key of formData.keys()) {
      formData.delete(key);
    }
  };

  const postProduct = async (
    {
      productName,
      productType,
      descriptionProduct,
      productPrice,
      productQuantity,
      productUnit,
      min_order,
    },
    uploadProductImage
  ) => {
    formData.set('mitraId', user.mitraId);
    formData.set('userId', user.userId);
    formData.set('name', productName);
    formData.set('productType', productType);
    formData.set('description', descriptionProduct);
    formData.set('price', parseInt(productPrice));
    formData.set('quantity', parseInt(productQuantity));
    formData.set('unit', productUnit);
    formData.set('min_order', min_order);
    formData.append('productImg', uploadProductImage, uploadProductImage.name);
    const response = await axiosInstance
      .post(`products/upload/${user.mitraId}`, formData)
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          status: err.response.status,
          message: err.response.data.message,
        };
      });
    return response;
  };

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    const response = await postProduct(values, uploadProductImage);
    switch (response.status) {
      case 201:
        toast({
          title: 'Post Product Successfull',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        resetFormData(formData);
        setUploadProductImage({});
        return actions.resetForm();
      default:
        return toast({
          title: 'Something Wrong!',
          description: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        isValid,
        dirty,
        values,
        setFieldValue,
        handleSubmit,
        actions,
      }) => (
        <Form autoComplete="off">
          <Modal isOpen={open} onClose={toggleOff} size="6xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack gap={3}>
                  <Field name="productName">
                    {({ field }) => (
                      <FormControl id="productName" isRequired mb="10px">
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          {...field}
                          placeholder="Product Name"
                          type="text"
                          focusBorderColor="teal.100"
                        />
                        <ErrorMessage
                          name="productName"
                          component={Text}
                          color="red.500"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="productType">
                    {({ field }) => (
                      <FormControl id="productType" mb="10px" isRequired>
                        <FormLabel>Product Type</FormLabel>
                        <Select
                          placeholder="Select Product Type"
                          name="productType"
                          {...field}
                        >
                          <ProductTypeOption mitraType={user.mitraType} />
                        </Select>
                        <ErrorMessage
                          name="productType"
                          component={Text}
                          color="red.500"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="descriptionProduct">
                    {({ field }) => (
                      <FormControl id="descriptionProduct" mb="10px" isRequired>
                        <FormLabel>Product Description</FormLabel>
                        <Textarea
                          {...field}
                          placeholder="Enter your product description..."
                          focusBorderColor="teal.100"
                        />
                        <ErrorMessage
                          name="descriptionProduct"
                          component={Text}
                          color="red.500"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="productPrice">
                    {({ field }) => (
                      <FormControl id="productPrice" mb="10px" isRequired>
                        <FormLabel> Product Price</FormLabel>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="black.300"
                            fontSize="1.2em"
                            children="Rp."
                          />
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter amount"
                          />
                        </InputGroup>
                        <ErrorMessage
                          name="productPrice"
                          component={Text}
                          color="red.500"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Flex gap="12px">
                    <Field name="productQuantity">
                      {({ field }) => (
                        <FormControl id="productQuantity" mb="10px" isRequired>
                          <FormLabel>Product Quantity</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            focusBorderColor="teal.100"
                          />
                          <ErrorMessage
                            name="productQuantity"
                            component={Text}
                            color="red.500"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="productUnit">
                      {({ field }) => (
                        <FormControl id="productUnit" mb="10px" isRequired>
                          <FormLabel>Unit</FormLabel>
                          <Select
                            placeholder="Unit Product"
                            name="productUnit"
                            {...field}
                          >
                            <ProductUnitOption />
                          </Select>
                          <ErrorMessage
                            name="productUnit"
                            component={Text}
                            color="red.500"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="min_order">
                      {({ field }) => (
                        <FormControl id="min_order" mb="10px" isRequired>
                          <FormLabel>Minimum Order</FormLabel>
                          <Input
                            {...field}
                            type="number"
                            focusBorderColor="teal.100"
                          />
                          <ErrorMessage
                            name="min_order"
                            component={Text}
                            color="red.500"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Field name="productImage" type="file" multiple>
                    {({ field: { value, ...field } }) => (
                      <FormControl id="productImage" isRequired>
                        <FormLabel ml="10px">Product Images</FormLabel>
                        <Flex alignItems="center">
                          <input
                            type="file"
                            style={{ display: 'none' }}
                            id="productImage"
                            {...field}
                            onChange={(e) => {
                              const files = e.target.files[0];
                              const displayImage = URL.createObjectURL(files);
                              setUploadProductImage(files);
                              setFieldValue('productImage', displayImage);
                            }}
                            disabled={value !== '' ? true : false}
                          />
                          {values.productImage !== '' ? (
                            <Box m="10px">
                              <Flex>
                                <Image
                                  src={values.productImage}
                                  alt={`attached_product_image_${values.productImage}`}
                                  boxSize="150px"
                                  objectFit="cover"
                                />
                                <IconButton
                                  size="xs"
                                  icon={<SmallCloseIcon />}
                                  onClick={() => {
                                    const updatedImages = '';
                                    setUploadProductImage({});
                                    setFieldValue(
                                      'productImage',
                                      updatedImages
                                    );
                                  }}
                                />
                              </Flex>
                            </Box>
                          ) : null}
                          <label htmlFor="productImage">
                            <IconButton
                              as="span"
                              icon={<AttachmentIcon color="white" />}
                              aria-label="Attach"
                              isDisabled={value !== '' ? true : false}
                              size="lg"
                              bgColor="teal"
                            />
                          </label>
                        </Flex>
                        <FormErrorMessage>
                          Product Images is Need at Least 1 Image
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={toggleOff}>
                  Close
                </Button>
                <Button
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting || !isValid || !dirty}
                  onClick={() => handleSubmit(values, actions)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}
