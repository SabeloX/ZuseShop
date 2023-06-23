import { NavigationAction } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Appbar, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"

export const HomeScreen = ({ navigation} : NativeStackScreenProps<RootStackParamList, 'Home'>) => {
    return (
        <SafeAreaView>
            <Button
                onPress={() => navigation.navigate("Login")}
            >
                Go to login screen
            </Button>
        </SafeAreaView >
    )
}