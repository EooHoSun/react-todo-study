import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center'
    },
    search : {
      position:"absolute",
      left:"5%", 
      width:"5%",
      height:"15%", 
      textAlignVertical:"center",
      textAlign:"center",
    },
    input : {
      flex:3,
      justifyContent : 'center',
      textAlign:'center',
      backgroundColor:"#CFBABD"
    },
    textInput : {
      marginLeft:"15%",
      width:'70%',
      height: '15%',
      backgroundColor:"#E4D8DA",
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10
      
    },
    enter : {
      position:"absolute",
      textAlignVertical:"center",
      height:"15%",
      right:"9.3%",
      backgroundColor:"#E4D8DA",
      borderTopRightRadius:10,
      borderBottomRightRadius:10
    },
  
  
  
  
  
  
  
  
  
  
  
  
    todos : {
      flex : 6,
      borderBottomWidth:1,
      backgroundColor: "#dae4d8"
    },
  
  
  
  
  
    todo : {
      width : "80%",
      left:"10%",
      borderRadius:10,
      marginTop:"2%",
      backgroundColor : "#afc5ab",
      paddingVertical : "2%",
      justifyContent:"center"
    },
  
  
    footer : {
      flex : 1,
    }
  });

  export {styles};