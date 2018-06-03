import React, {Component} from 'react';
import
{
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity
}
from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    connexion() {
        const email = this.state.email ;
        const password = this.state.password ; 
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email,password)
            .then((user)=>{
                console.log(user);
            }).catch((error)=> {
                alert(error);
            })
    }

    inscrire () {
        const email = this.state.email ;
        const password = this.state.password ; 
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email,password)
            .then((user)=> {
                this.props.userAdd(user) ;
                console.log(user);
            }).catch((error)=>{
                console.log('erreur'+error);
                alert(error);
            });
    }

    render() {
        return (
            <View style={styl.container} >
                <TextInput underlineColorAndroid='transparent'
                    placeholderTextColor= "rgba(255,255,255,0.7)"
                    style = {styl.txt} placeholder = " Email "
                    keyboardType = "email-address"
                    onChangeText = {(text) => this.setState({ email : text })} />

                <TextInput underlineColorAndroid='transparent'
                    placeholderTextColor= "rgba(255,255,255,0.7)"
                    style = {styl.txt} placeholder = " Mot de passe "
                    secureTextEntry = {true}
                    onChangeText = {(text) => this.setState({ password : text })} />

                
                    <TouchableOpacity  style = {styl.buttonContainer} onPress={this.inscrire.bind(this)}>
                        <Text style = {styl.buttonText}> S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity placeholderTextColor= "rg" style = {styl.buttonContainer} onPress={this.connexion.bind(this)} >
                        <Text style = {styl.buttonText}> Se Connecter</Text>
                    </TouchableOpacity>
                    
                
                
            </View>
        )
    };
}

const styl = StyleSheet.create({
    container : {
        padding: 20,
        width : 300,
    },
    buttonContainer : {
        backgroundColor: "#2980B9",
        paddingVertical: 10,
        marginBottom: 10,
    },
    buttonText : {
        textAlign : 'center',
        color : '#FFF' ,
        fontSize: 20,
        fontWeight : 'bold',
    },
    txt : {
        paddingHorizontal: 10,
        color : '#FFF' ,
        marginBottom: 20,
        height : 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    viewButton: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
})
