import { Box, BoxProps } from '@chakra-ui/react';

export const Wrapper = (props: BoxProps) => {
  return <Box maxWidth="400px" w="100%" mt={8} mx="auto" {...props} />;
};
