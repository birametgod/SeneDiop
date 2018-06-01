import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import Login from './components/login' ; 


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  deconnexion () {
    firebase.auth().signOut()
      .then((user)=> {
        console.log(user);
    })
      .catch((error)=>{
        alert(error);
      })
  }

  addUser(userNew){
    this.setState ({user : userNew});
  }

  render() {

    if (!this.state.user) {
      return <View style = {styles.view}>
      <Login userAdd = {this.addUser.bind(this)} />
    </View>;
    }

    return (
      <View >
        <Text>Welcome to my awesome app {this.state.user.email}!</Text>
        <Button onPress = {this.deconnexion} title = "deconnexion" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view : {
    flex : 1 ,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
},
});
