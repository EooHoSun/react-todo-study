import React,{useEffect, useState,createContext,useContext,useReducer } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView , FlatList } from 'react-native';
import axios from 'axios';
import { AntDesign,Ionicons,FontAwesome5,Entypo,MaterialCommunityIcons   } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos : state.todos.concat(action.todo)
      };
    case 'INIT_TODO' : 
      return {
        todos : action.todos
      };
    default:
      return state;
  }
}
const TodosContext = createContext({
  todos:[]
});

const Input = ({navigation}) => {
  const [desc, setDesc] = useState('');
  const state = useContext(TodosContext);
  const [todos, dispatch] = useReducer(reducer, state);

  const handleInput = async (e) => {
    if(!desc) Alert.alert('알림','할 일을 적어주세요');
    else {
      setDesc('');
      const {data} = await axios.get('http://192.168.0.7:4000/api/todos/input',{params:{desc}});
      if(data.result) dispatch({type:"ADD_TODO", todo : data.todo})
    }
  };

  return (

    <View style={styles.input}>
      <AntDesign 
        style={styles.search} 
        name="search1" size={24} color="black" 
      />
      <TextInput 
        style={styles.textInput}
        placeholder = "  할 일을 적어주세요."
        value={desc}
        onChangeText={text => {setDesc(text)}} 
      />
      <AntDesign 
        style={styles.enter} name="enter" size={24} color="black" 
        onPress={handleInput}  
      />
    </View>
  );
}

const Todo = ({todo}) => {
  const [outLine,setOutLine] = useState(todo.item.completed ? "checkmark-circle-outline" :"checkmark-circle");

  const completedHandler = () => {
    setOutLine("checkmark-circle-outline");
  };

  const deleteHandler = () => {
    console.log(todo.item.id);
  };

  return (
    <View style={styles.todo} >
      <Ionicons name={outLine} size={24} color="black" onPress={completedHandler}/>
      <Text style={{position:"absolute", left :"10%"}}>{todo.item.desc}</Text>
      <FontAwesome5 style={{position:"absolute", right:"5%"}} name="trash" size={24} color="black"
        onPress={deleteHandler}
      />
    </View>
  );
};


const Todos = () => {
  const {todos} = useContext(TodosContext);
  const renderTodos = (todo) => {
    return (
      <Todo todo={todo}/>
    );
  };

  return (
    <SafeAreaView  style={styles.todos}>
      <FlatList
        data={todos}
        renderItem={todo=>{return renderTodos(todo)}}
        keyExtractor={todo=>todo.id}
      />
    </SafeAreaView>
  );
}

const Footer = ({navigation}) => {
  const logoutHandler = async () => {
    console.log('==logout==');
    const {data} = await axios.get('http://192.168.0.7:4000/api/users/logout')
    .catch(err=>{console.log(err)});
    console.log(data);
    console.log('==logout==');
    if(data.result) navigation.navigate('Login');
  }
  return (
    <View style={styles.footer}>
          <MaterialCommunityIcons
            style={{position:"absolute", right:"5%"}}
            name="logout" size={40} color="black"
            onPress={logoutHandler}
          />
    </View>
  );
};



const Main = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, {todos:[]});
  const handleTodos = async () => {
    const {data} = await axios.get('http://192.168.0.7:4000/api/todos/retrieve')
    // if(data.result) setTodos(data.todos);
    if(data.result) dispatch({type:"INIT_TODO", todos : data.todos});
  };
  useEffect(() => {
    handleTodos();
  },[]);
  return (
    <TodosContext.Provider value={{todos:state.todos}}>
      <View style={styles.container}>
        <Input navigation={navigation}/>
        <Todos todos={state.todos}/>
        <Footer navigation={navigation}/>
      </View>
    </TodosContext.Provider>
  );
}

const Login = ({navigation }) => {
  const [usetInfo, setUserInfo] = useState({});
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const loginHandler = async () => {
    console.log('==login==');
    const body = {id,password};
    const {data} = await axios.post('http://192.168.0.7:4000/api/users/login', body)
    .catch(err => {Alert.alert('로그인 실패',data.msg)});
    console.log(data);
    if(!data.result) Alert.alert('로그인 실패',data.msg);
    else navigation.navigate('Main');
    console.log('==login==');
  }
  return (
    <View style = {{backgroundColor:"#d8dae4",width : "100%", height : "100%",justifyContent:"center",alignItems:"center"}}>
      <View style={{backgroundColor:"#e2d8e4", padding:"10%", borderRadius:20}}>

        <View>
          <Text
            style={{}}
          >아이디</Text>
          <TextInput
            placeholder="아이디를 입력하세요"
            onChangeText={(id)=>{setId(id)}}
          />
        </View>
        <View style={{marginTop:"5%"}}>
          <Text>비밀번호</Text>
          <TextInput
            placeholder="비밀번호를 입력하세요"
            onChangeText={(password)=>{setPassword(password)}}
          />
        </View>
        <View style={{}}>
          <Entypo 
            style={{position:"absolute", left:"5%"}}
            name="login" 
            size={24} 
            color="black"
            onPress={loginHandler}
          />

        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App(){
    const [auth, setAuth] = useState();
    const getAuth = async () => {
      const {data} = await axios.get('http://192.168.0.7:4000/api/user/auth');
      setAuth(data.result);
    }
    useEffect(()=>{
      getAuth();
    },[]);

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
}



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