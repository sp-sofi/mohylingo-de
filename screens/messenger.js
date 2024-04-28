import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const messages = [
    { id: '1', sender: 'John', message: 'Hey there!', time: '10:00 AM' },
    { id: '2', sender: 'Jane', message: 'Hello! How are you?', time: '10:05 AM' },
    // Add more messages as needed
];

const MessengerScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sIcon}>Messenger</Text>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <View style={styles.messageBubble}>
                            <Text style={styles.sender}>{item.sender}</Text>
                            <Text style={styles.message}>{item.message}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    sIcon: {
        fontSize: 28,
        color: '#4F009F',
        alignSelf: 'flex-start',
        fontFamily: 'Kodchasan',
        marginBottom: 18,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    messageBubble: {
        backgroundColor: '#FFBBF8',
        borderRadius: 16,
        padding: 12,
        flex: 1,
    },
    sender: {
        fontSize: 16,
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        marginBottom: 4,
    },
    message: {
        fontSize: 18,
        color: '#4F009F',
        fontFamily: 'Kodchasan',
    },
    time: {
        fontSize: 12,
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        alignSelf: 'flex-end',
    },
});

export default MessengerScreen;
