const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/employees", async (req, res, next) => {
  try {
    const employees = await db.getEmployees();
    res.send(employees);
  } catch (error) {
    next(error);
  }
});

// router.get("/departments", async (req, res, next) => {
//   try {
//     const employees = await getEmployees();
//     res.send(employees);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/employees", async (req, res, next) => {
  try {
    const employee = await db.insertEmployee(
      req.body.name,
      req.body.department_name
    );
    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/employees/:id", async (req, res, next) => {
  try {
    const employees = await db.removeEmployee(req.params.id);
    res.sendStatus(204);
    console.log(`Sucessfully Removed Employee`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
