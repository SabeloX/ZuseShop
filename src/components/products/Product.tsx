import { View } from "react-native"
import { styles } from "./Products.styles"
import { Avatar, Card, Text, useTheme } from "react-native-paper";

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
}

export const Product = ({ product }: ProductProps) => {
    const theme = useTheme();
    return (
        <Card mode="elevated">
            <Card.Cover resizeMode="contain" source={{ uri: product.image}}/>
            <Card.Title title={product.title} titleVariant="titleMedium" />
            <Card.Content>
                <Text
                    style={{ color: theme.colors.primary }}
                    variant="headlineMedium"
                >
                    R{Math.round(parseFloat(product.price) * 18.75).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
            </Card.Content>
        </Card>
    )
}