import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../context/WalletContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

export default function WalletScreen() {
  const { balance, transactions, addFunds } = useWallet();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addAmount, setAddAmount] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "add" | "ride">("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleAddFunds = () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      addFunds(amount);
      setAddAmount("");
    }
  };

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <SafeAreaView style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        <View style={styles.addFundsRow}>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setAddAmount("5")}
          >
            <Text style={styles.presetButtonText}>$5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setAddAmount("10")}
          >
            <Text style={styles.presetButtonText}>$10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setAddAmount("20")}
          >
            <Text style={styles.presetButtonText}>$20</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addFundsInputRow}>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={addAmount}
            onChangeText={setAddAmount}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddFunds}
            disabled={
              !addAmount || isNaN(Number(addAmount)) || Number(addAmount) <= 0
            }
          >
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={
              filter === "all" ? styles.filterTextActive : styles.filterText
            }
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "add" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("add")}
        >
          <Text
            style={
              filter === "add" ? styles.filterTextActive : styles.filterText
            }
          >
            Top-ups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "ride" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("ride")}
        >
          <Text
            style={
              filter === "ride" ? styles.filterTextActive : styles.filterText
            }
          >
            Rides
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {filteredTransactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet</Text>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.transactionRow}
              onPress={() =>
                navigation.navigate("TransactionDetails", { transaction: item })
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
  addFundsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  presetButton: {
    backgroundColor: "#E0BBE4",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  presetButtonText: {
    color: "#7B2CBF",
    fontWeight: "bold",
  },
  addFundsInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    width: "100%",
    justifyContent: "center",
  },
  amountInput: {
    backgroundColor: "#fff",
    borderColor: "#7B2CBF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    width: 100,
    marginRight: 10,
    color: "#000",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 0,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "#E0BBE4",
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: "#7B2CBF",
  },
  filterText: {
    color: "#7B2CBF",
    fontWeight: "bold",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
