import { Button } from '@chakra-ui/react';
import { InputField } from 'components/InputField';
import { Wrapper } from 'components/Wrapper';
import { mapFieldError } from 'features/common';
import { Form, Formik, FormikHelpers } from 'formik';
import { LoginInput, useLoginMutation } from 'generated/graphql';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const initialValues: LoginInput = {
    usernameOrEmail: '',
    password: '',
  };

  const [loginUser, { loading: _loginUserLoading }] = useLoginMutation();

  const onLoginSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>,
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
    });
    if (response.data?.login.errors) {
      setErrors(mapFieldError(response.data.login.errors));
    } else if (response.data?.login.user) {
      //register successfully
      router.push('/');
    }
  };

  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onLoginSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="Username or Email"
              placeholder="Username or Email"
              type="text"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
