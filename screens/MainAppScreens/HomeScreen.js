import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { ThemeProvider, Header } from "react-native-elements";

import { MonoText } from "../../components/StyledText";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: (
      <Header
        leftComponent={<Button title="Back" onPress={() => alert("boom")} />}
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <MonoText>Home</MonoText>
        <Button
          title="Press me"
          onPress={() => this.props.navigation.navigate("Links")}
        />
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
