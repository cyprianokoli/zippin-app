// screens/RideSummaryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RideSummaryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction } = route.params || {};

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No ride data available.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Completed!</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{(transaction.duration / 60).toFixed(1)} min</Text>

        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{transaction.distance.toFixed(2)} km</Text>

        <Text style={styles.label}>CO₂ Saved</Text>
        <Text style={styles.value}>{transaction.co2Saved} kg</Text>

        <Text style={styles.label}>Total Cost</Text>
        <Text style={styles.cost}>${transaction.amount.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("TransactionDetails", { transaction })}
      >
        <Ionicons name="receipt-outline" size={18} color="#fff" />
        <Text style={styles.primaryButtonText}>View Transaction Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home-outline" size={18} color="#7B2CBF" />
        <Text style={styles.secondaryButtonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#7B2CBF" },
  summaryCard: {
    width: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: { fontSize: 14, color: "#555", marginTop: 10 },
  value: { fontSize: 18, fontWeight: "600", color: "#000" },
  cost: { fontSize: 20, fontWeight: "bold", color: "#7B2CBF", marginTop: 5 },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B2CBF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  primaryButtonText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: 12,
    borderRadius: 8,
  },
  secondaryButtonText: { color: "#7B2CBF", marginLeft: 6, fontWeight: "600" },
  error: { fontSize: 16, color: "#E53935", marginBottom: 20 },
  button: { backgroundColor: "#7B2CBF", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
});


//V!
// // screens/RideSummaryScreen.tsx
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function RideSummaryScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { transaction } = route.params || {};

//   if (!transaction) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>No ride data available.</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate("Home")}
//         >
//           <Text style={styles.buttonText}>Go Home</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Title */}
//       <Text style={styles.title}>Ride Completed!</Text>

//       {/* Summary Card */}
//       <View style={styles.summaryCard}>
//         <Text style={styles.label}>Duration</Text>
//         <Text style={styles.value}>
//           {(transaction.duration / 60).toFixed(1)} min
//         </Text>

//         <Text style={styles.label}>Distance</Text>
//         <Text style={styles.value}>
//           {transaction.distance.toFixed(2)} km
//         </Text>

//         <Text style={styles.label}>CO₂ Saved</Text>
//         <Text style={styles.value}>
//           {transaction.co2Saved} kg
//         </Text>

//         <Text style={styles.label}>Total Cost</Text>
//         <Text style={styles.cost}>${transaction.amount.toFixed(2)}</Text>
//       </View>

//       {/* Buttons */}
//       <TouchableOpacity
//         style={styles.primaryButton}
//         onPress={() =>
//           navigation.navigate("TransactionDetails", { transaction })
//         }
//       >
//         <Ionicons name="receipt-outline" size={18} color="#fff" />
//         <Text style={styles.primaryButtonText}>View Transaction Details</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.secondaryButton}
//         onPress={() => navigation.navigate("Home")}
//       >
//         <Ionicons name="home-outline" size={18} color="#7B2CBF" />
//         <Text style={styles.secondaryButtonText}>Go Home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#7B2CBF",
//   },
//   summaryCard: {
//     width: "90%",
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#000",
//   },
//   cost: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#7B2CBF",
//     marginTop: 5,
//   },
//   primaryButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#7B2CBF",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   primaryButtonText: {
//     color: "#fff",
//     marginLeft: 6,
//     fontWeight: "600",
//   },
//   secondaryButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#EDEDED",
//     padding: 12,
//     borderRadius: 8,
//   },
//   secondaryButtonText: {
//     color: "#7B2CBF",
//     marginLeft: 6,
//     fontWeight: "600",
//   },
//   error: {
//     fontSize: 16,
//     color: "#E53935",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#7B2CBF",
//     padding: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });
