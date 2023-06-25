import { FlatList, ScrollView, View } from "react-native"
import { Product, ProductType } from "./Product"
import { styles } from "./Products.styles"
import { Text } from "react-native-paper"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

export type ProductListProps = {
    products: ProductType[]
}

export const ProductList = ({ products }: ProductListProps) => {
    const currentCategory = useSelector((state: RootState) => state.products.category)
    return (
        <ScrollView>
            <Text
                style={{
                    padding: 10
                }}
                variant="titleMedium"
            >
                Browse our products
            </Text>
            <View style={styles.container}>
                {
                    products.filter((product: ProductType) => (product.category === currentCategory) || (currentCategory === "all")).map(product => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </View>
        </ScrollView>
    )
}