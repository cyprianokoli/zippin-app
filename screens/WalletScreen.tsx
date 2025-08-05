// screens/WalletScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../context/WalletContext";
import { useNavigation } from "@react-navigation/native";

export default function WalletScreen() {
  const { balance, transactions, addFunds } = useWallet();
  const navigation = useNavigation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addFunds(5)}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.addText}>Add $5</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.transactionRow}
              onPress={() =>
                navigation.navigate(
                  "TransactionDetails" as never,
                  { transaction: item } as never
                )
              }
            >
              <Ionicons
                name={item.type === "add" ? "add-circle" : "bicycle"}
                size={28}
                color={item.type === "add" ? "#4CAF50" : "#7B2CBF"}
                style={styles.transactionIcon}
              />
              <View style={styles.transactionTextContainer}>
                <Text style={styles.transactionTitle}>
                  {item.type === "add" ? "Funds Added" : "Ride Payment"}
                </Text>
                <Text style={styles.transactionDate}>
                  {formatDate(item.date)}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.type === "add" ? "#4CAF50" : "#E53935" },
                ]}
              >
                {item.type === "add" ? "+" : "-"}${item.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  balanceCard: {
    backgroundColor: "#7B2CBF",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
  },
  balanceLabel: { color: "#fff", fontSize: 16 },
  balanceAmount: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A189A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  addText: { color: "#fff", marginLeft: 6 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", margin: 20 },
  emptyText: { color: "#666", textAlign: "center", marginTop: 20 },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionIcon: { marginRight: 12 },
  transactionTextContainer: { flex: 1 },
  transactionTitle: { fontSize: 16, fontWeight: "500", color: "#000" },
  transactionDate: { fontSize: 14, color: "#666" },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
});
