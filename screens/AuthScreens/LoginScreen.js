import React from "react";
import { View, Text, Button } from "react-native";
import Login from "../../components/Auth/Login";

class LoginScreen extends React.Component {
  render() {
    return <Login navigation={this.props.navigation.navigate} />;
  }
}

export default LoginScreen;
