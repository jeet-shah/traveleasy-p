import React, { Component } from 'react';
import { Text, View,TouchableOpacity,Modal, Alert } from 'react-native';
import { styles } from '../component/Styles';
import Dates from 'react-native-dates';
import moment from 'moment';
import firebase from 'firebase';
import db from '../config';


 
export default class DateScreen extends Component {
  constructor(props){
    super(props)
    this.state = {data:null,focus:'startDate',startDate:null,enddDate:null,isModalVisible:'false',userid:firebase.auth().currentUser.email,getnoofdays:0}
  }

  showmodal = () => {
    return(
      <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
        <View style={{width:300,marginLeft:40,marginTop:250}}>
          <Dates
            onDatesChange={this.onDatesChange}
            isDateBlocked={this.isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            range
          />
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={[styles.smallbutton,{marginLeft:80}]} onPress={this.getnoofdays} >
          <Text>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.smallbutton,{marginLeft:20}]} onPress={()=>{this.setState({isModalVisible:false})}}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    )
  }
  getnoofdays = () => {
    var msDiff = new Date(this.state.endDate).getTime() - new Date(this.state.startDate).getTime();  
    var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;
    this.setState({
      getnoofdays:daysTill30June2035,
      isModalVisible:false
    },()=>{
      if(this.state.getnoofdays < 0){
        this.setState({
          getnoofdays:1
        })
      }
    })
  }
  isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');
 
    onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );
 
    onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });
  render(){
    return (
      <View style={styles.container}>
        {this.showmodal()}
        <TouchableOpacity style={[styles.button,{marginTop:20}]} onPress={()=>{this.setState({isModalVisible:true})}}>
          <Text style={styles.buttonText}>Date Picker</Text>
        </TouchableOpacity>
      <Text> {this.state.getnoofdays} </Text>
         <TouchableOpacity onPress={()=>{
           if(this.state.getnoofdays < 5){
             Alert.alert("Minimum No of Days Shall Be 5")
           }else{
            this.props.navigation.navigate('Catalogue')
            db.collection("DatesCities").add({
            "Start_Date":this.state.startDate && this.state.startDate.format('LL'),
            "End_Date":this.state.endDate && this.state.endDate.format('LL'),
            "User_Id":this.state.userid
            })
            }
           }} style={[styles.button,{marginTop:20}]}>
           <Text style={styles.buttonText}> Next </Text>
         </TouchableOpacity>
      </View>
    )
  }
}