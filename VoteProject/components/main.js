import React from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Button,
    Text,
    View,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    deconnexion() {
        firebase
            .auth()
            .signOut()
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                alert(error);
            })
    }

    componentDidMount() {
        const {currentUser} = firebase.auth();
        this.setState({currentUser}) ;
    }

    render() {
        
        const {currentUser} = this.state
        if (currentUser === null) {
            
        }
        return (
            <View style={styles.container}>
                <Text>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <Button onPress= {()=> this.deconnexion()} title="dec"/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})