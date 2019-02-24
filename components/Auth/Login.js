import React, { Component } from "react";
import { fbkey } from "../../key";
import * as firebase from "firebase";
import firebaseConfig from "../../firebase";
firebase.initializeApp(firebaseConfig);

import { ScrollView, Button } from "react-native";
class Login extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // console.log(user);
        this.props.navigation("App");
      }
    });
  }

  FacebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(fbkey, {
        permissions: ["email", "public_profile"]
      });
      if (type === "success") {
        // Build Firebase credential with the Facebook access token.
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );

        // Sign in with credential from the Facebook user.
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(data => console.log(data))
          .catch(error => {
            // Handle Errors here.
            Alert.alert("Try Again");
          });

        this.props.navigation("App");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <ScrollView>
        <Button title="Facebook" onPress={() => this.FacebookLogIn()} />

        <Button
          title="Email && Password"
          onPress={() =>
            console.log(this.props.navigation("EmailPasswordLogin"))
          }
        />
      </ScrollView>
    );
  }
}

export default Login;
