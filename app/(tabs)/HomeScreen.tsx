import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AppLayout from "../AppLayout";
const dummyData = [
  {
    id: "1",
    description: "Salary",
    amount: 100,
  },
  {
    id: "2",
    description: "Groceries",
    amount: -50,
  },
];

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("Daily");
  const totalBalance = 1000;
  const totalExpense = 500;
  const foodLastWeek = 120;
  const incomeLastWeek = 1500;

  const totalAmount = totalBalance + totalExpense;
  const balanceBarWidth = totalBalance ? (totalBalance / totalAmount) * 100 : 0;
  const expenseBarWidth = totalExpense ? (totalExpense / totalAmount) * 100 : 0;

  const filteredData = dummyData.filter((item) => {
    // Replace with real date-based filtering logic
    if (selectedTab === "Daily") return true;
    if (selectedTab === "Weekly") return true;
    if (selectedTab === "Monthly") return true;
    return true;
  });

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <Text style={styles.sectionTitle}>Hi, Welcome Back</Text>
          </View>
          <View style={styles.headerBalanceContainer}>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceTitle}>Total Balance</Text>
              <Text style={styles.balanceAmount}>₱{totalBalance.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.balanceContainer}>
              <Text style={styles.balanceTitle}>Total Expense</Text>
              <Text style={styles.balanceAmount}>₱{totalExpense.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.comparisonContainer}>
            <View
              style={[
                styles.balanceBar,
                { width: `${balanceBarWidth}%`, backgroundColor: "#052224" },
              ]}
            />
            <View
              style={[
                styles.expenseBar,
                { width: `${expenseBarWidth}%`, backgroundColor: "#F1FFF3" },
              ]}
            />
            <Text style={[styles.percentageText, { left: 20 }]}>
              {balanceBarWidth.toFixed(0)}%
            </Text>
            <Text style={[styles.percentageText, { right: 20, color: "#000" }]}>
              {expenseBarWidth.toFixed(0)}%
            </Text>
          </View>
        </View>

        <View style={styles.transactionContainer}>
          <View style={styles.savingsContainer}>
            <View style={styles.row}>
              <View style={styles.goalProgressContainer}>
                <AnimatedCircularProgress
                  size={60}
                  width={5}
                  fill={70}
                  tintColor="#fff"
                  backgroundColor="#0A3480"
                  rotation={0}
                  lineCap="round"
                >
                  {(fill: number) => (
                    <Text style={styles.goalProgressText}>
                      {`${Math.round(fill)}%`}
                    </Text>
                  )}
                </AnimatedCircularProgress>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.savingsText}>Savings</Text>
                  <Text style={styles.savingsText}>On Goals</Text>
                </View>
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.column}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <MaterialIcons name="fastfood" size={24} color="#0A3480" />
                  <Text style={styles.savingsText}>Food Last Week</Text>
                </View>
                <View style={styles.horizontalDivider} />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <MaterialIcons name="attach-money" size={24} color="#0A3480" />
                  <Text style={styles.savingsText}>Income Last Week</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.tabContainerWrapper}>
            <View style={styles.tabButtonsContainer}>
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <Pressable
                  key={tab}
                  style={[
                    styles.tabButton,
                    selectedTab === tab && styles.tabButtonActive,
                  ]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      selectedTab === tab && styles.tabButtonTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>


          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <View>
                  <Text style={styles.transactionDescription}>{item.description}</Text>
                  <Text style={styles.transactionLabel}>
                    {item.amount >= 0 ? "Income" : "Expense"}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.amount >= 0 ? "#0A3480" : "#FF5A5F" },
                  ]}
                >
                  ₱{item.amount.toFixed(2)}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No transactions yet.</Text>
            }
          />

        </View>


      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00D09E" },
  headerContainer: {
    paddingHorizontal: 40,
    marginTop: 50,
  },
  headerContent: {
    marginBottom: 10,
  },
  headerBalanceContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  balanceContainer: {
    alignItems: "center",
  },
  divider: {
    width: 2,
    height: 50,
    backgroundColor: "#fff",
  },
  balanceTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  comparisonContainer: {
    flexDirection: "row",
    height: 30,
    marginTop: 0,
    borderRadius: 100,
    overflow: "hidden",
    width: "100%",
  },
  percentageText: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  balanceBar: {
    height: "100%",
  },
  expenseBar: {
    height: "100%",
  },
  transactionContainer: {
    flex: 1,
    padding: 30,
    marginTop: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#F1FFF3",
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
    fontWeight: "600",
  },
  transactionLabel: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#888",
  },

  savingsContainer: {
    backgroundColor: "#00D09E",
    padding: 20,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  savingsText: {
    fontSize: 14,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  goalProgressContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  goalProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 2,
    height: "100%",
    backgroundColor: "#fff",
    marginHorizontal: 16,
  },
  horizontalDivider: {
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 10,
  },

  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A3480",
  },
  tabContainerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFF7E2",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 26,
  },

  tabButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  tabButton: {
    width: 90,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#00D09E",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  tabButtonTextActive: {
    color: "#fff",
  },

});
