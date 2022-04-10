import React, { useState } from "react";
import "./Todo.css";
// import {Button,FormControl,Input,InputLabel,Modal} from "@material-ui/core";

import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { List, Avatar, Button, ListItemAvatar, ListItem, ListItemText, Modal } from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding : theme.spacing(2,4,3),
    },
}));




function Todo(props) {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input,setInput] = useState('');

	const handleOpen = () => {
		setOpen(true);
    };
    
    const updateTodo = () => {
        //update the todo with the new input text

        db.collection('todos').doc(props.todo.id).set({

            todo : input

        },{merge: true})

        setOpen(false); /*close the modal */
    }
    

	return (
		<>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>I am a modal</h1>

                    <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />

                    <Button onClick={updateTodo}>Update Todo</Button>

                </div>


            </Modal>

			<List>
				<ListItem>
					<ListItemAvatar></ListItemAvatar>

					<ListItemText primary={props.todo.todo} secondary="Dummy Deadline" />
				</ListItem>

				

				<Button
					onClick={(event) =>
						db.collection("todos").doc(props.todo.id).delete()
					}
				>
					❌ DELETE ME
                </Button>
                
                <Button onClick={e => setOpen(true)}>Edit</Button>



			</List>
		</>
	);
}

export default Todo;
