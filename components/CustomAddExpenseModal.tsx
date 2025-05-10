// components/CustomAddExpenseModal.tsx
import useExpenseStore from '@/store/expenseStore';
import { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    categoryId: string;
    onSuccess?: () => void;
}

export default function CustomAddExpenseModal({ visible, onClose, categoryId, onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');

    const { addExpense, loading, error } = useExpenseStore();

    const handleSubmit = async () => {
        const parsedAmount = parseFloat(amount);

        if (!title || isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Please enter valid title and amount');
            return;
        }

        try {
            await addExpense({ title, amount: parsedAmount, categoryId: Number(categoryId) });
            setTitle('');
            setAmount('');
            onSuccess?.();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add Expense</Text>
                    <TextInput
                        placeholder="Title"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        placeholder="Amount"
                        style={styles.input}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <Button title={loading ? 'Adding...' : 'Add'} onPress={handleSubmit} disabled={loading} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    title: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
