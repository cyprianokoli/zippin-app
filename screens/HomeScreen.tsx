// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Zippin 🚀</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, color: '#7B2CBF' }
});


// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Zippin 🚀</Text>
//       <Button title="View Map" onPress={() => navigation.navigate("Map")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 20,
//   },
// });


// // import React from 'react';
// // import { View, Text, Button, StyleSheet } from 'react-native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '../App';

// // type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// // type Props = {
// //   navigation: HomeScreenNavigationProp;
// // };

// // export default function HomeScreen({ navigation }: Props) {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Zippin 🚀</Text>
// //       <Text style={styles.subtitle}>Affordable Scooter Rentals for Canadian Communities</Text>
// //       <View style={styles.buttons}>
// //         <Button title="Find Scooters" onPress={() => navigation.navigate('Map')} />
// //         <Button title="My Profile" onPress={() => navigation.navigate('Profile')} />
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
// //   title: { fontSize: 32, fontWeight: 'bold', color: '#7A3E9D', marginBottom: 10 },
// //   subtitle: { fontSize: 16, color: '#000', textAlign: 'center', marginBottom: 20 },
// //   buttons: { gap: 10 }
// // });
