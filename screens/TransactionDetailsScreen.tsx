import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function TransactionDetailsScreen() {
  const route = useRoute<RouteProp<any>>();
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Ionicons
        name={transaction.type === "add" ? "add-circle" : "bicycle"}
        size={50}
        color={transaction.type === "add" ? "#4CAF50" : "#7B2CBF"}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.amount}>
        {transaction.type === "add" ? "+" : "-"}${transaction.amount.toFixed(2)}
      </Text>
      <Text style={styles.type}>
        {transaction.type === "add" ? "Funds Added" : "Ride Payment"}
      </Text>
      <Text style={styles.date}>
        {new Date(transaction.date).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  amount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
  type: {
    fontSize: 18,
    marginTop: 5,
    color: "#555",
  },
  date: {
    fontSize: 14,
    marginTop: 5,
    color: "#888",
  },
});
