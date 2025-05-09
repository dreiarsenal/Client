import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>₱0.00</Text>

      <Text style={styles.sectionTitle}>Transactions</Text>

      <FlatList
        data={[]} // placeholder
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionDescription}>Sample Transaction</Text>
            <Text style={styles.transactionAmount}>₱0.00</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet.</Text>
        }
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>＋ Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  balanceTitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0A3480",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  transactionDescription: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#888",
  },
  addButton: {
    marginTop: 24,
    backgroundColor: "#0A3480",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
