/** @format */
import Head from 'next/head';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateCPassword,
} from 'utils/formValidation';
import {
  FormControl,
  Button,
  FormLabel,
  Box,
  Input,
  FormErrorMessage,
  Textarea,
  Heading,
  Divider,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { DataContext } from '@store/GlobalState';
import { useContext, useEffect } from 'react';
import { postData } from 'utils/fetchData';

function MyForm() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const handleSubmit = async (values, setSubmitting) => {
    const res = await postData('auth/register', values);
    setSubmitting(false);
    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    router.push('/signin');
    // resetForm();
  };
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);
  return (
    <>
      <Formik
        initialValues={{ name: '', email: '', password: '', cPassword: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch({ type: 'NOTIFY', payload: { loading: true } });
          setTimeout(() => {
            handleSubmit(values, setSubmitting);
          }, 1000);
        }}
      >
        {({ isSubmitting }) => (
          <Box
            w="100%"
            maxW="500px"
            my="0.5rem"
            mx="auto"
            p="4"
            rounded="sm"
            bg="gray.50"
            border="1px lightgray solid"
          >
            <Form noValidate>
              <Heading as="h3" size="lg" mb="4">
                Register
              </Heading>
              <Divider />
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name} mb="4">
                    <FormLabel htmlFor="name" fontWeight="bold">
                      Name
                    </FormLabel>
                    <Input {...field} id="name" placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email} mb="4">
                    <FormLabel htmlFor="email" fontWeight="bold">
                      Email
                    </FormLabel>
                    <Input {...field} id="email" placeholder="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validatePassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} mb="4">
                    <FormLabel htmlFor="password" fontWeight="bold">
                      Password
                    </FormLabel>
                    <Input {...field} id="password" placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cPassword" validate={validateCPassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.cPassword && form.touched.cPassword} mb="2">
                    <FormLabel htmlFor="cPassword" fontWeight="bold">
                      Confirm password
                    </FormLabel>
                    <Input {...field} id="cPassword" placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.cPassword}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button disabled={isSubmitting} width="full" mt={4} type="submit" colorScheme="teal">
                Register
              </Button>
              <Text my="2" color="teal.500" fontSize="sm">
                You have an account?{' '}
                <NextLink href="/signin">
                  <Link>Sign in</Link>
                </NextLink>
              </Text>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
}

export default MyForm;
