import { query } from "../index.js";

//Once the discount is applied, it will change the price column

const sqlString = `CREATE TABLE IF NOT EXISTS quotes (
       id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
       user_id INT,
       name VARCHAR(35),
       dog BOOLEAN,
       breed TEXT,
       age INT,
       address TEXT,
       time DATE NOT NULL DEFAULT CURRENT_DATE,
       price FLOAT(4)
);`;



async function createTable() {
  const res = await query(sqlString);
  console.log(res.rows[0], "inserted");
}
createTable();
