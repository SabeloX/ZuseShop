import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState, useEffect } from "react"
import { View } from "react-native"
import { Button, IconButton, Text, TextInput, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../middleware/login"
import { RootDispatch, RootState } from "../../state/store"
import { styles } from "./Login.styles"
import { Header } from "../../components/Header"
import { InputField } from "../../components/InputField"

export const LoginScreen = ({ navigation } : NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secure, setSecure] = useState<boolean>(true);
    const theme = useTheme();
    const [inputError, setError] = useState<string | null>(null);
    const dispatch: RootDispatch = useDispatch();
    const { loading, error, token } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if(token)
            navigation.navigate("Home")
    }, [token])

    /**
     * Submit the input data and make a login request to the server
     * username = johnd
     * password = m38rmF$
     */
    const submitForm = async () => {
        if (username !== "" && password !== "") {
            dispatch(login({ username, password }));
        }
        else {
            setError("Please enter your username and password");
        }
    }
    
    return (
        <SafeAreaView
            style={{
                backgroundColor: theme.colors.background,
                flex: 1,
            }}
        >
            <Header
                heading="Go back home"
                navigation={navigation}
            />
            <SafeAreaView
                style={[
                    styles.container,
                    {
                        backgroundColor: theme.colors.background,
                        flex: 1
                    }
                ]}
            >
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
                    style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.primary,
                        borderBottomWidth: 1
                    }}
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
                    style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.primary,
                        borderBottomWidth: 1
                    }}
                    underlineColor="transparent"
                    secureTextEntry={secure}
                    right={<TextInput.Icon onPress={() => setSecure(!secure)} icon="eye" />}
                    error={inputError !== null}
                />
                <Button
                    mode="contained"
                    loading={loading}
                    onPress={submitForm}
                    style={{
                        marginTop: 40
                    }}
                >
                    Submit
                </Button>
                <Text
                    style={[styles.error, {color: theme.colors.error}]}
                >
                    {inputError || error}
                </Text>
            </SafeAreaView>
        </SafeAreaView>
    )
}