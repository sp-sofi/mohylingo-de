import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    topicItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 35,
        padding: 8,
        height: 100,
    },
    topicDetails: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicEmoji: {
        fontSize: 48,
        marginBottom: 10,
        marginLeft: 7,
        marginRight: 10,
    },
    topicName: {
        color: '#4F009F',
        fontSize: 32,
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'Kodchasan',
    },
    progressText: {
        color: '#4F009F',
        fontSize: 25,
        marginTop: 10,
        fontWeight: '200',
    },
    progressBarFiller: {
        height: 15,
        borderRadius: 10,
    },
    progressBarContainer: {
        height: 15,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    topicContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        paddingBottom: 10,
        paddingRight: 10,
    },
});

const Topic = ({
    topic,
}) => {
    const {
        id,
        name,
        icon,
        progress_id,
        questions_total,
        questions_learned,
    } = topic;
    const navigation = useNavigation();
    const progress = (questions_learned?.length / questions_total) * 100;

    return (
        <View style={{...styles.topicItem, backgroundColor: '#FFBBF8' }}>
            <TouchableOpacity
                style={styles.topicDetails}
                onPress={() => navigation.navigate("Questions to Learn", {
                    topicId: id,
                    topicProgressId: progress_id,
                })}
            >
                <Text style={styles.topicEmoji}>
                    {icon}
                </Text>
                <View
                    style={styles.topicContainer}
                >
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.topicName}>{name}</Text>
                        <Text style={styles.progressText}>{questions_learned?.length}/{questions_total}</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <LinearGradient
                            colors={['#FFF7AD', '#4F009F']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{ width: `${progress}%` , ...styles.progressBarFiller }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Topic;
