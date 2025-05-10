import CustomAddExpenseModal from '@/components/CustomAddExpenseModal';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryDetailScreen() {
    const { id, title, icon } = useLocalSearchParams();
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    const router = useRouter();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const totalBalance = 1000;
    const totalExpense = 500;

    const totalAmount = totalBalance + totalExpense;
    const balanceBarWidth = totalBalance ? (totalBalance / totalAmount) * 100 : 0;
    const expenseBarWidth = totalExpense ? (totalExpense / totalAmount) * 100 : 0;
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.centeredTitleContainer}>
                        <Text style={styles.categoryTitle}>{title}</Text>
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
                <Button title="Add Expense" onPress={() => setShowModal(true)} />
            </View>

            <CustomAddExpenseModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                categoryId={String(id)}
            />

        </View>
    )
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
});
