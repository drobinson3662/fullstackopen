const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

morgan.token("content", (request, response) => {
  const body = request.body;
  return JSON.stringify({
    name: body.name,
    number: body.number,
  });
});

app.use(morgan(":method :url :status :response-time[3] :content"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  response.send(`${getInfo()}`);
});

// API Routing
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// get by id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete by id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

// add person
app.post("/api/persons", (request, response) => {
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

  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} is already added to the phonebook!`,
    });
  }

  const person = {
    id: getId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

//Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
