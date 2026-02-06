import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clubj_guest_meal_db",
  password: "postgresql",
  port: 5432,
});

export default pool;
