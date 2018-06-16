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
    Badge,
    
}
from 'native-base';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            name : '' ,
            sujet : []
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
        this.setState({currentUser});
        this.setState({name : currentUser.displayName}) ;
        firebase.database().ref("/Sujet/"+currentUser.uid).on('value' , (nom)=>{
            if (nom.val()) {
                this.setState({name : nom.val().name}) ;
            }
        });
    }
    
    render() {
        return (

            <Container>
                <Header style = {styles.headerColor} >
                    <Body>
                        <Title>{this.state.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='navigate'/>
                        </Button>
                        <Button transparent onPress = {()=> this.props.navigation.navigate('soumission',{name : this.state.name})} >
                            <Icon name="chatbubbles"/>
                        </Button>
                        <Button transparent onPress = {()=> this.deconnexion()} >
                            <Icon name='close'  />
                        </Button>
                    </Right>
                </Header>
                <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('./images/vot.png')}  />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy j,sljfslfjsflj sfpjfs sfjsf</Text>
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
            </ListItem>
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
    cont :{
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon : {
        color : "#ff4081",
        fontSize: 40,
    },
    unlike : {
        color : "#212121",
        fontSize: 40,
    },
    headerColor:{
        backgroundColor: '#3498db'
      },
})