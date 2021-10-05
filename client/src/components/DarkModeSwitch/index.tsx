import { useColorMode, Switch } from '@chakra-ui/react';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Switch
      position="fixed"
      right="2rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};

export default DarkModeSwitch;
