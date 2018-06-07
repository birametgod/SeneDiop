import React, {Component} from "react";
import 
{
    ActivityIndicator, 
    View,
    Text,
    StyleSheet,
} 
from "react-native";
import firebase from 'react-native-firebase';

export default class Loading extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.props.navigation.navigate(user ? 'main' : 'Log')
        });
    }
    

    render() {
        return (
            <View style = {styles.container}>
                <Text> Loading</Text>
                <ActivityIndicator size="large"/>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})