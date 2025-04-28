import { useEffect, useState } from "react";
import phoneService from "./services/phonebook";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    phoneService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

  const handleDelete = (event) => {
    window.confirm(`Delete ${event.name}?`);
    phoneService
      .deletePerson(event)
      .then(() => {
        setPersons(persons.filter((p) => p.name !== event.name));
        setErrorMessage(
          `${event.name} has been successfully removed from the phonebook!`
        );
      })
      .catch((error) => {
        setMessageType("warning");
        setErrorMessage(
          `Information of ${newName} has already been removed from server`
        );
      });
    setTimeout(() => {
      setErrorMessage(null);
      setMessageType("success");
    }, 5000);
  };

  const showPersons = persons.map((person) => (
    <div key={persons.indexOf(person)}>
      {person.name} {person.number}{" "}
      {<button onClick={() => handleDelete(person)}>delete</button>}
    </div>
  ));

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber, show: true };
    if (checkForDuplicates(newName)) {
      if (checkForNewNumber(newName, newNumber)) {
        replaceNumber(newName, newNumber);
      } else {
        alert(`${newName} is already added to the phonebook`);
      }
    } else {
      phoneService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setErrorMessage(
        `${newName} has successfully been added to the phonebook`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleAddPerson = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const checkForDuplicates = (name) => {
    let names = persons.map((person) => person.name);
    return names.includes(name);
  };

  const checkForNewNumber = (name, newNumber) => {
    return getNumberByName(name) != newNumber;
  };

  const replaceNumber = (name, newNumber) => {
    let person = persons.find((p) => p.name === name);
    let newPerson = { ...person, number: newNumber };
    window.confirm(
      `${person.name} is already added to the phonebook, replace the old number with a new one?`
    );
    phoneService.modifyPerson(person.id, newPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.name === name ? returnedPerson : p)));
      setErrorMessage(`${person.name}'s phone number has been updated!`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  const getNumberByName = (name) => {
    const person = persons.find((p) => p.name === name);
    return person ? person.number : null;
  };

  const handleFilter = (value) => {};

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={messageType} />
      <div>
        filter show with <input value={filter} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleAddPerson} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleAddNumber} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons}
    </div>
  );
}

export default App;
