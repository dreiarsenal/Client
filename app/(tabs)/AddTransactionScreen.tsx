import CustomModal from '@/components/CustomModal';
import useCategoryStore from "@/store/categoryStore";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppLayout from "../AppLayout";

export default function AddTransactionScreen() {
  const router = useRouter();
  const { categories, fetchCategories } = useCategoryStore();
  const didFetchRef = useRef(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const totalBalance = 1000;
  const totalExpense = 500;

  const totalAmount = totalBalance + totalExpense;
  const balanceBarWidth = totalBalance ? (totalBalance / totalAmount) * 100 : 0;
  const expenseBarWidth = totalExpense ? (totalExpense / totalAmount) * 100 : 0;


  if (!didFetchRef.current) {
    fetchCategories();
    didFetchRef.current = true;
  }

  const dataWithId: (Category | { id: string; title: string })[] = [...categories.slice().reverse(), { id: 'add', title: 'Add' }];

  interface Category {
    id: string;
    title: string;
    icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  }

  const useFallback = (item: Category): React.ComponentProps<typeof MaterialIcons>['name'] => {
    return item.icon || 'category';
  };


  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ flexDirection: 'column', alignItems: 'center', gap: 5, margin: 8 }}
      onPress={() => {
        if (item.title === 'Add') {
          setModalVisible(true);
        } else {
          router.push({ pathname: '/screen/CategoryDetailScreen', params: { id: item.id, title: item.title, icon: item.icon } });
        }
      }}
    >
      <View style={[styles.categoryBox, item.title === 'Add' && { backgroundColor: '#ccc' }]}>
        <MaterialIcons
          name={item.title === 'Add' ? 'add' : useFallback(item)}
          size={24}
          color="#fff"
        />
      </View>
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.push('/HomeScreen')}>
              <MaterialIcons name="arrow-back" size={25} color="#fff" />
            </TouchableOpacity>
            <View style={styles.centeredTitleContainer}>
              <Text style={styles.categoryTitle}>Categories</Text>
            </View>
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
          <FlatList
            data={dataWithId}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.categoryContainer}
            renderItem={renderItem}
          />

        </View>


        <CustomModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
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
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
  },
  centeredTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
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
    marginBottom: 8,
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
    padding: 20,
    marginTop: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#F1FFF3",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  categoryContainerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  categoryBox: {
    width: 90,
    height: 80,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#3299FF",
  },
  categoryText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "900",
  },

});
