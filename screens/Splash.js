import React,{Component}from 'react';
import { View,ActivityIndicator} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { styles } from '../component/Styles';

export default class Splash extends Component{
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}