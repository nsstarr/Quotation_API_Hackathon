import { query } from "../index.js";

import {quotes} from '../'

// populates resources table with the given data
async function populateTable() {
  for (let i = 0; i < quotes.length; i++) {
    const response = await query(
      `INSERT INTO quotes (user_id, name, dog, breed, age, address, time, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [
       quotes[i].user_id,
       quotes[i].name,
       quotes[i].dog,
       quotes[i].breed,
       quotes[i].age,
       quotes[i].address,
       quotes[i].time,
       quotes[i].price
      ]
    );
    console.log(response.rows);
  }
}
populateTable();
