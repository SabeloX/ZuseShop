import { Chip, useTheme } from "react-native-paper"
import { styles } from "./Category.styles";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../state/slices/productsSlice";
import { RootState } from "../../state/store";

type CategoryProps = {
    category: string;
}

export const Category = ({ category }: CategoryProps) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const currentCategory = useSelector((state: RootState) => state.products.category)
    return (
        <Chip
            onPress={() => { dispatch(setCategory(category))}}
            style={[styles.item]}
            selectedColor={theme.colors.primary}
            selected={currentCategory === category}
        >
            {category}
        </Chip>
    )
}