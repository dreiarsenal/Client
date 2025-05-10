import useCategoryStore from '@/store/categoryStore'; // Import your Zustand store
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const iconOptions = [
    { label: 'Food', value: 'restaurant' },
    { label: 'Shopping', value: 'shopping-cart' },
    { label: 'Health', value: 'healing' },
    { label: 'Travel', value: 'flight' },
    { label: 'Entertainment', value: 'theaters' },
    { label: 'Bills', value: 'receipt' },
    { label: 'Transport', value: 'directions-bus' },
    { label: 'Groceries', value: 'local-grocery-store' },
    { label: 'Utilities', value: 'lightbulb' },
    { label: 'Subscriptions', value: 'subscriptions' },
    { label: 'Salary', value: 'account-balance-wallet' },
    { label: 'Gifts', value: 'card-giftcard' },
    { label: 'Insurance', value: 'verified-user' },
    { label: 'Education', value: 'school' },
    { label: 'Rent', value: 'home' },
    { label: 'Savings', value: 'savings' },
    { label: 'Investment', value: 'trending-up' },
    { label: 'Pets', value: 'pets' },
    { label: 'Phone', value: 'smartphone' },
    { label: 'Others', value: 'more-horiz' },
];

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function CustomModal({ visible, onClose }: CustomModalProps) {
    const [categoryName, setCategoryName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createCategory = useCategoryStore(state => state.createCategory);

    const handleSave = async () => {
        if (!categoryName || !selectedIcon) {
            console.log('Please fill in both category name and select an icon.');
            return;
        }

        setIsLoading(true);

        try {

            await new Promise(resolve => setTimeout(resolve, 1000));

            await createCategory(categoryName, selectedIcon);
            setCategoryName('');
            setSelectedIcon(null);
            onClose();
        } catch (error) {
            console.error('Error adding category:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Add Category</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Category name"
                        value={categoryName}
                        onChangeText={setCategoryName}
                    />

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={iconOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select icon"
                        value={selectedIcon}
                        onChange={item => setSelectedIcon(item.value)}
                        renderLeftIcon={() => (
                            selectedIcon ? <MaterialIcons name={selectedIcon as keyof typeof MaterialIcons.glyphMap} size={20} style={{ marginRight: 10 }} /> : null
                        )}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleSave}
                            style={styles.saveButton}
                            disabled={isLoading}
                        >
                            <Text style={styles.saveText}>{isLoading ? 'Saving...' : 'Save'}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '85%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    dropdown: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    placeholderStyle: {
        color: '#aaa',
    },
    selectedTextStyle: {
        color: '#000',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    cancelText: {
        color: '#555',
    },
    saveButton: {
        backgroundColor: '#052224',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    saveText: {
        color: '#fff',
    },
});
