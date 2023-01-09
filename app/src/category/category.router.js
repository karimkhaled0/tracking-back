import {Router} from 'express'
import {createCategory , getAllCategories , getCategory , updateCategory , deleteCategory , getCategoryUsers}  from './category.controller.js'

const router = Router();



//api/category
// get getall 
//post create

router
.route('/')
.get(getAllCategories)
.post(createCategory)



// api/category/users/:id

router.route('/users/:id')
.get(getCategoryUsers)

//get one
//put updateone
//delete  deleteOne

router
.route('/:id')
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory)



export  default router;