import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (userToken) => {
    try {
        await AsyncStorage.setItem('userToken', userToken);
    } catch (e) {
        // saving error
    }
}
const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('userToken');
        if(value !== null) {
            return value;
        }
    } catch(e) {
        // error reading value
    }
}
export const UserContext = createContext({
    user: null,
    token: '',
    setUser: () => null,
    storeToken: () => null,
});

export const UserProvider = ({
    initialValue = {},
    children,
    ...restProps
}) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);

    // const [token, setToken] = useState('3db90601b9e2c43ad6eef233f3876292af864f94');
    // const [user, setUser] = useState(
    //     {"user_id": 10, "username": "Kyla_Kemmer"}
    // );

    const value = {
        ...initialValue,
        user,
        token,
        setUser,
        storeToken,
    };

    useEffect(() => {
        const loadToken = async () => {
            const token = await getToken();
            if (token) {
                setToken(token);
            }
        };

        loadToken();
    }, [user]);

    return (
        <UserContext.Provider
            value={value}
            {...restProps}
        >
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);