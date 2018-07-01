import React from 'react';
import {StyleSheet, Platform, Image, Text, View, FlatList} from 'react-native';
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
            name : '',
            subjects : [], 
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

    componentWillMount(){
        const {currentUser} = firebase.auth() ; 
        const name = currentUser.displayName ; 
        this.setState({name}) ;
    }

    increaseVote(index,key,like){
        const post = firebase.database().ref('posts/'+key) ; 
        post.update({ likes : like+1 });
    }

    decreaseVote(index,key,unlike){
        const post = firebase.database().ref('posts/'+key) ; 
        post.update({ unlikes : unlike+1 });
    }


    componentDidMount() {
        const sujets = firebase.database().ref('posts');
        sujets.on('value',(snapshot)=>{
            const data = snapshot.val() ;
            
            if (data === null) {
                return array = []
            }
            let array = [] ;
            for (const key of Object.keys(data)) {
                    let value = data[key];
                    value.id = key
                    array.push(value) ; 
            }
            this.setState({subjects : array});
        })
    }

    render() {
        const {subjects} = this.state;
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
                    <Text style={styles.title}>Tous les sujets [{subjects.length}]</Text>
                    <List dataArray = {subjects} 
                            renderRow = {(item , sectionId , rowId)=> 
                                <ListItem avatar > 
                        <Left>
                            <Thumbnail source={require('./images/vot.png')} /> 
                        </Left>
                        <Body>

                            <Text>{item.titre}</Text>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                        <Right style={styles.cont}>
                            <Button transparent badge vertical  >
                            <Badge style={{ backgroundColor: '#ff4081' }}><Text style={{ color: 'white' ,fontWeight:'bold'}}>{item.likes}</Text></Badge>
                            <Icon name = 'heart' style ={styles.icon} onPress = {()=> this.increaseVote(rowId , item.id ,item.likes)} />
                            </Button>
                            <Button transparent badge vertical  >
                            <Badge style={{ backgroundColor: '#212121' }}><Text style={{ color: 'white' ,fontWeight:'bold'}}>{item.unlikes}</Text></Badge>
                            <Icon name = 'trash' style ={styles.unlike}  onPress = {()=> this.decreaseVote(rowId , item.id ,item.unlikes)} />
                            </Button>
                        </Right> 
                        </ListItem>
                            }> 
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
