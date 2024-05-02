import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./navigation/stack";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {UserProvider} from "./core/containers/UserProvider";
import { useFonts } from "expo-font";
const Kodchasan = require('./assets/fonts/Kodchasan-Regular.ttf');
const KodchasanBold = require('./assets/fonts/Kodchasan-Bold.ttf');


export default function App() {
    const queryClient = new QueryClient();
    const [loaded] = useFonts({
        Kodchasan,
        KodchasanBold
    });

    return !loaded ? null :(
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <NavigationContainer>
                    <HomeStack />
                </NavigationContainer>
            </UserProvider>
        </QueryClientProvider>
    );
}
