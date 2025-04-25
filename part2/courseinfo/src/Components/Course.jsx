const Course = ({ course }) => {
  const Header = course.name;

  const parts = course.parts.map((course) => (
    <p key={course.id}>
      {course.name} {course.exercises}
    </p>
  ));

  const total = course.parts.reduce((total, course) => {
    return total + course.exercises;
  }, 0);

  return (
    <div>
      <h1>{Header}</h1>
      {parts}
      <strong>Total of {total} exercises </strong>
    </div>
  );
};

export default Course;
