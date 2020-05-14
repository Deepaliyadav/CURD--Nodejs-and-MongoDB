const Employee = require('../models/employee.model');

exports.getAddEmployee = (req, res, next) => {
    res.render('employee/edit-employee', {
        pageTitle : 'Insert Employee',
        editing: false
    });
};

exports.postAddEmployee = (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const city = req.body.city;

    console.log(fullName, email, mobile, city)
    const employee = new Employee({
        fullName: fullName,
        email: email,
        mobile: mobile,
        city: city
    });
    employee.save()
            .then(result => {   
                console.log('Records Inserted');
                res.redirect('/');
            })
            .catch(err => {
                    console.log('Error during record insertion : ' + err);
        
            }); 
};

exports.getEditEmployee = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const empId = req.params.employeeId;
    Employee.findById(empId)
      .then(employee => {
        if (!employee) {
          return res.redirect('/');
        }
        res.render('employee/edit-employee', {
          pageTitle: 'Edit Employee',
          editing: editMode,
          employee: employee
        });
      })
      .catch(err => console.log(err));
}

exports.postEditEmployee = (req, res, next) => {
    const empId = req.body.employeeId;
    const updatedFullName = req.body.fullName;
    const updatedEmail = req.body.email;
    const updatedMobile = req.body.mobile;
    const updatedCity = req.body.city;

    console.log(empId)
  
    Employee.findById(empId)
      .then(employee => {
        employee.fullName = updatedFullName;
        employee.email = updatedEmail;
        employee.mobile = updatedMobile;
        employee.city = updatedCity;
        return employee.save();
      })
      .then(result => {
        console.log('UPDATED EMPLOYEE!');
        res.redirect('/');
      })
      .catch(err => console.log(err));
  };

exports.getEmployeeList = (req, res, next) => {
    Employee.find()
            .then(employees => {
                res.render('employee/employee-list', {
                    list: employees,
                    pageTitle: 'Employee List'
                });
            })
            .catch(err => {
                console.log(err);
            })
};

exports.postDeleteEmployee = (req, res, next) => {
  const empId = req.params.employeeId;
  Employee.findByIdAndRemove(empId)
    .then(() => {
      console.log('DESTROYED EMPLOYEE');
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
