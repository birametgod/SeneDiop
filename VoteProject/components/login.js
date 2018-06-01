import React, {Component} from 'react';
import
{
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View
    ,Button
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
                    style = {styl.txt} placeholder = "Entrez Votre Email "
                    keyboardType = "email-address"
                    onChangeText = {(text) => this.setState({ email : text })} />

                <TextInput underlineColorAndroid='transparent'
                    style = {styl.txt} placeholder = "Entrez Votre Mot de passe "
                    secureTextEntry = {true}
                    onChangeText = {(text) => this.setState({ password : text })} />

                <View style = {styl.viewButton}>
                    <Button  color="#a2273C"  title = "S'inscrire" 
                        onPress={this.inscrire.bind(this)} />
                    <Button color="#a2273C"  title = "Se Connecter" 
                        onPress = {this.connexion.bind(this)} />
                </View>
                
            </View>
        )
    };
}

const styl = StyleSheet.create({
    container : {
        marginTop: 20,
    },
    txt : {
        padding: 10,
        borderColor : 'gray',
        borderWidth: 1,
        margin: 10,
        width : 200,
        height : 40
    },
    viewButton: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
