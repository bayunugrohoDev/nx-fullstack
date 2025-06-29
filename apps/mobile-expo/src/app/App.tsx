import { TamaguiProvider } from "tamagui";
import { YStack, Typography, config } from "@glibs/ui";

export const App = () => {


  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <YStack bg={'$bg-primary'} flex={1}>
        <YStack>
          <Typography variant="$heading-48" color={'$fg-brand-primary'}>hello</Typography>
        </YStack>
      </YStack>
    </TamaguiProvider>
  );
};

export default App;
