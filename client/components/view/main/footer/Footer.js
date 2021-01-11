import React from 'react';
import {View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';
import {styles} from '../../../style/styles';

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

export {Footer};