import React,{useState } from 'react';
import { Text, View, TextInput, Alert} from 'react-native';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import {styles} from './styles';

const Login = ({navigation }) => {
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

  export {Login};