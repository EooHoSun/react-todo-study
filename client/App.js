import React,{useEffect, useState, useReducer } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {reducer,TodosContext} from './TodoDispatcher';
import {Input} from './components/view/main/input/Input';
import {Todos} from './components/view/main/todos/Todos';
import {Footer} from './components/view/main/footer/Footer';
import {styles} from './components/style/styles';
import {Login} from './components/view/login/Login';
import {Regist} from './components/view/regist/Regist';




const Main = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, {todos:[],auth:false});
  const handleTodos = async () => {
    const {data} = await axios.get('http://192.168.0.7:4000/api/todos/retrieve')
    if(data.result) dispatch({type:"INIT_TODO", todos : data.todos});
  };
  const getAuth = async () => {
    const {data:{result}} = await axios.get('http://192.168.0.7:4000/api/user/auth');
    if(!result) {
      console.log('인증결과 : ' + result);
      navigation.navigate('Login');
    }
    dispatch({typd:"AUTH", auth : result});
  }
  useEffect(() => {
    getAuth();
    handleTodos();
  },[]);
  return (
    <TodosContext.Provider value={{todos:state.todos, dispatch,auth:state.auth}}>
      <View style={styles.container}>
        <Input navigation={navigation}/>
        <Todos todos={state.todos}/>
        <Footer navigation={navigation}/>
      </View>
    </TodosContext.Provider>
  );
}


const Stack = createStackNavigator();

export default function App(){
    const [root, setRoot] = useState();
    const getAuth = async () => {
      const {data} = await axios.get('http://192.168.0.7:4000/api/user/auth');
      setRoot(data.result?'Home':'Login');
    }
    useEffect(()=>{
      getAuth();
    },[]);

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={root}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Main" component={Main}/>
          <Stack.Screen name="AddUser" component={Regist}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    );
}



