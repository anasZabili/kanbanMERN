const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "projet",
  password: "tejorp",
  database: "projet",
});

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("hello world");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
app.post("/api/user/insert", (req, res) => {
  const username = req.body.username;
  const mail = req.body.mail;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("err in bcrypt", err);
    }
    const sqlInsert =
      "insert into user (name, mail, password) values (?, ?, ?);";
    db.query(sqlInsert, [username, mail, hash], (err, result) => {
      console.log(err);
    });
  });
});

app.post("/api/user/get", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  const sqlSelect = "select id, name, password from user where mail like ? ;";
  db.query(sqlSelect, mail, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          res.send(result);
        } else {
          res.send({ message: "Identifiant ou mot de passe incorrect" });
        }
      });
    } else {
      res.send({ message: "Identifiant incorrect" });
    }
  });
});

app.post("/api/boards/get", (req, res) => {
  const ownerId = req.body.ownerId;
  const sqlSelect =
    "select distinct * from boards where ownerid = ? or id in (select boardid from invited where id = ?);";
  db.query(sqlSelect, [ownerId, ownerId], (err, result) => {
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
  const sqlSelect = "select * from taskcolumn where boardid = ?;";
  db.query(sqlSelect, [boardId], (err, result) => {
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
  const sqlSelect =
    "insert into taskcolumn (boardid, name, position) values (?, ?, ?);";
  db.query(sqlSelect, [boardId, name, position], (err, result) => {
    res.send();
  });
});

app.post("/api/card/get", (req, res) => {
  const taskColumnId = req.body.taskColumnId;

  const sqlSelect =
    "select distinct c.id, u.name, c.content, c.position, c.personinchargeid, u.name from card as c, user as u where c.personinchargeid = u.id and taskcolumnid = ?;";
  db.query(sqlSelect, [taskColumnId], (err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});

app.post("/api/card/insert", (req, res) => {
  const taskColumnId = req.body.taskColumnId;
  const personInChargeId = req.body.personInChargeId;
  const content = req.body.content;
  const position = req.body.position;
  const sqlSelect =
    "insert into card (taskcolumnid, personinchargeid, content, position) values (?, ?, ?, ?);";
  db.query(
    sqlSelect,
    [taskColumnId, personInChargeId, content, position],
    (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result) {
        return null;
      } else {
        return res.send(result);
      }
    }
  );
});

app.post("/api/card/delete", (req, res) => {
  const cardId = req.body.cardId;
  const sqlSelect = "delete from card where id = ?;";
  db.query(sqlSelect, [cardId], (err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});

app.post("/api/card/update", (req, res) => {
  const cardId = req.body.cardId;
  const taskColumnId = req.body.taskColumnId;
  const position = req.body.position;
  const sqlSelect =
    "update card set taskcolumnid = ?, position = ?  where id = ?;";
  db.query(sqlSelect, [taskColumnId, position, cardId], (err, result) => {
    if (err) {
      return res.send(err);
    } else if (!result) {
      return null;
    } else {
      return res.send(result);
    }
  });
});

app.post("/api/boards/insert", (req, res) => {
  const name = req.body.name;
  const ownerId = req.body.ownerId;

  const sqlInsert = "insert into boards (name, ownerid) values (?, ?);";
  db.query(sqlInsert, [name, ownerId], (err, result) => {
    res.send(result?.status);
  });
});

app.post("/api/boards/delete", (req, res) => {
  const id = req.body.id;

  const sqlDelete = "delete from boards where id = ?;";
  db.query(sqlDelete, [id], (err, result) => {
    res.send();
  });
});

app.post("/api/invited/insert", (req, res) => {
  const boardId = req.body.boardId;
  const mail = req.body.mail;

  const sqlSelect = "select id from user where mail like ? ;";
  db.query(sqlSelect, [mail], (err, result) => {
    const sqlInsert = "insert into invited (id, boardid) values (?, ?)";
    db.query(sqlInsert, [result[0].id, boardId], (err, result) => {
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log("run on port", port);
});
