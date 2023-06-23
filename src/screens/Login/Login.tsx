import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ChangeEvent, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Card, IconButton, Text, TextInput, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"
import axios, { AxiosResponse } from "axios";
import { config } from "../../config"
import { styles } from "./Login.styles"
import { useAPI } from "../../hooks/api"
import { useDispatch } from "react-redux"
import { login } from "../../state/slices/authSlice"

export const LoginScreen = ({ navigation } : NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secure, setSecure] = useState<boolean>(true);
    const theme = useTheme();
    const [inputError, setError] = useState<string | null>(null);
    const { data, execute, error, loading, succeeded } = useAPI({ url: "/auth/login", method: "POST" });
    const dispatch = useDispatch();

    useEffect(() => {
        if (succeeded) {
            dispatch(login(data.token))
            setError(null);
            setUsername("");
            setPassword("");
            navigation.navigate("Home");
        }
        else if(error) {
            setError("Incorrect credentials. Please try again.");
        }
    }, [data]);

    /**
     * Submit the input data and make a login request to the server
     * username = johnd
     * password = m38rmF$
     */
    const submitForm = async () => {
        if (username !== "" && password !== "") {
            execute({ username, password });
        }
        else {
            setError("Please enter your username and password");
        }
    }
    
    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background }
            ]}
        >
            <View
                style={styles.backButton}
            >
                <IconButton
                    icon="arrow-left"
                    onPress={() => navigation.navigate("Home")}
                />
                <Text>Go back home</Text>
            </View>
            <Text
                variant="headlineMedium"
                style={[
                    styles.heading,
                    {
                        fontSize: theme.fonts.headlineLarge.fontSize,
                        fontFamily: theme.fonts.headlineLarge.fontFamily,
                        color: theme.colors.primary
                    }
                ]}
            >
                Login
            </Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={(newUsername) => setUsername(newUsername)}
                mode="flat"
                style={[styles.input, {backgroundColor: theme.colors.background, color: theme.colors.primary}]}
                underlineColor="transparent"
                right={<TextInput.Icon icon="account" />}
                placeholderTextColor={theme.colors.primary}
                error={inputError !== null}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
                mode="flat"
                style={[styles.input, {backgroundColor: theme.colors.background, color: theme.colors.primary}]}
                underlineColor="transparent"
                secureTextEntry={secure}
                right={<TextInput.Icon onPress={() => setSecure(!secure)} icon="eye" />}
                error={inputError !== null}
            />
            <Button
                mode="contained"
                loading={loading}
                onPress={submitForm}
            >
                Submit
            </Button>
            <Text
                style={[styles.error, {color: theme.colors.error}]}
            >
                {inputError}
            </Text>
        </SafeAreaView>
    )
}