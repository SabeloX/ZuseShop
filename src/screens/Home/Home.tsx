import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"
import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../state/store"
import { ProductList } from "../../components/products/ProductList"
import { useEffect } from "react"
import { styles } from "./Home.styles"
import { CategoryList } from "../../components/categories/CategoryList"
import { View } from "react-native"
import { fetchCategoies } from "../../middleware/fetchCategories"
import { fetchProducts } from "../../middleware/fetchProducts"

export const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const { products, loadingProducts, productError } = useSelector((state: RootState) => state.products)
    const { categories, loadingCategories, categoryError } = useSelector((state: RootState) => state.categories)
    const dispatch: RootDispatch = useDispatch();
    const theme = useTheme();
  
    useEffect(() => {
        dispatch(fetchCategoies());
        if(products.length !== 0)
            dispatch(fetchProducts());
    }, []);
    useEffect(() => { console.log(categories, categoryError) }, [categories, categoryError]);
    if (loadingCategories || loadingProducts) 
        <SafeAreaView
            style={styles.container}
        >
            <ActivityIndicator
                animating={true}
                color={theme.colors.primary}
            />
        </SafeAreaView>
    return (
        <SafeAreaView
            style={styles.container}
        >
            <View
                style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Text variant="displaySmall">ZuseShop</Text>
                {
                    token ?
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate("ProductCreation")}
                        >
                            Add new product
                        </Button> :
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate("Login")}
                        >
                            Login
                        </Button>
                }
            </View>
            <CategoryList categories={categories} />
            <ProductList dispatch={dispatch} navigation={navigation} products={products} />
        </SafeAreaView>
    )
}