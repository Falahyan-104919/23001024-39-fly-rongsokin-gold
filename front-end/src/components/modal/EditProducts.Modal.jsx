import { useContext, useState } from 'react';
import { AuthContext } from '../../store/AuthProvider';
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
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AttachmentIcon, SmallCloseIcon } from '@chakra-ui/icons';
import axiosInstance from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';

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
    return <option>Loading...</option>;
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

export default function EditProductsModal({ products, open, toggleOff }) {
  const { user } = useContext(AuthContext);
  const [uploadProductImage, setUploadProductImage] = useState({});
  const toast = useToast();

  const displayImage = products?.images.map((image) => {
    const baseURL = 'http://localhost:8080/';
    const filePath = image.image_path?.replace(/\\/g, '/');
    const encodePath = encodeURI(filePath);
    const publicUrl = baseURL + encodePath;
    return publicUrl;
  });

  let initialValues = {
    productId: products.product_id,
    productName: products.name,
    productType: products.product_type_id,
    productDescription: products.description,
    productPrice: products.price,
    productQuantity: products.quantity,
    productImage: displayImage,
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string().min(
      10,
      'Product Name is Need at least 10 Character'
    ),
    productType: Yup.string().required('Product Type is Required'),
    productDescription: Yup.string().min(
      20,
      'Product Description is Need at least 20 Character'
    ),
    productPrice: Yup.number('Product Price is Must Be a Number')
      .required('Product Price is Required')
      .positive('Product Price is Must Be a Positive Number'),
    productQuantity: Yup.number(
      'Product Quantity is Must Be a Positive Number'
    ),
    productImage: Yup.mixed().required('File is required'),
  });

  const formData = new FormData();
  const resetFormData = (formData) => {
    for (var key of formData.keys()) {
      formData.delete(key);
    }
  };

  const editProducts = async (
    {
      productId,
      productName,
      productType,
      productDescription,
      productPrice,
      productQuantity,
    },
    uploadImg
  ) => {
    formData.append('mitraId', user.mitraId);
    formData.append('userId', user.userId);
    formData.append('name', productName);
    formData.append('productType', productType);
    formData.append('description', productDescription);
    formData.append('price', Number(productPrice));
    formData.append('quantity', Number(productQuantity));
    if ('name' in uploadImg) {
      formData.append('productImg', uploadImg, uploadImg.name);
    }
    const response = await axiosInstance
      .put(`products/update/${productId}`, formData)
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
        };
      });
    return response;
  };

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    const response = await editProducts(values, uploadProductImage);
    switch (response.status) {
      case 203:
        toast({
          title: 'Post Product Successfull',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        resetFormData(formData);
        setUploadProductImage({});
        return actions.resetForm({ values: values });
      default:
        resetFormData(formData);
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
              <ModalHeader>Edit Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack gap={3}>
                  <Field name="productId">
                    {({ field }) => (
                      <Input {...field} style={{ display: 'none' }} />
                    )}
                  </Field>
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
                      <FormControl id="productType" isRequired mb="10px">
                        <FormLabel>Product Name</FormLabel>
                        <Select
                          {...field}
                          placeholder="Select Product Type"
                          type="text"
                          focusBorderColor="teal.100"
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
                  <Field name="productDescription">
                    {({ field }) => (
                      <FormControl id="productDescription" mb="5px" isRequired>
                        <FormLabel>Product Description</FormLabel>
                        <Textarea
                          {...field}
                          placeholder="Enter your product description..."
                          focusBorderColor="teal.100"
                        />
                        <ErrorMessage
                          name="productDescription"
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
                  <Field name="productQuantity">
                    {({ field }) => (
                      <FormControl id="productQuantity" mb="10px" isRequired>
                        <FormLabel>Product Quantity</FormLabel>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Kilogram / pcs"
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
                              setFieldValue('productImage', [displayImage]);
                            }}
                            disabled={value ? value.length === 1 : false}
                          />
                          {values.productImage?.map((image, index) => (
                            <Box key={index} m="10px">
                              <Flex>
                                <Image
                                  src={
                                    typeof image === 'string'
                                      ? image
                                      : URL.createObjectURL(image)
                                  }
                                  alt={`attached_product_image_${index}`}
                                  boxSize="150px"
                                  objectFit="cover"
                                />
                                <IconButton
                                  size="xs"
                                  icon={<SmallCloseIcon />}
                                  onClick={() => {
                                    const updatedImages =
                                      values.productImage?.filter(
                                        (_, i) => i !== index
                                      );
                                    setUploadProductImage({});
                                    setFieldValue(
                                      'productImage',
                                      updatedImages
                                    );
                                  }}
                                />
                              </Flex>
                            </Box>
                          ))}
                          <label htmlFor="productImage">
                            <IconButton
                              as="span"
                              icon={<AttachmentIcon color="white" />}
                              aria-label="Attach"
                              isDisabled={value ? value.length === 1 : false}
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
