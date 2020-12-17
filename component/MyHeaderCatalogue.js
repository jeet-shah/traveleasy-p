import React, { Component} from 'react';
import { Header, Icon } from 'react-native-elements';

export default class MyHeaderCatalogue extends Component{

    render(){
        return(
            <Header
            leftComponent={<Icon color='#696969' name='arrow-circle-left' type='font-awesome' onPress={()=>{this.props.navigation.navigate('Catalogue')}} />}
            centerComponent={{ text: this.props.title, style: { color: 'black', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
            />
        )
    }
}