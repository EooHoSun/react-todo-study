import React,{createContext} from 'react';

const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          todos : [...state.todos || [], action.todo]
        };
      case 'INIT_TODO' : 
        return {
          todos : action.todos
        };
      case 'DELETE_TODO' :
        console.log([...state.todos || []].filter(todo=>{return todo.id !== action.todo.id}));
        return {
          todos :[...state.todos || []].filter(todo=>{return todo.id !== action.todo.id})
        }
      case 'MODIFY_TODO':

        const _todos = [...state.todos];
        const idx =_todos.findIndex(todo=>{return todo.id === action.todo.id});
        if(idx !== -1){
          _todos.splice(idx,1,JSON.parse(JSON.stringify(action.todo)));
        //   console.log(state.todos);
        //   console.log('====');
        //   console.log(_todos);
        }
        return {
          todos : _todos
        };
      case 'AUTH' : 
        return {
          auth : action.auth
        };
      default:
        return state;
    }
  }
  const TodosContext = createContext({
    todos:[],
    dispatch:null,
    auth:false
  });

  export {reducer,TodosContext};