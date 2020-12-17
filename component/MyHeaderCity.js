import React, { Component } from 'react';
import { Header } from 'react-native-elements';

export default class MyHeader extends Component{

    render(){
        return(
            <Header
                centerComponent={{ text: this.props.title, style: { color: 'black', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#eaf8fe"
            />
        )
    }
}