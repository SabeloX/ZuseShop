import { View } from "react-native"
import { styles } from "./Products.styles"
import { Avatar, Card, Text, useTheme } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { RootDispatch } from "../../state/store";
import { setProduct } from "../../state/slices/productsSlice";
import { formatPrice } from "../../utils/priceFormat";

export type ProductType = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

type ProductProps = {
    product: ProductType;
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
    dispatch: RootDispatch;
}

export const Product = ({ product, navigation, dispatch }: ProductProps) => {
    const theme = useTheme();
    return (
        <Card
            mode="elevated"
            onPress={() => {
                dispatch(setProduct(product));
                navigation.navigate("ProductDetails");
            }}
        >
            <Card.Cover resizeMode="contain" source={{ uri: product.image}}/>
            <Card.Title title={product.title} titleVariant="titleMedium" />
            <Card.Content>
                <Text
                    style={{ color: theme.colors.primary }}
                    variant="headlineMedium"
                >
                    { formatPrice(product.price) }
                </Text>
            </Card.Content>
        </Card>
    )
}