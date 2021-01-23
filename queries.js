const request = require("request");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "alex1230",
  port: 5432,
});

const getStudents = (req, res) => {
  pool.query("SELECT * FROM student ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createStudent = (req, res) => {
  const { firstname, lastname } = req.body;

  // if (
  //   req.body.captcha === undefined ||
  //   req.body.captcah === "" ||
  //   req.body.captcah == null
  // ) {
  //   return res.json({ success: false, msg: "Please select captcha" });
  // }

  pool.query(
    "INSERT INTO student (firstname, lastname) VALUES ($1, $2)",
    [firstname, lastname],
    (error, results) => {
      if (error) {
        throw error;
      }
      
      res.status(200).json(results);
    }
  );

    
};

module.exports = {
  getStudents,
  createStudent,
};
