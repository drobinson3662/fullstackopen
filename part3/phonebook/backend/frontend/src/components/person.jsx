const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

export default Person;
