require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(express.static("dist"));
const Phonebook = require("./models/phonebook");

morgan.token("content", (request, response) => {
  const body = request.body || {};
  return JSON.stringify({
    name: body.name || "",
    number: body.number || "",
  });
});

app.use(morgan(":method :url :status :response-time[3] :content"));

let persons = [];

// Method used for Info Screen
const getInfo = () => {
  let numberOfPersons = persons.length;
  let d = new Date();
  return `<p>Phonebook has info for ${numberOfPersons} people</p> The time is ${d}`;
};

// Method used to generate new id
const getId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

// Index Routing
app.get("/", (request, response) => {
  response.send("<h1>Phonebook Project Backend!</h1>");
});

// Info Routing
app.get("/info", (request, response) => {
  let d = new Date();
  Phonebook.countDocuments({}).then((result) => {
    response.send(
      `<p>Phonebook has info for ${result} people</p> The time is ${d}`
    );
  });
});

// API Routing
app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.json(persons);
  });
});

// get by id
app.get("/api/persons/:id", (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((person) => {
      if (!person) {
        response.status(404).end();
      } else {
        response.json(person);
      }
    })
    .catch((error) => next(error));
  // const id = request.params.id;
  // const person = persons.find((p) => p.id === id);
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
});

// delete by id
app.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// add person
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  // if (persons.find((p) => p.name === body.name)) {
  //   return response.status(400).json({
  //     error: `${body.name} is already added to the phonebook!`,
  //   });
  // }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  Phonebook.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
//Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
