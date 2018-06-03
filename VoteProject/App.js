import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
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
      return (
      <View style = {styles.view}>
        <View style = {styles.logoContainer}>
          <Image style = {styles.logo}  source={require('./components/images/diamond.png')} />
          <Login userAdd = {this.addUser.bind(this)} />
        </View>
      </View>);
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
    backgroundColor: '#3498db',
},
logo : {
  width : 100 , 
  height : 100
},
logoContainer : {
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
}
});
