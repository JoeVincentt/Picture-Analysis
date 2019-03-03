import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Text
} from "react-native";

import { Header, Icon, Left, Right, Body } from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center"
        }}
      >
        <ImageBackground
          style={{ height: "100%", width: "100%" }}
          source={{ uri: this.props.capturedPhoto }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "black",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Icon
              onPress={() => this.setState({ capturedPhoto: null })}
              name="thumbs-down"
              style={{ color: "white", left: 15, fontSize: 60 }}
            />

            <Icon
              name="thumbs-up"
              style={{ color: "white", right: 15, fontSize: 60 }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
