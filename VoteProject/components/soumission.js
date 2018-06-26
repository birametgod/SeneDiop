import React, {Component} from 'react';
import {StyleSheet, Platform, Image, Text, View , ToastAndroid} from 'react-native';
import {StackNavigator} from "react-navigation";
import firebase from 'react-native-firebase';
import
{
    Container,
    Header,
    Left,
    Body,
    Title,
    Right,
    Content,
    Item,
    Input,
    Icon,
    Footer,
    FooterTab,
    Button,
    List,
    ListItem,
    Thumbnail,
    Badge,
    Form,
    Textarea
}
from 'native-base';

export default class Soumission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: '',
            description : '',
            currentUser : '',
            nameUser : '',
        }
    }

    componentDidMount() {
        const {currentUser} = firebase.auth();
        this.setState({currentUser : currentUser.uid});
        this.setState({nameUser : currentUser.displayName});
    
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

    onValidate(){
        let {titre , description } = this.state ;
        var postData = {
            name : this.props.navigation.state.params.name,
            titre : titre , 
            description : description , 
            Date : new Date(),
        }
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/Sujet/' + this.state.currentUser + '/' + newPostKey] = postData;

        //return firebase.database().ref().update(updates);

        firebase.database().ref().update(updates)
        .then((success) => {
            this.setState({description : ""});
            ToastAndroid.show('Sujet envoyé', ToastAndroid.SHORT);
            this.props.navigation.navigate('main',{name : this.state.name})
        })
        .catch((error) => {
            alert(error);
        })

    }

    

    render() {
        return (
            <Container>
                <Header style={styles.headerColor}>
                    <Body>
                        <Title>{this.props.navigation.state.params.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='navigate'/>
                        </Button>
                        <Button
                            transparent
                            onPress=
                            {()=> this.props.navigation.navigate('soumission')}>
                            <Icon name="chatbubbles"/>
                        </Button>
                        <Button transparent onPress= {()=> this.deconnexion()}>
                            <Icon name='close'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Item>
                        <Input placeholder='Titre' onChangeText = {(text) => this.setState({titre : text})} />
                    </Item>
                    <Content padder>
                        <Form>
                            <Icon active name='chatboxes'/>
                            <Textarea rowSpan={5} bordered placeholder="Description" onChangeText = {(text)=>this.setState({description : text})} />
                        </Form>
                    </Content>
                    <Button block success 
                        onPress = {
                            this.onValidate.bind(this)}>
                        <Text>Valider</Text>
                    </Button>
                </Content>
            </Container>
        )}
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cont: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        color: "#ff4081",
        fontSize: 40
    },
    unlike: {
        color: "#212121",
        fontSize: 40
    },
    headerColor: {
        backgroundColor: '#3498db'
    }
})