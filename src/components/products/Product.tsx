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
            {
                // product.image === "" ?
                //     <Avatar.Icon icon="gift"/> :
                <Card.Cover resizeMode="contain" source={{ uri: product.image === "" ? "https://www.pngitem.com/pimgs/m/568-5680053_prod-placeholder-vector-product-icon-png-transparent-png.png" : product.image }} />
            }
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