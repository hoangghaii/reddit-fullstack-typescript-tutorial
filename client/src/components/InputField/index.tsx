import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { useField } from 'formik';

type PropsType = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
};

export const InputField = (props: PropsType) => {
  const [field, { error }] = useField(props);
  const { type, label, placeholder } = props;

  return (
    <Box my={2}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputGroup size="md">
          <Input
            id={field.name}
            placeholder={placeholder}
            {...field}
            required
            type={type}
          />
        </InputGroup>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
