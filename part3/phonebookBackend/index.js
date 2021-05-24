require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT;
const Person = require("./models/mongo.js");

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// Entrance
app.get("/", (req, res) => {
  return res.send("Hey there, we are running");
});

//Get entries
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      return res.status(200).json(persons);
    })
    .catch((err) => next(err));
});

//Get specific entry
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.status(200).json(person))
    .catch((err) => next(err));
});

//Get amount of entries
app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.count({})
    .then((amount) => {
      return res.send(`Phonebook has ${amount} people <br/><br/> ${date}`);
    })
    .catch((err) => next(err));
});

//DELETE people
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons/", (req, res, next) => {
  const content = req.body;

  if (!content.name) {
    return res.status(400).json({ error: "name is missing" });
  } else if (!content.number) {
    return res.status(400).json({ error: "number is missing" });
  }

  const person = new Person({
    name: content.name,
    number: content.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

//MODIFY people
app.put("/api/persons/:id", (req, res, next) => {
  const content = req.body;
  const id = req.params.id;

  Person.findByIdAndUpdate(id, { number: content.number })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
