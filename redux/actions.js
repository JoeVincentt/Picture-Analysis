import * as firebase from "firebase";

export const FacebookLogIn = async () => {
  try {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      fbkey,
      {
        permissions: ["email", "public_profile"]
      }
    );
    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        //Log user data below
        // .then(data => console.log(data))
        .catch(error => {
          // Handle Errors here.
          Alert.alert("Try Again");
        });

      this.props.navigation.navigate("App");
    } else {
      // type === 'cancel'
      this.setState({ isLoading: false });
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export function logout() {
  return function(dispatch) {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT", loggedIn: false });
  };
}
