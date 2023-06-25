import { FlatList, ScrollView, View } from "react-native"
import { Product, ProductType } from "./Product"
import { styles } from "./Products.styles"
import { Text } from "react-native-paper"
import { useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../state/store"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../App"

export type ProductListProps = {
    products: ProductType[];
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
    dispatch: RootDispatch;
}

export const ProductList = ({ products, navigation, dispatch }: ProductListProps) => {
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
                    products
                        .filter((product: ProductType) => (
                            product.category === currentCategory) || (currentCategory === "all")
                        )
                        .map(product => (
                            <Product
                                key={product.id}
                                product={product}
                                dispatch={dispatch}
                                navigation={navigation}
                            />
                        ))
                }
            </View>
        </ScrollView>
    )
}