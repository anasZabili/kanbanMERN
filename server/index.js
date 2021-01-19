const express = require("express");
const app = express();
const cors = require("cors");
// TODO faire en sorte que le prof puisse modifier ce truc
//  je met 3001 par defaut car l'application tourne sur le port 3000
const port = 3001;
const mysql = require("mysql");
const bodyParser = require("body-parser");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "kanban",
// });

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "kanban",
});

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("hello world");
});
// app.get("/", (req, res) => {
//   const sqlInsert = "INSERT INTO USER (name, mail, password) values ('test4', 'test4@test.fr', 'test4');"
//   db.query(sqlInsert, (err, result) => {
//     res.send("hello me");
//     console.log(err);
//   }).then
// });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/user/get", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;  
  sqlSelect = "SELECT ID, NAME FROM USER WHERE MAIL LIKE ? AND password LIKE ?;";
  db.query(sqlSelect, [mail, password] ,(err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});


app.post("/api/boards/get", (req, res) => {
  const ownerId = req.body.ownerId;
  sqlSelect = "SELECT DISTINCT * FROM BOARDS WHERE OWNERID = ? OR ID IN (SELECT BOARDID FROM INVITED WHERE ID = ?);";
  db.query(sqlSelect, [ownerId, ownerId] ,(err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});

app.post("/api/taskColumn/get", (req, res) => {
  const boardId = req.body.boardId;
  sqlSelect = "SELECT * FROM TASKCOLUMN WHERE BOARDID = ?;";
  db.query(sqlSelect, [boardId] ,(err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});

app.post("/api/taskColumn/insert", (req, res) => {
  const boardId = req.body.boardId;
  const name = req.body.name;
  const position = req.body.position;
  sqlSelect = "INSERT INTO taskColumn (BOARDID, NAME, POSITION) VALUES (?, ?, ?);";
  db.query(sqlSelect, [boardId, name, position] ,(err, result) => {
    res.send()
  });
});

// app.post("/api/taskColumn/delete", (req, res) => {
//   const boardId = req.body.boardId;
//   sqlSelect = "SELECT * FROM TASKCOLUMN where boardId = ?;";
//   db.query(sqlSelect, [boardId] ,(err, result) => {
//     if (err) {
//       return res.send(err);
//     } else if (!result) {
//       return null;
//     } else {
//       return res.send(result);
//     }
//   });
// });

app.post("/api/card/get", (req, res) => {
  const taskColumnId = req.body.taskColumnId;
  
  sqlSelect = "SELECT DISTINCT c.id, u.name, c.content, c.position FROM CARD AS c, USER as u WHERE c.personInChargeId = u.id AND taskColumnId = ?;";
  db.query(sqlSelect, [taskColumnId] ,(err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});

app.post("/api/user/insert", (req, res) => {
  const username = req.body.username;
  const mail = req.body.mail;
  const password = req.body.username;
  const sqlInsert = "INSERT INTO USER (name, mail, password) VALUES (?, ?, ?);";
  db.query(sqlInsert, [username, mail, password], (err, result) => {
    res.send(result.status);
    console.log("🚀 ~ file: index.js ~ line 43 ~ db.query ~ result", result);
  });
});

app.post("/api/boards/insert", (req, res) => {
  const name = req.body.name;
  const ownerId = req.body.ownerId;
 
  const sqlInsert = "INSERT INTO BOARDS (name, ownerId) VALUES (?, ?);";
  db.query(sqlInsert, [name, ownerId], (err, result) => {
    res.send(result.status);
  });
});

app.post("/api/boards/delete", (req, res) => {
  const id = req.body.id;
 
  const sqlDelete = "DELETE FROM BOARDS WHERE id = ?;";
  db.query(sqlDelete, [id], (err, result) => {
    res.send();
  });
});

app.listen(port, () => {
  console.log("run on port", port);
});
