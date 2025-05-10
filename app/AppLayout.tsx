import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
