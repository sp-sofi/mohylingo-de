import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/login-screen";
import MainScreen from "../screens/main-screen";
import TopicQuestionsLearn from "../screens/topic-questions-learn";
import MessengerScreen from "../screens/messenger";
import SignupScreen from "../screens/signup-screen";
import ProfileScreen from "../screens/profile-screen";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Questions to Learn" component={TopicQuestionsLearn} />
            <Stack.Screen name="Messenger" component={MessengerScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            {/*<Stack.Screen name="Settings" component={Settings} />*/}
        </Stack.Navigator>
    );
}