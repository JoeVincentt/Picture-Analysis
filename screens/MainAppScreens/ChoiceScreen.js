import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { Button, Content, Spinner } from "native-base";
import { FileSystem } from "expo";
import { ClarifaiSDK } from "../../clarifai";

export default class ChoiceScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "black"
    },
    headerTintColor: "#fff"
  };
  state = {
    isLoading: false,
    capturedPhoto: this.props.navigation.getParam("pictureData"),
    generalAnalysis: null,
    demographicAnalysis: null
  };

  predictPicture = async (demographic, general) => {
    // console.log(this.state.capturedPhoto);
    this.setState({ isLoading: true });
    const base64pic = await FileSystem.readAsStringAsync(
      this.state.capturedPhoto,
      { encoding: FileSystem.EncodingTypes.Base64 }
    );

    if (demographic) {
      ClarifaiSDK.models
        .predict("c0c0ac362b03416da06ab3fa36fb58e3", { base64: base64pic })
        .then(
          response => {
            // do something with response
            if (Object.entries(response.outputs[0].data).length !== 0) {
              this.setState({
                isLoading: false,
                demographicAnalysis: {
                  age:
                    response.outputs[0].data.regions[0].data.face.age_appearance
                      .concepts,
                  gender:
                    response.outputs[0].data.regions[0].data.face
                      .gender_appearance.concepts,
                  nation:
                    response.outputs[0].data.regions[0].data.face
                      .multicultural_appearance.concepts
                }
              });
              this.props.navigation.navigate("Result", {
                demographicAnalysis: this.state.demographicAnalysis
              });
            } else {
              this.setState({ isLoading: false });
              this.props.navigation.push("Camera");
              console.log("face not found");
            }
          },
          err => {
            // there was an error
            this.setState({ isLoading: false });
            console.log(err);
          }
        );
    }
    if (general) {
      ClarifaiSDK.models
        .predict(Clarifai.GENERAL_MODEL, { base64: base64pic })
        .then(
          response => {
            // do something with response
            this.setState({
              isLoading: false,
              generalAnalysis: response.outputs[0].data.concepts
            });
            this.props.navigation.navigate("Result", {
              generalAnalysis: this.state.generalAnalysis
            });
            console.log(response.outputs[0].data.concepts);
          },
          err => {
            // there was an error
            this.setState({ isLoading: false });
            console.log(err);
          }
        );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ height: "100%", width: "100%" }}
          source={{ uri: this.state.capturedPhoto }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            {this.state.isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Spinner />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: 80
                }}
              >
                <Button
                  style={{ marginBottom: 30 }}
                  block
                  success
                  onPress={demographic => this.predictPicture(demographic)}
                >
                  <Text>Demographics</Text>
                </Button>
                <Button
                  block
                  danger
                  onPress={general => this.predictPicture(null, general)}
                >
                  <Text>General</Text>
                </Button>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
