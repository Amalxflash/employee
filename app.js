// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;



const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


app.get('/api/employeelist',async(req,res)=>{
    try {
        const data = await empData.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})





//TODO: get data from db  using api '/api/employeelist'

const employeeSchema = new mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
  });

  const Employee = mongoose.model('Employee', employeeSchema);
  
  // API to get all employees
  app.get('/api/employeelist', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (err) {
      res.status(500).send(err);
    }
  });


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).send('Employee not found');
      }
      res.json(employee);
    } catch (err) {
      res.status(500).send(err);
    }
  });



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    const { name, location, position, salary } = req.body;
    const newEmployee = new Employee({ name, location, position, salary });
    try {
      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
    } catch (err) {
      res.status(500).send(err);
    }
  });




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
        return res.status(404).send('Employee not found');
      }
      res.send('Employee deleted');
    } catch (err) {
      res.status(500).send(err);
    }
  });



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist/:id', async (req, res) => {
    const { name, location, position, salary } = req.body;
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        { name, location, position, salary },
        { new: true }
      );
      if (!updatedEmployee) {
        return res.status(404).send('Employee not found');
      }
      res.json(updatedEmployee);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

