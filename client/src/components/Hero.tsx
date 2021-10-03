import { Flex, Heading } from '@chakra-ui/react';

type PropsType = {
  title: string;
};

export const Hero = (props: PropsType) => {
  const { title } = props;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
    >
      <Heading fontSize="6vw">{title}</Heading>
    </Flex>
  );
};

Hero.defaultProps = {
  title: 'with-chakra-ui-typescript',
};
