import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axios';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { focusManager, useQuery } from '@tanstack/react-query';

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

export default function FormBecomeMitra() {
  const { userId } = useParams();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    mitraName: '',
    type: '',
    address: '',
    bank_name: '',
    bank_number: '',
  };
  const mitraSchema = Yup.object().shape({
    mitraName: Yup.string()
      .min(10, 'Mitra Name is Need at least Contain 10 Character')
      .required('Mitra Name is Required'),
    type: Yup.string().required('Mitra Type is Required'),
    bank_name: Yup.string().required(),
    bank_number: Yup.number()
      .min(8, 'Bank Number Must Have Minimum 8 number')
      .required('Bank Number is Required'),
  });

  const becomeMitra = async ({
    mitraName,
    type,
    address,
    bank_name,
    bank_number,
  }) => {
    const response = await axiosInstance
      .post(`user/become_mitra/${userId}`, {
        mitraName,
        type,
        address,
        bank_name,
        bank_number,
      })
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
          mitraId: res.data.mitra_id,
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
    focusManager.setFocused(false);
    const response = await becomeMitra(values);
    switch (response.status) {
      case 500:
        return toast({
          title: 'Become Mitra Failed',
          description: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      default:
        toast({
          title: 'Success',
          description: `${response.message} \n You need to Re-Logged In`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            logout();
            navigate('/');
          },
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mitraSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty, setFieldValue }) => (
        <Form autoComplete="off">
          <Field name="mitraName">
            {({ field }) => (
              <FormControl id="mitraName" isRequired>
                <FormLabel>Mitra Name</FormLabel>
                <Input
                  {...field}
                  placeholder="Mitra Name"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="mitraName"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="type">
            {({ field }) => (
              <FormControl id="type" isRequired>
                <FormLabel>Mitra Type</FormLabel>
                <Select
                  placeholder="Select Mitra Type"
                  name="type"
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
              Become Mitra
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
