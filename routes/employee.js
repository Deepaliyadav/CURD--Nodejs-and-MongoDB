const express = require('express');

const employeeController  = require('../controllers/employeeControllers');

const router = express.Router();

// /employee/add-employee => GET
router.get('/employee/add-employee',  employeeController.getAddEmployee);

// /employee/add-employee => POST
router.post('/employee/add-employee',  employeeController.postAddEmployee);

router.get('/employee/edit-employee/:employeeId', employeeController.getEditEmployee);

router.post('/employee/edit-employee', employeeController.postEditEmployee);

router.get('/', employeeController.getEmployeeList);

router.get('/employee/delete-employee/:employeeId', employeeController.postDeleteEmployee);

module.exports = router;
