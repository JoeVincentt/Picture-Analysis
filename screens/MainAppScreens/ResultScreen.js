import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Button,
  Footer
} from "native-base";
import { Text } from "react-native";
export default class ResultScreen extends Component {
  static navigationOptions = {
    header: null
    // headerStyle: {
    //   backgroundColor: "black"
    // },
    // headerTintColor: "#fff"
  };
  state = {
    generalAnalysis: this.props.navigation.getParam("generalAnalysis"),
    demographicAnalysis: this.props.navigation.getParam("demographicAnalysis")
  };
  render() {
    const { generalAnalysis, demographicAnalysis } = this.state;
    if (generalAnalysis != null) {
      return (
        <Container>
          <Content>
            <Header />
            <Button
              iconLeft
              primary
              full
              onPress={() => this.props.navigation.push("Camera")}
            >
              <Icon name="ios-repeat" style={{ right: 10 }} />
              <Text style={{ color: "white" }}>New Test</Text>
            </Button>
            <List>
              {this.state.generalAnalysis.map(i => (
                <ListItem key={i.id}>
                  <Left>
                    <Text>{i.name}</Text>
                  </Left>
                  <Right>
                    <Text>{(i.value * 100).toFixed(2)} %</Text>
                    <Icon active name="ios-checkmark-circle" />
                  </Right>
                </ListItem>
              ))}
            </List>
          </Content>
        </Container>
      );
    }

    if (demographicAnalysis != null) {
      return (
        <Container>
          <Content>
            <Header />
            <Button
              iconLeft
              primary
              full
              onPress={() => this.props.navigation.push("Camera")}
            >
              <Icon name="ios-repeat" style={{ right: 10 }} />
              <Text style={{ color: "white" }}>New Test</Text>
            </Button>
            <List>
              <ListItem itemDivider>
                <Text>Age</Text>
              </ListItem>
              {this.state.demographicAnalysis.age.map(i => (
                <ListItem key={i.id}>
                  <Left>
                    <Text>{i.name}</Text>
                  </Left>
                  <Right>
                    <Text>{(i.value * 100).toFixed(2)} %</Text>
                    <Icon active name="ios-checkmark-circle" />
                  </Right>
                </ListItem>
              ))}
              <ListItem itemDivider>
                <Text>Gender</Text>
              </ListItem>
              {this.state.demographicAnalysis.gender.map(i => (
                <ListItem key={i.id}>
                  <Left>
                    <Text>{i.name}</Text>
                  </Left>
                  <Right>
                    <Text>{(i.value * 100).toFixed(2)} %</Text>
                    <Icon active name="ios-checkmark-circle" />
                  </Right>
                </ListItem>
              ))}
              <ListItem itemDivider>
                <Text>Nation</Text>
              </ListItem>
              {this.state.demographicAnalysis.nation.map(i => (
                <ListItem key={i.id}>
                  <Left>
                    <Text>{i.name}</Text>
                  </Left>
                  <Right>
                    <Text>{(i.value * 100).toFixed(2)} %</Text>
                    <Icon active name="ios-checkmark-circle" />
                  </Right>
                </ListItem>
              ))}
            </List>
          </Content>
        </Container>
      );
    }
  }
}
