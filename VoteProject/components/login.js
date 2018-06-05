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
import FBLoginButton from "./fbLoggin";
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        GoogleSignin
            .configure({})
            .then(() => {
                // you can now call currentUserAsync()
                GoogleSignin
                    .currentUserAsync()
                    .then((user) => {
                        this.props.userAdd(user);
                    })
                    .done();
            });
    }

    connexion() {
        const email = this.state.email;
        const password = this.state.password;
        firebase
            .auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                alert(error);
            })
    }

    signIn() {
        GoogleSignin
            .signIn()
            .then((user) => {
                this
                    .props
                    .userAdd(user);
                console.log(user);
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    inscrire() {
        const email = this.state.email;
        const password = this.state.password;
        firebase
            .auth()
            .createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then((user) => {
                this
                    .props
                    .userAdd(user);
                console.log(user);
            })
            .catch((error) => {
                console.log('erreur' + error);
                alert(error);
            });
    }

    googleConnexion = () => {
        GoogleSignin
            .signIn()
            .then(data => {
                // create a new firebase credential with the token
                const credential = firebase
                    .auth
                    .GoogleAuthProvider
                    .credential(data.idToken, data.accessToken);
                // login with credential
                return firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential);
            })
            .then((currentUser) => {
                console.info(JSON.stringify(currentUser.user.toJSON()))
            })
            .catch((error) => {
                alert(error);
            })
    }

    facebookLogin = () => {
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('User cancelled request')); // Handle this however fits the flow of your app
                }

                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

                // get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                // create a new firebase credential with the token
                const credential = firebase
                    .auth
                    .FacebookAuthProvider
                    .credential(data.accessToken);

                // login with credential
                return firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential);
            })
            .then((currentUser) => {
                console.info(JSON.stringify(currentUser.user.toJSON()))
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {
        return (
            <View style={styl.container}>
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
                <TouchableOpacity
                    placeholderTextColor="rg"
                    style={styl.buttonContainer}
                    onPress={this
                    .connexion
                    .bind(this)}>
                    <Text style={styl.buttonText}>
                        connexion</Text>
                </TouchableOpacity>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={(error, result) => {
                    if (error) {
                        alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        alert("login is cancelled.");
                    } else {
                        AccessToken
                            .getCurrentAccessToken()
                            .then((data) => {
                                alert(data.accessToken.toString())
                            })
                    }
                }}
                    onLogoutFinished={() => alert("logout.")}
                    style={styl.buttonContainerFb}/>

                <GoogleSigninButton
                    style={styl.buttonContainerFb}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this
                    .googleConnexion
                    .bind(this)}/>

            </View>
        )
    };
}

const styl = StyleSheet.create({
    container: {
        padding: 20,
        width: 300
    },
    buttonContainer: {
        backgroundColor: "#2980B9",
        paddingVertical: 10,
        marginBottom: 10
    },
    buttonContainerFb: {
        paddingVertical: 20,
        marginBottom: 10
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
        marginBottom: 20,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    viewButton: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
