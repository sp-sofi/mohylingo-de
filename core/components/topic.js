import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import {useFonts} from "expo-font";
import {useNavigation} from "@react-navigation/native";
import TopicDetail from "../../screens/topic-detail";


const data = [
    { id: '1', topic: 'Family', progress: '12/24', color: '#FFBBF8' },
    { id: '2', topic: 'Work', progress: '8/20', color: '#FFF7AD' },
    // Add more topics as needed
];

const Topic = ({id, topic, progress}) => {
    const [loaded] = useFonts({
        Kodchasan: require('../../assets/fonts/Kodchasan-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }

    const navigation = useNavigation()

    return (
        <View style={[styles.topicItem, { backgroundColor: '#FFBBF8' },]}>
            <TouchableOpacity style={styles.topicDetails} onPress={(()=>navigation.navigate("TopicDetail", {topicId: id}))}>
                <Text style={styles.topicEmoji}>🫦</Text>
                <Text style={styles.topicName}>{topic}</Text>
                <Text style={styles.progressText}>{progress}</Text>
            </TouchableOpacity>
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

    export default Topic;
