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

    const logout = async () => {
        await storeToken('');
        setToken('');
        setUser(null);
    };

    const value = {
        ...initialValue,
        user,
        token,
        logout,
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