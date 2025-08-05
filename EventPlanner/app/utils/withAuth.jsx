import {useEffect, useState} from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const navigation = useNavigation();
        const [isLoading, setIsLoading] = useState(true)
        const [isAuthenticated, setIsAuthenticated]= useState(false)

        useEffect(() => {
            const checkToken = async() => {
                try {
                    const token = await AsyncStorage.getItem("token")
                    if(token){
                        setIsAuthenticated(true)
                    } else {
                        consoel.log("go back to login")
                        navigation.navigate('login')
                    }
                } catch (error) {
                    console.log('error checking token:', error);
                    navigation.navigate('login')
                } finally{
                    setIsLoading(false)
                }
            }
            checkToken()
        }, [navigation])

        return isAuthenticated ? <WrappedComponent {...props} /> : null
    }
}

export default withAuth