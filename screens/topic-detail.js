import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

import {useRoute} from "@react-navigation/native";

const TopicDetail = () => {
    const route = useRoute()
    const {topicId} = route.params
    return (
        <View style={styles.container}>
            <Text style={styles.sIcon}>Hello, Sofia {topicId}</Text>

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
    tabButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure space between buttons
        marginBottom: 16, // Adjust as needed
    },
    tabButton: {
        height: 45,
        width: 123,
        borderRadius: 100,
        overflow: 'hidden',
    },
    tabButtonText: {
        color: '#4F009F',
        fontSize: 18,
        fontFamily: 'Kodchasan',
    },
    tabButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentRow: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    contentButton: {
        flex: 1,
        height: 192,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    contentButtonText: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 36,
        alignSelf: 'center',
    },
    emoji: {
        fontSize: 54,

    },

});
export default TopicDetail;
