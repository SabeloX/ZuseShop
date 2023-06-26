import { ScrollView, View } from "react-native"
import { Avatar, Button, Text, TextInput, useTheme } from "react-native-paper"
import { RootStackParamList } from "../../../App"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Header } from "../../components/Header"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../state/store"
import { addNewProduct } from "../../state/slices/productsSlice"

export const ProductCreation = ({ navigation }: NativeStackScreenProps<RootStackParamList, "ProductCreation">) => {
    const theme = useTheme();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [inputError, setError] = useState<string | null>(null);
    const { products } = useSelector((state: RootState) => state.products);
    const dispatch: RootDispatch = useDispatch();

    const submitProduct = () => {
        if (title !== "" && price !== null) {
            dispatch(addNewProduct({
                title,
                price: (parseFloat(price)/18.75).toString(),
                id: products[products.length - 1].id + 1,
                description,
                image: "",
                category: ""
            }))
            navigation.navigate("Home");
        }
        else {
            setError("Add the product name and price.")
        }
    }
    return (
        <ScrollView
            style={{
                backgroundColor: theme.colors.background
            }}
        >
            <View
                style={{
                    gap: 30,
                }}
            >
                <Header
                    heading="Add a new product"
                    navigation={navigation}
                />
                <View
                    style={{
                        gap: 30,
                        padding: 10
                    }}
                >
                    <Text
                        variant="headlineSmall"
                        style={{
                            textAlign: "center",
                            fontWeight: "700"
                        }}
                    >
                        Enter the details of the new product
                    </Text>
                    <TextInput
                        label="Product name"
                        value={title}
                        onChangeText={(newTitle: string) => setTitle(newTitle)}
                        mode="flat"
                        style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.primary,
                            borderBottomWidth: inputError !== null ? 0 : 1
                        }}
                        underlineColor="transparent"
                        placeholderTextColor={theme.colors.primary}
                        error={inputError !== null}
                    />
                    <TextInput
                        label="Price"
                        value={price?.toString() || undefined}
                        onChangeText={(newPrice: string) => setPrice((newPrice))}
                        mode="flat"
                        keyboardType="number-pad"
                        style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.primary,
                            borderBottomWidth: inputError !== null ? 0 : 1
                        }}
                        underlineColor="transparent"
                        placeholderTextColor={theme.colors.primary}
                        error={inputError !== null}
                    />
                    <TextInput
                        label="Description (optional)"
                        value={description}
                        onChangeText={(newDesc: string) => setDescription(newDesc)}
                        mode="flat"
                        style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.primary,
                            borderBottomWidth: 1
                        }}
                        underlineColor="transparent"
                        placeholderTextColor={theme.colors.primary}
                    />
                    <Button
                        mode="contained"
                        // loading={loading}
                        onPress={submitProduct}
                        style={{
                            marginTop: 40
                        }}
                    >
                        Submit
                    </Button>
                    <Text
                        style={{color: theme.colors.error, textAlign: "center"}}
                    >
                        {inputError}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}