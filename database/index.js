const { application, response } = require("express");
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/hr_directory"
);

const getEmployees = async () => {
  const SQL = `
    SELECT * FROM employees;
    `;

  const response = await client.query(SQL);
  return response.rows;
};

const insertEmployee = async (name, department_name) => {
  const SQL = `
      INSERT INTO employees(name, department_id) VALUES($1, (SELECT id FROM departments WHERE name = $2))
      RETURNING *`;

  const response = await client.query(SQL, [name, department_name]);
  return response.rows[0];
};

const removeEmployee = async (id) => {
  const SQL = `
        DELETE FROM employees
        WHERE id = $1`;

  const response = await client.query(SQL, [id]);
  return true;
};

module.exports = { client, getEmployees, insertEmployee, removeEmployee };
