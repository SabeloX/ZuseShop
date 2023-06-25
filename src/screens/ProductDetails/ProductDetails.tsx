import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ScrollView, View } from "react-native"
import { RootStackParamList } from "../../../App"
import { Avatar, Card, IconButton, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { formatPrice } from "../../utils/priceFormat";

export const ProductDetails = ({ navigation }: NativeStackScreenProps<RootStackParamList, "ProductDetails">) => {
    const { product } = useSelector((state: RootState) => state.products)
    const theme = useTheme();
    if (!product) {
        navigation.navigate("Home");
        return;
    }
    return (
        <View
            style={{
                gap: 20,
                backgroundColor: theme.colors.onPrimary,
                flex: 1
            }}
        >
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
                    Details
                </Text>
            </View>
            <ScrollView>
                <View
                    style={{
                        gap: 30,
                        padding: 20,
                    }}
                >
                    <Card
                        mode="elevated"
                        style={{
                            margin: 10
                        }}
                    >
                        <Card.Cover
                            source={{ uri: product.image }}
                            resizeMode="contain"
                        />
                    </Card>
                    <Text
                        variant="titleLarge"
                        style={{
                            color: theme.colors.primary,
                            fontWeight: "700"
                        }}
                    >
                        {product?.title}
                    </Text>
                    <Text
                        variant="bodyLarge"
                    >
                        {product.description}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            variant="headlineMedium"
                        >
                            {formatPrice(product.price)}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center"
                            }}
                        >
                            <Text
                                variant="labelLarge"
                            >
                                Add to cart
                            </Text>
                            <IconButton
                                icon="plus"
                                iconColor={theme.colors.onPrimary}
                                style={{
                                    backgroundColor: theme.colors.primary
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}