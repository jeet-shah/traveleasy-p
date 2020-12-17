import React, { Component } from 'react';
import { Header,Icon } from 'react-native-elements';

export default class MyHeader extends Component{

    render(){
        return(
            <Header
                centerComponent={{ text: this.props.title, style: { color: 'black', fontSize:20,fontWeight:"bold", } }}
                rightComponent={ <Icon color='#696969' name='shopping-cart' type='font-awesome' size={30} onPress={()=>{this.props.navigation.navigate('MyOrder')}} /> }
                backgroundColor = "#eaf8fe"
            />
        )
    }
}