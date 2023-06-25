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
            style={[
                styles.container,
                { backgroundColor: theme.colors.background }
            ]}
        >
            <View
                style={[styles.backButton, { gap: 20}]}
            >
                <IconButton
                    size={35}
                    icon="arrow-left"
                    style={{
                        backgroundColor: theme.colors.primary,
                    }}
                    iconColor={theme.colors.onPrimary}
                    onPress={() => navigation.navigate("Home")}
                />
                <Text
                    variant="titleMedium"
                    style={{
                    color: theme.colors.primary
                    }}
                >
                    Go back home
                </Text>
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
                {inputError || error}
            </Text>
        </SafeAreaView>
    )
}