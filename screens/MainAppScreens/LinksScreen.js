import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default class LinksScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Links</Text>
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
