const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.07y4u5r.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phonebookSchema);

const addPerson = () => {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`${name} ${number} has been added to the phonebook`);
    mongoose.connection.close();
  });
};

const listPeople = () => {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

if (process.argv.length === 3) {
  listPeople();
} else if (process.argv.length === 5) {
  addPerson();
} else {
  console.log("Structured wrong!");
}
