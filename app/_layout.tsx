import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./index";
import AddTransactionScreen from "./add-transaction";

// ✅ Define the navigation stack type
export type RootStackParamList = {
  Home: undefined;
  AddTransaction: undefined;
};

// ✅ Ensure correct navigation stack typing
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();




  return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        </Stack.Navigator>
      </ThemeProvider>
  );
}
