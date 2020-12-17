import React from 'react';
import { styles } from '../component/Styles';
import { Text, View, TouchableOpacity,Modal, FlatList, ScrollView, Alert,LogBox,DevSettings } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { WebView } from 'react-native-webview';
import { Icon, ListItem } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import RNRestart from "react-native-restart";

export default class Cart extends React.Component{

    constructor(){
        super()
        this.state={
            PantInfo:[],
            PantKey:[],
            PantPrice:0,
            ShirtInfo:[],
            ShirtKey:[],
            ShirtPrice:0,
            WatchInfo:[],
            WatchKey:[],
            WatchPrice:0,
            TieInfo:[],
            TieKey:[],
            TiePrice:0,
            SportInfo:[],
            SportKey:[],
            SportPrice:0,
            FormalInfo:[],
            FormalKey:[],
            FormalPrice:0,
            userID:firebase.auth().currentUser.email,
            showModal:false,
            Status:"Pending",
            TotalPrice:0,
            expoPushToken:'',
            docid1:'',
            refresh1:false
        }
    }

    registerForPushNotificationsAsync = async () => {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          this.setState({ expoPushToken: token });
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        };

    getrequesteditemPant = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Pant').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        var PantInfo = []
        var PantPrice = 0
        var Key = []
        snapshot.docs.map(doc => {
            var PantInfos = doc.data()
            PantInfo.push(PantInfos)
            PantPrice = PantInfo.reduce(( a, v ) => a = a + v.Price , 0)
            var Keys = doc.data().Key
            Key.push(Keys)
            this.setState({
                PantInfo:PantInfo,
                PantPrice:PantPrice,
                PantKey:Key
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
        await this.getrequesteditemPant()
        await this.getrequesteditemFormal()
        await this.getrequesteditemShirt()
        await this.getrequesteditemSport()
        await this.getrequesteditemTie()
        await this.getrequesteditemWatch()
        await this.registerForPushNotificationsAsync()
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }

    handleResponse = async(data) => {
        if(data.title === 'success'){
            this.setState({Status:'Complete',showModal:false})
            await this.sendPushNotification()
            await this.paymentstatus()
            this.props.navigation.navigate('City')
        }else if(data.title === 'cancel'){
            this.setState({Status:'Cancel',showModal:false})
        }else{
            return;
        }
    }

    paymentstatus = async() => {
        db.collection('Cart').doc(this.state.userID).set({
            "PaymentStatus":"Success"
        })
    }

    sendPushNotification = async() => {
        const message = {
            to:this.state.expoPushToken,
            sound:'default',
            title:'Travel Easy',
            body:'Payment Successful'
        };
        await fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
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
            <Icon name="trash" type="font-awesome-5" size={30} onPress={async()=>{
                const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Pant').where("userID","==",this.state.userID);
                const snapshot = await citiesRef.get();
                var PantInfo = []
                snapshot.docs.map(doc => {
                    var PantInfos = doc.data()
                    PantInfo.push(PantInfos)
                })
                if(PantInfo.filter(items => item.PantName === items.PantName && items.PantSize === item.PantSize)){
                    db.collection('Cart').doc(this.state.userID).collection('Pant').where("PantSize","==",item.PantSize).get()
                    .then(snapshots => {
                        snapshots.docs.forEach(doc => {
                            let docid = doc.id
                            this.setState({docid1:docid})
                        })
                        db.collection('Cart').doc(this.state.userID).collection('Pant').doc(this.state.docid1).delete()
                    })
                }
                setTimeout(()=>{
                    this.props.navigation.replace('Cart')
                },2000)
            }} />
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
                    <View style={{flexDirection:'row'}}>
                    </View>
                    <Modal
                    visible={this.state.showModal}
                    onRequestClose={()=>{this.setState({showModal:false})}}
                    >
                        <WebView
                        source={{uri:"http://192.168.1.108:3000"}}
                        onNavigationStateChange={data => this.handleResponse(data)}
                        injectedJavaScript={()=>{
                            `document.getElementById('price').value=this.state.TotalPrice;
                            document.getElementById('currency').value="INR";
                            document.getElementById('total').value=totalprice;
                            document.f1.submit();`
                        }}
                        />
                    </Modal>
                    <View style={{width:300}}>
                        <FlatList 
                            data={this.state.PantInfo}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                            scrollEnabled={false}
                            extraData={this.state}  
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
                    <Text style={{fontSize:22,fontWeight:'bold'}}></Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        if(parseInt(this.state.PantPrice + this.state.ShirtPrice + this.state.WatchPrice + this.state.TiePrice + this.state.SportPrice + this.state.FormalPrice) === 0){
                            Alert.alert("Please Choose An Item First")
                        }else{
                            this.setState({showModal:true})
                        } 
                    }}>
                        <Text style={styles.buttonText}>Pay</Text>
                    </TouchableOpacity>
                    <Text>Payment Status: {this.state.Status}</Text>
                    <Text>
                        Total Price: {parseInt(this.state.PantPrice + this.state.ShirtPrice + this.state.WatchPrice + this.state.TiePrice + this.state.SportPrice + this.state.FormalPrice)}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}