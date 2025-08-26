import { Stack } from 'expo-router';
import { TimerProvider } from '/Users/kathan99/Documents/Simplify Money/simplify-money-assignment/contexts/TimerContext' // Import the provider

export default function RootLayout() {
  return (
    // Wrap the Stack with the TimerProvider
    <TimerProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E1E1E',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ presentation: 'modal' }} />
      </Stack>
    </TimerProvider>
  );
}