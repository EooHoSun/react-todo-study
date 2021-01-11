import React, {useContext } from 'react';
import {SafeAreaView , FlatList } from 'react-native';
import {TodosContext} from '../../../../TodoDispatcher';
import {styles} from '../../../style/styles';
import {Todo} from '../todo/Todo';

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
        keyExtractor={todo=>todo._id}
      />
    </SafeAreaView>
  );
}

export {Todos};