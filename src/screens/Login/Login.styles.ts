import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    heading: {
        fontWeight: "600",
        textAlign: "center"
    },
    container: {
        justifyContent: "center",
        flex: 1,
        padding: 20,
        gap: 50,
    },
    input: {
        borderBottomWidth: 1,
    },
    error: {
        fontSize: 16,
        textAlign: "center",
        position: "relative",
        bottom: 35
    },
    backButton: {
        position: "absolute",
        top: 20,
        flexDirection: "row",
        alignItems: "center"
    }
});