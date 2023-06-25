import { ScrollView, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import { RootStackParamList } from "../../../App"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export const ProductCreation = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, "ProductCreation">) => {
    const {  } = route.params;
    return (
        <ScrollView>
            <View>
                <Avatar.Icon
                    icon="product" />
                <Text
                    variant="displaySmall"
                >
                    Add a new product
                </Text>
            </View>
        </ScrollView>
    )
}