import { TextInput, useTheme } from "react-native-paper"

type InputFieldProps = {
    value: string;
    onChangeText: (text: string) => void;
    secure?: boolean;
    error: boolean;
    setSecure?: (value: boolean) => void;
    label: string;
}

export const InputField = ({ value, onChangeText, secure, setSecure, error, label }: InputFieldProps) => {
    const theme = useTheme();
    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={(newValue) => onChangeText(newValue)}
            mode="flat"
            style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.primary,
                borderBottomWidth: 1
            }}
            underlineColor="transparent"
            secureTextEntry={secure}
            right={<TextInput.Icon onPress={secure && () => setSecure?(!secure)} icon="eye" />}
            error={error}
        />
    )
}