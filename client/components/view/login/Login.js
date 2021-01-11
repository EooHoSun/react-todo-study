import React,{useState } from 'react';
import { Text, View, TextInput, Alert} from 'react-native';
import axios from 'axios';
import { Entypo,AntDesign  } from '@expo/vector-icons';
import {styles} from '../../style/styles';

const Login = ({navigation }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    
    const loginHandler = async () => {
      console.log('==login==');
      const body = {id,password};
      const {data} = await axios.post('http://192.168.0.7:4000/api/users/login', body)
      .catch(err => {Alert.alert('로그인 실패',data.msg)});
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
              onSubmitEditing={loginHandler}
            />
          </View>
          <View style={{display:"flex",flexDirection:"row"}}>
            <View style={{display:"flex", flexDirection:"row", backgroundColor:"white",width:"30%",borderWidth:0.5,borderRadius:15}} 
                  onTouchEnd={loginHandler}>
              <View>
                <Entypo 
                  name="login" 
                  size={24} 
                  color="black"
                />
              </View>
              <Text >Login</Text>
            </View>
            
            <View style={{marginLeft:"15%",display:"flex", flexDirection:"row", backgroundColor:"white",width:"30%",borderWidth:0.5,borderRadius:15}}
                  onTouchEnd={()=>{navigation.navigate('AddUser')}}>
              <AntDesign name="adduser" size={24} color="black" />
              <Text >Join</Text>
            </View>

          </View>

          
        </View>
      </View>
    );
  }

  export {Login};