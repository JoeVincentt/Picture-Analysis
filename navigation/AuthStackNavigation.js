import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import EmailPasswordLogin from "../screens/AuthScreens/EmailPasswordLogin";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen";

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  EmailPasswordLogin: EmailPasswordLogin
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-log-in` : "md-log-in"}
    />
  )
};

const RegisterStack = createStackNavigator({
  Register: RegisterScreen
});

RegisterStack.navigationOptions = {
  tabBarLabel: "Register",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-person-add` : "md-person-add"}
    />
  )
};

export default createBottomTabNavigator({
  LoginStack,
  RegisterStack
});
