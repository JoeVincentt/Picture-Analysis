import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image
} from "react-native";
import { Camera, Permissions, FileSystem } from "expo";
import { ClarifaiSDK } from "../../clarifai";
import * as firebase from "firebase";
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Button
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class App extends React.Component {
  // static navigationOptions = {
  //   header: null
  // };
  state = {
    hasCameraPermission: null,
    isCapturing: false,
    accessCameraLabel: "Start",
    capturedPhoto: null,
    pictureAnalysis: [],
    type: Camera.Constants.Type.back
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
        >
          <Header
            searchBar
            rounded
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
            <View style={{ flexDirection: "row", flex: 4 }}>
              <Icon name="logo-snapchat" style={{ color: "white" }} />
              <Item style={{ backgroundColor: "transparent" }}>
                <Icon
                  name="ios-search"
                  style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                />

                <Input placeholder="Search" placeholderTextColor="white" />
              </Item>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 2,
                justifyContent: "space-around"
              }}
            >
              <Icon
                name="ios-flash"
                style={{ color: "white", fontWeight: "bold" }}
              />
              <Icon
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
                name="ios-reverse-camera"
                style={{ color: "white", fontWeight: "bold" }}
              />
            </View>
          </Header>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              marginBottom: 15,
              alignItems: "flex-end"
            }}
          >
            <MaterialCommunityIcons
              name="message-reply"
              style={{ color: "white", fontSize: 36 }}
            />

            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons
                name="circle-outline"
                style={{ color: "white", fontSize: 100 }}
              />
              <Icon
                name="ios-images"
                style={{ color: "white", fontSize: 36 }}
              />
            </View>
            <MaterialCommunityIcons
              name="google-circles-communities"
              style={{ color: "white", fontSize: 36 }}
            />
          </View>
        </Camera>
      </View>
      //   <View style={{ flex: 1, height: "100%", width: "100%" }}>
      //     <Camera
      //       style={{ height: "100%", width: "100%" }}
      //       ref={ref => {
      //         this.camera = ref;
      //       }}
      //       type={this.state.type}
      //     >
      //       <View style={{ marginBottom: "auto", marginTop: "auto" }}>
      //         <TouchableOpacity
      //           style={styles.CameraButton}
      //           onPress={() => this.flipCamera()}
      //         >
      //           <Text>Flip</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={styles.CameraButton}
      //           onPress={() => this.accessCamera()}
      //         >
      //           <Text>{this.state.accessCameraLabel}</Text>
      //         </TouchableOpacity>
      //       </View>
      //     </Camera>
      //   </View>
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
