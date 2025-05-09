import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AddTransactionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} placeholder="Enter description" />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="₱0.00"
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.typeButton, { backgroundColor: "#159500" }]}>
          <Text style={styles.typeButtonText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeButton, { backgroundColor: "#D10000" }]}>
          <Text style={styles.typeButtonText}>Expense</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  typeButton: {
    flex: 1,
    padding: 14,
    marginHorizontal: 6,
    borderRadius: 6,
  },
  typeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#0A3480",
    marginTop: 40,
    padding: 14,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
