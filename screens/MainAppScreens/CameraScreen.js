import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Camera from "../../components/Camera/Camera";

class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <Camera navigate={this.props.navigation.navigate} />;
  }
}

export default CameraScreen;
