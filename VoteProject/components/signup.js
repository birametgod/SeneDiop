import React, {Component} from "react";
import
{
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
}
from "react-native";
import firebase from 'react-native-firebase';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    inscrire() {
        const email = this.state.email;
        const password = this.state.password;
        firebase
            .auth()
            .createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('main');
            })
            .catch((error) => {
                console.log('erreur' + error);
                alert(error);
            });
    }

    render() {
        return (
            <View style={styl.container}>
                <View style = {styl.view}>
                <Image style = {styl.logo}  source={require('./images/diamond.png')} />
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styl.txt}
                            placeholder=" Email "
                            keyboardType="email-address"
                            onChangeText=
                            {(text) => this.setState({ email : text })}/>

                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styl.txt}
                            placeholder=" Mot de passe "
                            secureTextEntry={true}
                            onChangeText=
                            {(text) => this.setState({ password : text })}/>

                        <TouchableOpacity
                            style={styl.buttonContainer}
                            onPress={this
                            .inscrire
                            .bind(this)}>
                            <Text style={styl.buttonText}>
                                Inscription
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    };
}

const styl = StyleSheet.create({
    container: {
        backgroundColor:"#3498db" ,
        flex:1,
    },
    view : {
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: "#2980B9",
        paddingVertical: 10,
        marginBottom: 10,
        width : 300
    },
    buttonContainerFb: {
        paddingVertical: 20,
        marginBottom: 10,
        width : 300
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    txt: {
        paddingHorizontal: 10,
        color: '#FFF',
        width : 300,
        marginBottom: 20,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    viewButton: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo : {
        width : 100 , 
        height : 100
    },
})