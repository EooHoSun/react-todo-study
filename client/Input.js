import React,{ useState,useContext } from 'react';
import {View, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { AntDesign} from '@expo/vector-icons';
import {TodosContext} from './TodoDispatcher';
import {styles} from './styles';

const Input = () => {
  const [desc, setDesc] = useState('');
  const {dispatch} = useContext(TodosContext);

  const handleInput = async () => {
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
        onEndEditing={handleInput}
      />
      <AntDesign 
        style={styles.enter} name="enter" size={24} color="black" 
        onPress={handleInput}  
      />
    </View>
  );
}

export {Input};