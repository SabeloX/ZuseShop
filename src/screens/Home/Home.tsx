import { NavigationAction } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Appbar, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

export const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
    const token = useSelector((state: RootState) => state.auth.token);
    console.log("Home: ", token)
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