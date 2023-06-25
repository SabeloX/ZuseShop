import { NavigationAction } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityIndicator, Appbar, Button, Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackParamList } from "../../../App"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { ProductList } from "../../components/products/ProductList"
import { useAPI } from "../../hooks/api"
import { config } from "../../config"
import { useEffect } from "react"
import { getCategories, getProducts } from "../../state/slices/productsSlice"
import { styles } from "./Home.styles"
import { CategoryList } from "../../components/categories/CategoryList"
import { View } from "react-native"

export const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const { categories, products } = useSelector((state: RootState) => state.products)
    const categoriesAPI = useAPI({ url: `/products/categories`, method: "get" });
    const productsAPI = useAPI({ url: `/products`, method: "get" });
    const dispatch = useDispatch();
    const theme = useTheme();
  
    useEffect(() => {
      categoriesAPI.execute();
      productsAPI.execute();
    }, []);
    useEffect(() => {
        if (categoriesAPI.succeeded) {
            console.log("Category Success: ",categoriesAPI.data)
            dispatch(getCategories(categoriesAPI.data));
        }
        else if (categoriesAPI.error !== null) {
            console.log("Category failed: ",categoriesAPI.error)
        }
    }, [categoriesAPI.data]);
    useEffect(() => {
        if (productsAPI.succeeded) {
            dispatch(getProducts(productsAPI.data));
            console.log("Products success: ", productsAPI.data)
        }
        else if (productsAPI.error !== null) {
        }
    }, [productsAPI.data]);
    if (categoriesAPI.loading && productsAPI.loading) 
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
                    alignItems: "center",
                    marginTop: 10
                }}>
                <Text variant="displayLarge">ZuseShop</Text>
            </View>
            <CategoryList categories={categories}/>
            <ProductList products={products} />
        </SafeAreaView>
    )
}