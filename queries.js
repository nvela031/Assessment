const request = require("request");
const fetch = require("node-fetch");
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
  const { firstname, lastname, captcha } = req.body;

  if (captcha === undefined || captcha === "" || captcha == null) {
    return res.json({ success: false, msg: "Please select captcha" });
  }

  const isValid = validation(captcha, req.connection.remoteAddress);

  if (isValid.success === false) {
    return res.status(400).json({ msg: "Failed captcha verification" });
  }

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

const validation = async (captcha, remoteAddress) => {
  const secretKey = "6Le6KjkaAAAAADamxfClznJWPSntLcJYKtivfx_x";
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${remoteAddress}`;

  return await fetch(verifyUrl)
    .then((res) => res.json())
    .then((data) => console.log(data.success));
};

module.exports = {
  getStudents,
  createStudent,
};
