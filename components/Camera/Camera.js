import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Camera, Permissions, FileSystem } from "expo";
import { ClarifaiSDK } from "../../clarifai";
import * as firebase from "firebase";
import { Header, Icon, Left, Right, Body } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class App extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    hasCameraPermission: null,
    isCapturing: false,
    accessCameraLabel: "Start",
    capturedPhoto: null,
    pictureAnalysis: [],
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };
  flashMode = () => {
    this.setState({
      flashMode:
        this.state.flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
    });
  };

  async accessCamera() {
    if (this.state.isCapturing) {
      let photo = await this.camera.takePictureAsync();
      this.setState({
        isCapturing: false,
        accessCameraLabel: "Retake",
        capturedPhoto: photo.uri
      });
      console.log(photo);
    } else {
      this.setState({
        isCapturing: true,
        accessCameraLabel: "Capture",
        capturedPhoto: null
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1, justifyContent: "space-between" }}
          type={this.state.type}
          autoFocus
          flashMode={this.state.flashMode}
          ref={ref => {
            this.camera = ref;
          }}
        >
          {Platform.OS === "ios" ? (
            <Header
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                left: 0,
                top: 0,
                right: 0,
                zIndex: 100,
                alignItems: "center"
              }}
            >
              <Left>
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigate("Choice")}
                  >
                    <Icon name="logo-snapchat" style={{ color: "white" }} />
                  </TouchableOpacity>
                </View>
              </Left>
              <Body />
              <Right>
                <Icon
                  onPress={() => this.flashMode()}
                  name={
                    this.state.flashMode === Camera.Constants.FlashMode.off
                      ? "ios-flash-off"
                      : "ios-flash"
                  }
                  style={{ color: "white", fontWeight: "bold", right: 10 }}
                />
                <Icon
                  onPress={() => this.flipCamera()}
                  name="ios-reverse-camera"
                  style={{ color: "white", fontWeight: "bold" }}
                />
              </Right>
            </Header>
          ) : (
            <Header transparent>
              <View
                style={{
                  flex: 1,
                  position: "absolute",
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                  top: 45,
                  left: 10,
                  right: 10,
                  alignItems: "center",
                  zIndex: 100
                }}
              >
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigate("Choice")}
                  >
                    <Icon name="logo-snapchat" style={{ color: "white" }} />
                  </TouchableOpacity>
                </View>

                <Icon
                  onPress={() => this.flashMode()}
                  name={
                    this.state.flashMode === Camera.Constants.FlashMode.off
                      ? "ios-flash-off"
                      : "ios-flash"
                  }
                  style={{ color: "white", fontWeight: "bold", right: 10 }}
                />
                <Icon
                  onPress={() => this.flipCamera()}
                  name="ios-reverse-camera"
                  style={{ color: "white", fontWeight: "bold" }}
                />
              </View>
            </Header>
          )}
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingHorizontal: 10,
              marginBottom: 15,
              alignItems: "center"
            }}
          >
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.accessCamera()}>
                <MaterialCommunityIcons
                  name="circle-outline"
                  style={{ color: "white", fontSize: 100 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CameraButton: {
    height: 40,
    backgroundColor: "#DF0101",
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  photoGroup: {
    height: 400,
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderColor: "#DF0101",
    borderWidth: 1
  }
});
