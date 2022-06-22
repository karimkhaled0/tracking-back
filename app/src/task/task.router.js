import {Router} from 'express';
import {getAllTasks , getTask , updateTask , deleteTask , createTask} from './task.controller'


const router = Router();


// api/task/
//get all tasks

router
.route('/')
.get(getAllTasks)
.post(createTask)



//api/task/:id
// get task / update task / delete task

router
.route('/:id')
.get(getTask)
.put(updateTask)
.delete(deleteTask)



export default router;
