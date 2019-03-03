import React from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Text
} from "react-native";
import { Camera, Permissions } from "expo";
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
    capturedPhoto: null,
    pictureAnalysis: [],
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    cameraLoading: false
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
      this.setState({ cameraLoading: true });
      let photo = await this.camera.takePictureAsync();
      this.setState({
        isCapturing: false,
        capturedPhoto: photo.uri,
        cameraLoading: false
      });
    } else {
      this.setState({
        isCapturing: true,
        capturedPhoto: null
      });
    }
  }

  logout = () => {
    firebase.auth().signOut();
    this.props.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.capturedPhoto ? (
          <>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center"
              }}
            >
              <ImageBackground
                style={{ height: "100%", width: "100%" }}
                source={{ uri: this.state.capturedPhoto }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    bottom: 80
                  }}
                >
                  <Icon
                    onPress={() => this.setState({ capturedPhoto: null })}
                    name="thumbs-down"
                    style={{ color: "red", left: 15, fontSize: 60 }}
                  />

                  <Icon
                    onPress={() =>
                      this.props.navigate("Choice", {
                        pictureData: this.state.capturedPhoto
                      })
                    }
                    name="thumbs-up"
                    style={{ color: "green", right: 15, fontSize: 60 }}
                  />
                </View>
              </ImageBackground>
            </View>
          </>
        ) : (
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
                  backgroundColor: "black",
                  left: 0,
                  top: 0,
                  right: 0,
                  zIndex: 100,
                  alignItems: "center"
                }}
              >
                <Left>
                  <View style={{ flexDirection: "row", flex: 4 }}>
                    <TouchableOpacity onPress={() => this.logout()}>
                      <MaterialCommunityIcons
                        name="dna"
                        style={{ color: "white", fontSize: 30 }}
                      />
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
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      right: 20,
                      fontSize: 35
                    }}
                  />
                  <Icon
                    onPress={() => this.flipCamera()}
                    name="ios-reverse-camera"
                    style={{ color: "white", fontWeight: "bold", fontSize: 35 }}
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
                    <TouchableOpacity onPress={() => this.logout()}>
                      <MaterialCommunityIcons
                        name="dna"
                        style={{ color: "white", fontSize: 30 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <Icon
                    onPress={() => this.flashMode()}
                    name={
                      this.state.flashMode === Camera.Constants.FlashMode.off
                        ? "ios-flash-off"
                        : "ios-flash"
                    }
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      right: 20,
                      fontSize: 35
                    }}
                  />
                  <Icon
                    onPress={() => this.flipCamera()}
                    name="ios-reverse-camera"
                    style={{ color: "white", fontWeight: "bold", fontSize: 35 }}
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
                {this.state.isCapturing ? (
                  <Text style={{ color: "red", fontSize: 20 }}>Press Now</Text>
                ) : (
                  <Text style={{ color: "white", fontSize: 20 }}>
                    Get Ready
                  </Text>
                )}
                <TouchableOpacity onPress={() => this.accessCamera()}>
                  <MaterialCommunityIcons
                    name="circle-outline"
                    style={{
                      color: this.state.isCapturing ? "red" : "white",
                      fontSize: 100
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        )}
      </View>
    );
  }
}
