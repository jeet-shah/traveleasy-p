import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
      },
      shirttext:{
        fontSize:18,
        fontWeight:'bold',
        backgroundColor:'#F8BE85',
      },
      imagecontainer:{
        alignSelf:'flex-start',
        flexDirection:'row'
      },
      firstimage:{
        width:150,
        height:150,
      },
      radio:{
        marginLeft:50,
        marginTop:20
      },
      firstimage1:{
        width:150,
        height:150,
        marginTop:20
      },
      date: {
        marginTop: 50
      },
      focused: {
        color: 'blue'
      },
      button:{
        width:200,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      buttonText:{
        color:'#ffff',
        fontWeight:'200',
      },
      smallbutton:{
        width:100,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      date: {
        marginTop: 50
      },
      focused: {
        color: 'blue'
      }
})