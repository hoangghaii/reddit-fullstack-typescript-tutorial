import { Button } from '@chakra-ui/react';
import { InputField } from 'components/InputField';
import { Wrapper } from 'components/Wrapper';
import { mapFieldError } from 'features/common';
import { Form, Formik, FormikHelpers } from 'formik';
import { RegisterInput, useRegisterMutation } from 'generated/graphql';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const initialValues: RegisterInput = {
    username: '',
    email: '',
    password: '',
  };

  const [registerUser, { loading: _registerUserLoading }] =
    useRegisterMutation();

  const onRegisterMutation = async (
    values: RegisterInput,
    { setErrors }: FormikHelpers<RegisterInput>,
  ) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
    });
    if (response.data?.register.errors) {
      setErrors(mapFieldError(response.data.register.errors));
    } else if (response.data?.register.user) {
      //register successfully
      router.push('/');
    }
  };

  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onRegisterMutation}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="Username"
              type="text"
            />
            <InputField
              name="email"
              label="Email"
              placeholder="Email"
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
