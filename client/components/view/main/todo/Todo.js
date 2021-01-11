import React,{ useState, useContext } from 'react';
import { Text, View} from 'react-native';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons';
import {styles} from '../../../style/styles';
import {TodosContext} from '../../../../TodoDispatcher';
import axios from 'axios';

const Todo = ({todo}) => {
  const [outLine,setOutLine] = useState(todo.item.completed ? "checkmark-circle-outline" :"checkmark-circle");
  const {dispatch} = useContext(TodosContext);
  
  const completedHandler = async () => {
    const {id, desc, due_date} = todo.item;
    const completed = !todo.item.completed;
    const {data} = await axios.post('http://192.168.0.7:4000/api/todos/modify',{id, desc, due_date, completed});
    if(data.result){
      dispatch({type:'MODIFY_TODO', todo:data.todo});
      setOutLine(data.todo.completed? "checkmark-circle-outline" :"checkmark-circle");
    } 
  };
  
  const deleteHandler = async () => {
    const {id} = todo.item;
    const {data} = await axios.get('http://192.168.0.7:4000/api/todos/delete',{params:{id}});
    if(data.result) dispatch({type:'DELETE_TODO',todo : data.todo});
  };

  return (
    <View style={styles.todo} >
      <Ionicons style={{width:"16%"}}name={outLine} size={40} color="black" onPress={completedHandler}/>
      <Text style={{position:"absolute", left :"15%"}}>{todo.item.desc}</Text>
      <FontAwesome5 style={{position:"absolute", right:"5%"}} name="trash" size={24} color="black"
        onPress={deleteHandler}
      />
    </View>
  );
};

export {Todo};