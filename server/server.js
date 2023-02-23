const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require("uuid")
const app = express()
const pool = require("./db")
const cors = require('cors')
const bycrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { json } = require('express')

app.use(cors())
app.use(express.json())

app.get('/todos/:userEmail', async (req,res) => {
    const {userEmail} = req.params

    try{ 
       const todos =   await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
       res.json(todos.rows)
    }catch(err) {
        console.error(err)
    }
})

// Create a new todo
app.post('/todos', async (req, res) => {
    const id = uuidv4()
    const {user_email, title, postgress, date} = req.body
    console.log(user_email, title, postgress, date)
    const newTodo = await pool.query(`INSERT INTO todos(id,user_email,title,postgress,date) VaLUES($1, $2, $3, $4, $5)`, 
    [id,user_email,title,postgress,date] )
    res.json(newTodo)
})

// Edit a Todo
app.put('/todos/:id' , async(req, res) => {
    const { id } = req.params

    const {user_email, title, postgress, date} = req.body
    try{
        const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, postgress = $3, date = $4 WHERE id = $5;',
         [user_email, title, postgress, date, id])
         res.json(editTodo)
    }catch(err) {
        console.error(err)
    }
})

// Delete a Todo
app.delete('/todos/:id', async(req, res) => {
    const { id } = req.params

    const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [id])
    res.json(deleteTodo)  

    // try{
        
    // }catch(err){
        
    // }
})

// Signup
app.post('/signup', async (req, res) => { 
    const {email, password} = req.body
    const salt = bycrypt.genSaltSync(10)
    const hashedPassword = bycrypt.hashSync(password, salt)
    try{ 
        const signUp = await pool.query('INSERT INTO users (email, hashed_password) VALUES($1, $2)', 
        [email, hashedPassword])

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token})   
    }catch(err){ 
        console.log(err)
        if(err){
            res.json({ detail: err.detail })
        }
    }
})

//Login
app.post('/login', async (req, res) => {
    const {email, password} = req.body

    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if(!users.rows.length) return res.json({ detail: 'User does not exit'})

        const success = await bycrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        if(success){
            res.json({email : users.rows[0].email, token})
        }else{
            res.json({ detail: 'Login Failed (Check your Password)'})
        }

    }catch(err){
        
    }
})


app.listen(PORT, () => {
    `Server Running on ${PORT}`
})
