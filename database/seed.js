const { client } = require("./");
const dummyEmployees = [
  { name: "Namey", department_id: 2 },
  { name: "Namey Jr.", department_id: 1 },
  { name: "No Name", department_id: 3 },
  { name: "Named", department_id: 3 },
  { name: "Namison", department_id: 2 },
  { name: "Namer", department_id: 3 },
  { name: "Name", department_id: 1 },
];

const deleteTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS employees;
  DROP TABLE IF EXISTS departments;
  `;
  await client.query(SQL);
};

const createTables = async () => {
  const SQL = `
      CREATE TABLE departments(
        id serial PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE employees(
        id serial PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        department_id INTEGER REFERENCES departments(id) NOT NULL
      );
    `;
  await client.query(SQL);
};

const seedDepartments = async () => {
  const SQL = `
      INSERT INTO departments(name) VALUES('HR'), ('IT'), ('FINANCE');
    `;
  await client.query(SQL);
};

const seedEmployees = async () => {
  const queryParams = dummyEmployees
    .map((employee, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
    .join(",");

  const values = dummyEmployees.flatMap((employee) => [
    employee.name,
    employee.department_id,
  ]);
  console.log(values);

  // Doing wizardry with INSERT INTO employees(name, department_id) VALUES ($1, $2), ($3, $4)
  // Above would create 2 user because 2 sets are given. We would pass in array of values
  const SQL = `
        INSERT INTO employees(name, department_id) VALUES${queryParams};
      `;
  await client.query(SQL, values);
};

module.exports = async () => {
  await deleteTables();
  console.log(`deleted tables`);
  await createTables();
  console.log(`created tables`);
  await seedDepartments();
  console.log(`seeded departments`);
  await seedEmployees();
  console.log(`seeded employees`);
};
