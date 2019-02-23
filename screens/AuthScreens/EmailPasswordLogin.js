import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Button,
  ThemeProvider,
  Input,
  PricingCard
} from "react-native-elements";

export default class Login extends Component {
  render() {
    return (
      <ThemeProvider>
        <Button title="Hey!" />
        <Input placeholder="BASIC INPUT" containerStyle />
        <PricingCard
          color="#4f9deb"
          title="Free"
          price="$0"
          info={["1 User", "Basic Support", "All Core Features"]}
          button={{ title: "GET STARTED", icon: "flight-takeoff" }}
        />
      </ThemeProvider>
    );
  }
}
