/** @format */
import Head from 'next/head';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';
import { validateLoginPassword, validateLoginEmail } from 'utils/formValidation';
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
import Cookie from 'js-cookie';
import { useContext, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';
import { postData } from '@utils/fetchData';

function MyForm() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const handleSubmit = async (values, setSubmitting) => {
    const res = await postData('auth/login', values);
    setSubmitting(false);
    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    });

    localStorage.setItem('firstLogin', true);
  };
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);
  return (
    <>
      <Formik
        initialValues={{ password: '', email: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch({ type: 'NOTIFY', payload: { loading: true } });
          setTimeout(() => {
            handleSubmit(values, setSubmitting);
          }, 1000);
          resetForm();
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
                Sign in
              </Heading>
              <Divider />

              <Field name="email" validate={validateLoginEmail}>
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

              <Field name="password" validate={validateLoginPassword}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} mb="2">
                    <FormLabel htmlFor="password" fontWeight="bold">
                      Password
                    </FormLabel>
                    <Input {...field} id="password" placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                disabled={isSubmitting}
                isLoading={isSubmitting}
                width="full"
                mt={4}
                type="submit"
                colorScheme="teal"
              >
                Login
              </Button>
              <Text my="2" color="teal.500" fontSize="sm">
                You don't have an account?{' '}
                <NextLink href="/register">
                  <Link>Register</Link>
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
