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
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.primaryButtonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Ionicons name="bicycle" size={60} color="#7B2CBF" />
      <Text style={styles.title}>Ride Summary</Text>

      {/* Ride Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Ionicons name="speedometer" size={20} color="#7B2CBF" />
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>
            {transaction.distance?.toFixed(2)} km
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="time" size={20} color="#7B2CBF" />
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>
            {(transaction.duration / 60).toFixed(1)} min
          </Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="leaf" size={20} color="#4CAF50" />
          <Text style={styles.statLabel}>CO₂ Saved</Text>
          <Text style={styles.statValue}>{transaction.co2Saved} kg</Text>
        </View>
      </View>

      {/* Amount */}
      <Text style={styles.amount}>
        Ride Cost:{" "}
        <Text style={styles.amountValue}>
          ${transaction.amount?.toFixed(2)}
        </Text>
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="bicycle" size={18} color="#fff" />
        <Text style={styles.primaryButtonText}>Rebook Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate("TransactionDetails", {
            transaction,
          })
        }
      >
        <Ionicons name="receipt" size={18} color="#7B2CBF" />
        <Text style={styles.secondaryButtonText}>View Transaction Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#7B2CBF", marginBottom: 20 },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8F8F8",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
  },
  statItem: { alignItems: "center" },
  statLabel: { fontSize: 14, color: "#555", marginTop: 4 },
  statValue: { fontSize: 16, fontWeight: "600", color: "#000" },
  amount: { fontSize: 18, marginVertical: 10 },
  amountValue: { fontWeight: "bold", color: "#000" },
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
});
