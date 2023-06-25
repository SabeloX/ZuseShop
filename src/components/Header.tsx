import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native"
import { IconButton, Text, useTheme } from "react-native-paper"
import { RootStackParamList } from "../../App";

type HeaderProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>;
    heading: string;
}

export const Header = ({ navigation, heading }: HeaderProps) => {
    const theme = useTheme();
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: theme.colors.secondary,
                padding: 10
            }}
            >
                <IconButton
                    size={25}
                    icon="arrow-left"
                    iconColor={theme.colors.onSecondary}
                    onPress={() => navigation.navigate("Home")}
                />
                <Text
                    variant="headlineLarge"
                    style={{
                        color: theme.colors.onSecondary
                    }}
                >
                    {heading}
                </Text>
            </View>
    )
}