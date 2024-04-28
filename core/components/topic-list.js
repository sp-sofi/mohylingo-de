import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Topic from "./topic";


const data = [
    { id: '1', topic: 'Family', progress: '12/24', color: '#FFBBF8' },
    { id: '2', topic: 'Work', progress: '8/20', color: '#FFF7AD' },
    // Add more topics as needed
];

const TopicList = () => {
    const renderTopic = ({item}) => {
        return <Topic id={item.id} topic={item.topic} progress={item.progress}></Topic>
    }

    return (
        <View >
            <Text style={styles.topicsInProgress}>Topics in progress</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={ renderTopic }
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
    topicsInProgress: {
        marginBottom: 16,
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 36,
    },
    topicItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 35,
        padding: 8,
        height:120,

    },
    topicDetails: {
        flex: 1,
        flexDirection: 'row',
    },
    topicEmoji: {
        fontSize: 48,
        marginLeft: 7,
    },
    topicName: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 32,
        marginLeft: 23,
    },
    progressText: {
        color: '#4F009F',
        fontFamily: 'Kodchasan',
        fontSize: 24,
        //marginLeft: 75,

    },
});
export default TopicList;