import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

const MitraTypeOption = () => {
  const fetchMitraType = async () => {
    const mitraType = await axiosInstance
      .get('mitra_type')
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return mitraType;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['mitra_type'],
    queryFn: fetchMitraType,
  });

  if (isLoading) {
    return null;
  }

  return data['mitraType'].map((option) => {
    const { mitra_type_id, type } = option;
    return (
      <option key={mitra_type_id} value={mitra_type_id} id={mitra_type_id}>
        {type}
      </option>
    );
  });
};

const BankNameOption = () => {
  const bankName = [
    'Mandiri',
    'BRI',
    'BCA',
    'BNI',
    'BTN',
    'CIMB Niaga',
    'BSI',
    'Permata',
    'OCBC',
    'Panin',
  ];
  return bankName.map((name) => (
    <option key={name} value={name} id={name}>
      {name}
    </option>
  ));
};

export default function FormEditMitraProfile() {
  const { userId } = useParams();
  const toast = useToast();
  let initialValues;

  const { isPending, isError, isFetched, data, error } = useQuery({
    queryKey: ['mitraData', userId],
    queryFn: async () => await axiosInstance.get(`/user_mitra/${userId}`),
  });

  const mitraSchema = Yup.object().shape({
    mitra_name: Yup.string()
      .min(10, 'Mitra Name is Need at least Contain 10 Character')
      .required('Mitra Name is Required'),
    type: Yup.string().required('Mitra Type is Required'),
  });

  const editMitra = async ({ mitra_id, mitra_name, type, address }) => {
    const response = await axiosInstance
      .post(`mitra/${mitra_id}`, {
        mitra_name,
        type,
        address,
      })
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
    const response = await editMitra(values);
    switch (response.status) {
      case 201:
        toast({
          title: 'Update Mitra Profile Successfull',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        return actions.resetForm();
      default:
        return toast({
          title: 'Something Wrong!',
          description: response.message,
          status: 'Error',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  if (isError) {
    return <Text>Something Wrong! \n {error.message}</Text>;
  }

  if (isPending) {
    return (
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="teal"
        variant="link"
        spinnerPlacement="start"
      />
    );
  }

  if (isFetched) {
    initialValues = { ...data.data.data };
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mitraSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Field name="mitra_id" style={{ display: 'none' }} />
          <Field name="mitra_name">
            {({ field }) => (
              <FormControl id="mitra_name" isRequired>
                <FormLabel>Mitra Name</FormLabel>
                <Input
                  {...field}
                  placeholder="Mitra Name"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="mitra_name"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="type_id">
            {({ field }) => (
              <FormControl id="type_id" isRequired>
                <FormLabel>Mitra Type</FormLabel>
                <Select
                  placeholder="Select Mitra Type"
                  name="type_id"
                  onChange={field.onChange}
                  value={field.value}
                >
                  <MitraTypeOption />
                </Select>
              </FormControl>
            )}
          </Field>
          <Field name="bank_name">
            {({ field }) => (
              <FormControl id="bank_name" isRequired>
                <FormLabel>Bank Name</FormLabel>
                <Select
                  placeholder="Select Bank Name"
                  name="bank_name"
                  onChange={field.onChange}
                  value={field.value}
                >
                  <BankNameOption />
                </Select>
                <ErrorMessage
                  name="bank_name"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="bank_number">
            {({ field }) => (
              <FormControl id="bank_number" isRequired>
                <FormLabel>Bank Number</FormLabel>
                <Input
                  {...field}
                  maxLength={20}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      if (e.target.value == 0) {
                        setFieldValue('bank_number', '');
                      }
                      setFieldValue('bank_number', Number(e.target.value));
                    } else {
                      setFieldValue('bank_number', '');
                    }
                  }}
                />
                <ErrorMessage
                  name="bank_number"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Button
            w="100%"
            mt={4}
            bgColor="teal.300"
            isLoading={isSubmitting}
            type="submit"
            isDisabled={isSubmitting || !isValid || !dirty}
          >
            <Text fontWeight="bold" fontSize="lg" color="white">
              Edit Profile Mitra
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
