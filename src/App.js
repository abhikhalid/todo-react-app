import { useEffect, useState } from 'react';
import './App.css';

import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Button, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';

import db from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function App() {

  // const [todos, setTodos] = useState(['Take dogs for a walk', 'Take the rubbish out']);
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState('');


  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed

  useEffect(() => {
    //this code here... fires when the App.js loads


    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })

  }, [])



  const addTodo = (event) => {
    //this will fire off when we click the button
    // console.log("👽 I'm working");

    event.preventDefault(); //will stop the REFRESH

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    // setTodos([...todos, input]);

    setInput(''); //clear up the input after clicking add todo button
  }


  return (
    <div className="App">

      <h1>Hello Clever Programmers 🚀 !</h1>

      {/* <form> */}
      {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}



      {/* <button type="submit" onClick={addTodo}>Add Todo</button> */}



      {/* </form> */}

      <form>
        <FormControl>

          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />

        </FormControl>

        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>Add Todo</Button>
      </form>




      <ul>
        {
          todos.map(todo => (
            // <li key={Math.random() * 100}>{todo}</li>
            <Todo todo={todo} />
          ))}

      </ul>



    </div>
  );
}

export default App;
