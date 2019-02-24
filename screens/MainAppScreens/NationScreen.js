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

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    isCapturing: false,
    accessCameraLabel: "Start",
    capturedPhoto: null,
    pictureAnalysis: []
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

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

  predictPicture = async () => {
    // console.log(this.state.capturedPhoto);
    const base64pic = await FileSystem.readAsStringAsync(
      this.state.capturedPhoto,
      { encoding: FileSystem.EncodingTypes.Base64 }
    );
    // console.log(base64pic);

    ClarifaiSDK.models
      .predict(Clarifai.GENERAL_MODEL, { base64: base64pic })
      .then(
        response => {
          // do something with response
          this.setState({ pictureAnalysis: response.outputs[0].data.concepts });
          console.log(response.outputs[0].data.concepts);
        },
        function(err) {
          // there was an error
          console.log(err);
        }
      );
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.photoGroup}>
            {!this.state.isCapturing ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center"
                }}
              >
                {!this.state.capturedPhoto ? (
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.headerText}>Hello!</Text>
                  </View>
                ) : (
                  <Image
                    style={{ height: "100%", width: "100%" }}
                    source={{ uri: this.state.capturedPhoto }}
                  />
                )}
              </View>
            ) : (
              <View style={{ height: "100%", width: "100%" }}>
                <Camera
                  style={{ height: "100%", width: "100%" }}
                  ref={ref => {
                    this.camera = ref;
                  }}
                  type={Camera.Constants.Type.back}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.CameraButton}
            onPress={() => this.accessCamera()}
          >
            <Text>{this.state.accessCameraLabel}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.CameraButton}
            onPress={() => this.predictPicture()}
          >
            <Text>See Nationality</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={styles.CameraButton}
            onPress={() => console.log(this.state.pictureAnalysis)}
          >
            <Text>State</Text>
          </TouchableOpacity>
        </View>
        {/* {this.state.capturedPhoto ? (
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: `${this.state.capturedPhoto}` }}
          />
        ) : null} */}
        {this.state.pictureAnalysis
          ? this.state.pictureAnalysis.map(i => (
              <Text key={i.id}>{i.name}</Text>
            ))
          : null}
      </ScrollView>
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