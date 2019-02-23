import React, { Component } from "react";
import { fbkey } from "../../key";
import * as firebase from "firebase";
import firebaseConfig from "../../firebase";
firebase.initializeApp(firebaseConfig);

import { ScrollView, Button } from "react-native";
class Login extends Component {
  FacebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(fbkey, {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
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
