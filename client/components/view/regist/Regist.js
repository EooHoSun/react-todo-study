import React,{useState } from 'react';
import { Text, View, TextInput, Alert} from 'react-native';
import axios from 'axios';
import { AntDesign  } from '@expo/vector-icons';
import {styles} from '../../style/styles';

const Regist = ({navigation}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const addUserHandler = async () => {
      if(!id) {
        Alert.alert('알림', '아이디를 입력해주세요');
        return;
      }
      if(!password) {
        Alert.alert('알림', '아이디를 입력해주세요');
        return;
      }
      if(!email) {
        Alert.alert('알림', '아이디를 입력해주세요');
        return;
      }

      const {data} = await axios.post('http://192.168.0.7:4000/api/users/register',{id,password,email});
      console.log(data);
      if(data.result) {
        Alert.alert('알림', '회원가입성공');
        console.log('wefwefwef');
        navigation.navigate('Login');
      } else {
        Alert.alert('알림', data.msg);
      }
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
          <View style={{marginTop:"5%"}}>
            <Text>Email</Text>
            <TextInput
              placeholder="email을 입력하세요"
              onChangeText={(email)=>{setEmail(email)}}
            />
          </View>
          <View style={{display:"flex",flexDirection:"row"}}>
            
            <View style={{marginLeft:"15%",display:"flex", flexDirection:"row", backgroundColor:"white",width:"40%",borderWidth:0.5,borderRadius:15}}
                  onTouchEnd={addUserHandler} >
              <AntDesign name="adduser" size={24} color="black" />
              <Text >Join</Text>
            </View>

          </View>

          
        </View>
      </View>
    );
  }

  export {Regist};