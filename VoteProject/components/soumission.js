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
        }
    }

    onValidate(){
        let {titre , description } = this.state ;

        firebase.database().ref('Personne').push({
            titre : titre , 
            description : description , 
            Date : new Date()
        })
        .then((success) => {
            this.setState({description : ""});
            ToastAndroid.show('Sujet envoyé', ToastAndroid.SHORT);
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
        )
    };
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