const db_psql = require("./db/postgress");
const { notes } = require("./db/models/notes");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
require("dotenv").config();
db_psql
  .authenticate()
  .then(() => {
    console.log("Success!");
  })
  .catch((err) => {
    console.log(err);
  });

const port = parseInt(process.env.PORT);
app.get("/notes", async (req, res) => {
  try {
    const { author } = req.query;
    if (author) {
      const note = await notes.findAll({
        where: {
          author,
        },
      });
      note.length > 0
        ? res.status(200).send({ notes: note })
        : res.status(404).send({ message: "no notes with this author" });
    } else {
      const note = await notes.findAll({});
      res.status(200).send({ notes: note });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured");
  }
});
app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await notes.findAll({
      where: {
        id,
      },
    });

    note.length > 0
      ? res.status(200).send({ notes: note })
      : res.status(404).send({ message: "no notes with this id" });
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured");
  }
});
app.post("/notes", async (req, res) => {
  try {
    const content = req.body.content ?? "";
    const added = req.body.added ?? "";
    const author = req.body.author ?? "";
    if (author === "" || content === "") {
      res.status(422).send("incomeplete data");
    } else {
      const result = await notes.create({
        author,
        content,
        added,
      });
      res.status(200).send({ message: "data inserted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
});
app.listen(port, () => {
  console.log(`server is running in port :${port}`);
});
