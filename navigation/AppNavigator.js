import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthStackNavigation";

export default createAppContainer(
  createSwitchNavigator(
    {
      App: MainTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);
