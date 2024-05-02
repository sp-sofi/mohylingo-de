import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const GradientCircularProgress = ({ size, strokeWidth, percentage }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View>
            <Svg width={size} height={size}>
                <Circle
                    stroke="#FFFFFF" // Background circle color
                    opacity={0.4}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#FFF7AD" />
                        <Stop offset="100%" stopColor="#4F009F" />
                    </LinearGradient>
                </Defs>
                <Circle
                    stroke="url(#grad)"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                />
            </Svg>
            <View style={{position: 'absolute', width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{
                    color: '#4F009F',
                    fontSize: 28,
                    textAlign: 'center',
                    fontFamily: 'Kodchasan',
                }}>Course Progress</Text>
            </View>
        </View>
    );
};

export default GradientCircularProgress;
