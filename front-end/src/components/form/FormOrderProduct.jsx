import { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '../../store/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';

export default function FormOrderProduct(props) {
  const queryClient = useQueryClient();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
  const initialValues = {
    quantity: 0,
    total_price: 0,
  };

  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .min(props.minOrder, "Can't Order Less Than Minimum Order")
      .max(props.quantity, "Can't Order More Than Quantity of Products")
      .required('Quantity is required'),
  });

  const postTransaction = async (values) => {
    const orderBody = {
      mitraId: props.ownerId,
      productId: props.productId,
      quantity: values.quantity,
      totalPrice: values.total_price,
    };
    const response = await axiosInstance
      .post(`order/${user.userId}`, orderBody)
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postTransaction(values);
    switch (response.status) {
      case 201:
        queryClient.invalidateQueries('product');
        toast({
          title: 'Order Successfull!',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        return resetForm();
      default:
        toast({
          title: 'Something Wrong',
          description: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  const OrderButton = (props) => {
    const values = props.values;
    const actions = props.actions;
    if (props.userMitraId) {
      if (props.userMitraId == props.ownerProduct) {
        return (
          <Button w="100%" mt="15px" colorScheme="red" isDisabled={true}>
            Can't Buy You're Own Product
          </Button>
        );
      }
      return (
        <Button
          w="100%"
          mt="15px"
          colorScheme="teal"
          isLoading={props.isSubmitting}
          isDisabled={
            props.isSubmitting ||
            !props.isValid ||
            !props.dirty ||
            !props.isLoggedIn
          }
          onClick={() => props.handleSubmit(values, actions)}
        >
          Submit Order
        </Button>
      );
    }
    return (
      <Button
        w="100%"
        mt="15px"
        colorScheme="teal"
        isLoading={props.isSubmitting}
        isDisabled={
          props.isSubmitting ||
          !props.isValid ||
          !props.dirty ||
          !props.isLoggedIn
        }
        onClick={() => props.handleSubmit(values, actions)}
      >
        Submit Order
      </Button>
    );
  };

  return (
    <Box m="10px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          setFieldValue,
          handleSubmit,
          actions,
          values,
          errors,
        }) => (
          <Form>
            <Field name="quantity">
              {({ field }) => (
                <FormControl id="quantity" isRequired>
                  <FormLabel> Quantity </FormLabel>
                  <Flex mr="20px">
                    <HStack w="250px">
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          let validatedValue = value;
                          if (isNaN(Number(value))) {
                            validatedValue = 0;
                          }
                          setFieldValue('quantity', validatedValue);
                          setTotalPrice(validatedValue * props.price);
                          setFieldValue(
                            'total_price',
                            validatedValue * props.price
                          );
                        }}
                      />
                    </HStack>
                    <Spacer />
                    <Text>Total Price : Rp. {totalPrice}</Text>
                  </Flex>
                  {errors.quantity ? (
                    <Text color="red.500" fontSize="sm" fontWeight="light">
                      {errors.quantity}{' '}
                    </Text>
                  ) : null}
                </FormControl>
              )}
            </Field>
            <OrderButton
              userMitraId={user.mitraId}
              ownerProduct={props.ownerId}
              isSubmitting={isSubmitting}
              isValid={isValid}
              dirty={dirty}
              isLoggedIn={isLoggedIn}
              handleSubmit={handleSubmit}
              actions={actions}
              values={values}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}
