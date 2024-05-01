import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    sIcon: {
        fontSize: 28,
        color: '#4F009F',
        alignSelf: 'center',
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
});
// <Navbar title={`Hello, {user?.username}`} />
const Navbar = ({
   title,
}) => {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={styles.sIcon}>{title}</Text>
            <View style={styles.tabButtons}>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => navigation.navigate("Tutorial")}
                >
                    <LinearGradient
                        colors={['#FFF7AD', '#FFA9F9']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.tabButtonGradient}
                    >
                        <Text style={styles.tabButtonText}>Tutorial</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, { backgroundColor: '#FFBBF8' }]}
                    onPress={() => navigation.navigate("Main")}
                >
                    <View style={styles.tabButtonGradient}>
                        <Text style={styles.tabButtonText}>Main</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <LinearGradient
                        colors={['#FFF7AD', '#FFA9F9']}
                        style={styles.tabButtonGradient}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                        <Text style={styles.tabButtonText}>Profile</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Navbar;
