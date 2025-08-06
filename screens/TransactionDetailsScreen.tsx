import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function TransactionDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { transaction } = route.params || {};

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No transaction data available.</Text>
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
      <Ionicons
        name={transaction.type === "add" ? "add-circle" : "bicycle"}
        size={60}
        color={transaction.type === "add" ? "#4CAF50" : "#7B2CBF"}
        style={{ marginBottom: 20 }}
      />

      <Text style={styles.title}>
        {transaction.type === "add" ? "Funds Added" : "Ride Payment"}
      </Text>

      <View style={styles.detailsCard}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>
          {transaction.type === "add" ? "+" : "-"}$
          {transaction.amount.toFixed(2)}
        </Text>

        {transaction.type === "ride" && (
          <>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>
              {transaction.distance?.toFixed(2)} km
            </Text>

            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>
              {(transaction.duration / 60).toFixed(1)} min
            </Text>

            <Text style={styles.label}>CO₂ Saved</Text>
            <Text style={styles.value}>{transaction.co2Saved} kg</Text>
          </>
        )}

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>
          {new Date(transaction.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>

      {transaction.type === "ride" && (
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="bicycle" size={18} color="#fff" />
          <Text style={styles.primaryButtonText}>Rebook Ride</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={18} color="#7B2CBF" />
        <Text style={styles.secondaryButtonText}>Back to Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#7B2CBF" },
  detailsCard: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontSize: 14, color: "#555", marginTop: 10 },
  value: { fontSize: 16, fontWeight: "500", color: "#000" },
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
