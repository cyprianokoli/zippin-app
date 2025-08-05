import React from "react";
import RideSummaryScreen from "./screens/RideSummaryScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "./screens/MapScreen";
import WalletScreen from "./screens/WalletScreen";
import TransactionDetailsScreen from "./screens/TransactionDetailsScreen";
import SideMenu from "./navigation/SideMenu";
import { WalletProvider } from "./context/WalletContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// 📌 Drawer navigation
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#fff", width: 250 },
      }}
    >
      <Drawer.Screen name="Home" component={MapScreen} />
      {/* Still have Wallet in Drawer for menu */}
      <Drawer.Screen name="Wallet" component={WalletScreen} />
    </Drawer.Navigator>
  );
}

// 📌 Main Stack
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Drawer with Home + Wallet */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      {/* Global routes available from anywhere */}
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <Stack.Screen name="RideSummary" component={RideSummaryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </WalletProvider>
  );
}





// // App.tsx
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack";

// import MapScreen from "./screens/MapScreen";
// import QRScannerSim from "./screens/QRScannerSim";
// import SideMenu from "./navigation/SideMenu";

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// // Stack for Map + QRScannerSim
// function MapStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="MapScreen" component={MapScreen} />
//       <Stack.Screen name="QRScannerSim" component={QRScannerSim} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={(props) => <SideMenu {...props} />}
//         screenOptions={{
//           headerShown: false,
//           drawerStyle: { backgroundColor: "#fff", width: 250 },
//         }}
//       >
//         <Drawer.Screen name="Home" component={MapStack} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }



//VERSION 2
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // Import your screens
// import HomeScreen from "./screens/HomeScreen";
// import MapScreen from "./screens/MapScreen";

// // Create a stack navigator
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Map" component={MapScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

//VERSION 1
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import MapScreen from './screens/MapScreen';
// import ProfileScreen from './screens/ProfileScreen';

// export type RootStackParamList = {
//   Home: undefined;
//   Map: undefined;
//   Profile: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerStyle: { backgroundColor: '#7A3E9D' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { fontWeight: 'bold' },
//         }}
//       >
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Map" component={MapScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
