import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
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
    Badge
}
from 'native-base';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sujet: [],
            currentUser: null,
            name: '',
            email: ""
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

    

    componentWillMount() {
        const {currentUser} = firebase.auth();
        const subject = this.state.sujet;
        this.setState({currentUser});
        firebase
            .database()
            .ref('posts/')
            .on('value', (snapshot) => {
                /*if (sujet.val()) {
                this.setState({name : sujet.val().name}) ;
                //alert(sujet.val().name);
                sujet.forEach(element => {
                    alert(element.val().description);
                });
            }*/

                if (snapshot.val()) {
                    snapshot.forEach(childSnapshot => {
                        subject.push({
                            desc: childSnapshot
                                .val()
                                .description,
                            titre: childSnapshot
                                .val()
                                .titre,
                            Date: childSnapshot
                                .val()
                                .Date,
                            nom: childSnapshot
                                .val()
                                .name
                        });
                        this.setState({sujet: subject});
                        //this.setState({name : childSnapshot.val().name}) ;
                    })

                }

            });

        this.setState({name: currentUser.displayName});

        //firebase.database().ref("/Sujet/").on('value',(sujet)=>{    alert(sujet); })
    }

    render() {
        return (

            <Container>
                <Header style={styles.headerColor}>
                    <Body>
                        <Title>{this.state.name}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress=
                            {()=> this.props.navigation.navigate('profil',{name : this.state.name})}>
                            <Icon name='navigate'/>
                        </Button>
                        <Button
                            transparent
                            onPress=
                            {()=> this.props.navigation.navigate('soumission',{name : this.state.name})}>
                            <Icon name="chatbubbles"/>
                        </Button>
                        <Button transparent onPress= {()=> this.deconnexion()}>
                            <Icon name='close'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List
                        dataArray={this.state.sujet}
                        renderRow=
                        {(item) => <ListItem avatar> 
                        <Left>
                            <Thumbnail source={require('./images/vot.png')} /> 
                        </Left>
                        <Body>
                            <Text>{item.nom}</Text>
                            <Text>{item.titre}</Text>
                            <Text note>{item.desc}</Text>
                        </Body>
                        <Right style={styles.cont}>
                            <Button transparent badge vertical>
                            <Badge style={{ backgroundColor: '#ff4081' }}><Text style={{ color: 'white' ,fontWeight:'bold'}}>2</Text></Badge>
                            <Icon name = 'heart' style ={styles.icon} />
                            </Button>
                            <Button transparent badge vertical>
                            <Badge style={{ backgroundColor: '#212121' }}><Text style={{ color: 'white' ,fontWeight:'bold'}}>2</Text></Badge>
                            <Icon name = 'trash' style ={styles.unlike}  />
                            </Button>
                        </Right> 
                        </ListItem> }>
                        </List>
                    </Content>
                </Container>

        )
    }
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
