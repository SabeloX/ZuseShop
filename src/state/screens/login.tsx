import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ChangeEvent, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Card, IconButton, Text, TextInput, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"

export const LoginScreen = ({ navigation } : NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secure, setSecure] = useState<boolean>(true);
    const theme = useTheme();
    const [error, setError] = useState<boolean>(false);

    const styles = StyleSheet.create({
        heading: {
            fontSize: theme.fonts.headlineLarge.fontSize,
            fontFamily: theme.fonts.headlineLarge.fontFamily,
            color: theme.colors.primary,
            fontWeight: "600",
            textAlign: "center"
        },
        container: {    
            justifyContent: "center",
            flex: 1,
            padding: 20,
            gap: 50,
            backgroundColor: theme.colors.background,
        },
        input: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 1,
            color: theme.colors.primary
        },
        error: {
            fontSize: 16,
            color: theme.colors.error,
            textAlign: "center",
            position: "relative",
            bottom: 35
        },
        backButton: {
            position: "absolute",
            top: 20,
            flexDirection: "row",
            alignItems: "center"
        }
    })
    
    return (
        <SafeAreaView style={styles.container}>
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
                style={styles.heading}
            >
                Login
            </Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={(newUsername) => setUsername(newUsername)}
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                right={<TextInput.Icon icon="account" />}
                placeholderTextColor={theme.colors.primary}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
                mode="flat"
                style={styles.input}
                underlineColor="transparent"
                secureTextEntry={secure}
                right={<TextInput.Icon icon="eye" />}
            />
            <Button
                mode="contained"
                // loading={}
            >
                Submit
            </Button>
            {
                error &&
                    <Text
                        style={styles.error}
                    >
                        Incorrect credentials, please try again.
                    </Text>
            }
        </SafeAreaView>
    )
}