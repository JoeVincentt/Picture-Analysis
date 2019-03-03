import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ResultScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Result</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
