import { FlatList, View } from "react-native"
import { Category } from "./Category";
import { styles } from "./Category.styles";
import { Text } from "react-native-paper";

type CategoryListProps = {
    categories: string[];
}

export const CategoryList = ({ categories } : CategoryListProps) => {
    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Categories</Text>
            <FlatList
                data={["all",...categories]}
                renderItem={(category) => <Category category={category.item} />}
                keyExtractor={category => `${category}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}