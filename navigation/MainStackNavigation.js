import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import CameraScreen from "../screens/MainAppScreens/CameraScreen";
import ChoiceScreen from "../screens/MainAppScreens/ChoiceScreen";
import ResultScreen from "../screens/MainAppScreens/ResultScreen";

const MainStack = createStackNavigator({
  Camera: CameraScreen,
  Choice: ChoiceScreen,
  Result: ResultScreen
});

export default MainStack;
