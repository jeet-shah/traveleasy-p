import React from 'react';
import { styles } from '../component/Styles';
import { Text, View, TouchableOpacity,Modal, FlatList, ScrollView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { WebView } from 'react-native-webview';
import { ListItem } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export default class MyOrder extends React.Component{

    constructor(){
        super()
        this.state={
            PantInfo:[],
            PantPrice:0,
            ShirtInfo:[],
            ShirtPrice:0,
            WatchInfo:[],
            WatchPrice:0,
            TieInfo:[],
            TiePrice:0,
            SportInfo:[],
            SportPrice:0,
            FormalInfo:[],
            FormalPrice:0,
            userID:firebase.auth().currentUser.email
        }
    }

    getrequesteditemPant = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Pant').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var PantInfo = []
        var PantPrice = 0
        snapshot.docs.map(doc => {
            var PantInfos = doc.data()
            PantInfo.push(PantInfos)
            PantPrice = PantInfo.reduce(( a, v ) => a = a + v.Price , 0)
            this.setState({
                PantInfo:PantInfo,
                PantPrice:PantPrice
            })
        });
    }

    getrequesteditemShirt = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Shirts').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var ShirtInfo = []
        var ShirtPrice = 0
        snapshot.docs.map(doc => {
            var ShirtInfos = doc.data()
            ShirtInfo.push(ShirtInfos)
            ShirtPrice = ShirtInfo.reduce((a,v) => a = a+v.Price,0)
            this.setState({
                ShirtInfo:ShirtInfo,
                ShirtPrice:ShirtPrice
            })
        });
    }

    getrequesteditemWatch = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Watch').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var WatchInfo = []
        var WatchPrice = 0
        snapshot.docs.map(doc => {
            var WatchInfos = doc.data()
            WatchInfo.push(WatchInfos)
            WatchPrice = WatchInfo.reduce((a,v)=>a = a+v.Price,0)
            this.setState({
                WatchInfo:WatchInfo,
                WatchPrice:WatchPrice
            })
        });
    }

    getrequesteditemTie = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Tie').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var TieInfo = []
        var TiePrice = 0
        snapshot.docs.map(doc => {
            var TieInfos = doc.data()
            TieInfo.push(TieInfos)
            TiePrice = TieInfo.reduce((a,v)=>a = a+v.Price,0)
            this.setState({
                TieInfo:TieInfo,
                TiePrice:TiePrice
            })
        });
    }

    getrequesteditemSport = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Sport').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var SportInfo = []
        var SportPrice = 0
        snapshot.docs.map(doc => {
            var SportInfos = doc.data()
            SportInfo.push(SportInfos)
            SportPrice = SportInfo.reduce((a,v)=>a = a+v.Price,0)
            this.setState({
                SportInfo:SportInfo,
                SportPrice:SportPrice
            })
        });
    }

    getrequesteditemFormal = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Formal').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var FormalInfo = []
        var FormalPrice = 0
        snapshot.docs.map(doc => {
            var FormalInfos = doc.data()
            FormalantInfo.push(FormalInfos)
            FormalPrice = FormalInfo.reduce((a,v)=>a = a+v.Price,0)
            this.setState({
                FormalInfo:FormalInfo,
                FormalPrice:FormalPrice
            })
        });
    }

    async componentDidMount(){
        this.getrequesteditemPant()
        this.getrequesteditemFormal()
        this.getrequesteditemShirt()
        this.getrequesteditemSport()
        this.getrequesteditemTie()
        this.getrequesteditemWatch()
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => {
        return(
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>Item: {item.PantName}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Quantity: {item.PantQuantity}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Rate: {item.Rate}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Size: {item.PantSize}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Price: {item.Price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
    }

    keyExtractor1 = (item, index) => index.toString()
    renderItem1 = ({ item }) => {
        return(
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>Item: {item.ShirtName}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Quantity: {item.ShirtQuantity}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Rate: {item.Rate}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Size: {item.ShirtSize}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Price: {item.Price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
    }

    keyExtractor2 = (item, index) => index.toString()
    renderItem2 = ({ item }) => {
        return(
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>Item: Item: {item.WatchName}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Quantity: {item.WatchQuantity}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Rate: {item.Rate}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Size: {item.WatchSize}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Price: {item.Price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
    }

    keyExtractor3 = (item, index) => index.toString()
    renderItem3 = ({ item }) => {
        return(
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>Item: {item.TieName}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Quantity: {item.TieQuantity}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Rate: {item.Rate}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Size: {item.TieSize}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Price: {item.Price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
    }

    keyExtractor4 = (item, index) => index.toString()
    renderItem4 = ({ item }) => {
        return(
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>Item: {item.SportName}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Quantity: {item.SportQuantity}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Rate: {item.Rate}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Size: {item.SportSize}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Price: {item.Price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
    }

    keyExtractor4 = (item, index) => index.toString()
    renderItem4 = ({ item }) => {
        return(
          <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold',fontSize:18,color:'black'}}>Item: {item.FormalName}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Quantity: {item.FormalQuantity}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Rate: Rate: {item.Rate}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Size: {item.FormalSize}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontSize:18,color:'black'}}>Price: {item.Price}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.PantInfo}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.ShirtInfo}
                            keyExtractor={this.keyExtractor1}
                            renderItem={this.renderItem1}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.WatchInfo}
                            keyExtractor={this.keyExtractor2}
                            renderItem={this.renderItem2}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.TieInfo}
                            keyExtractor={this.keyExtractor3}
                            renderItem={this.renderItem3}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.SportInfo}
                            keyExtractor={this.keyExtractor4}
                            renderItem={this.renderItem4}
                            scrollEnabled={false}
                        />
                    </View>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.FormalInfo}
                            keyExtractor={this.keyExtractor5}
                            renderItem={this.renderItem5}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}