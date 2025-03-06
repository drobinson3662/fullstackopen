import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
    all: 0,
  });

  const setGoodFeedback = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
      all: feedback.all + 1,
    });
  };

  const setBadFeedback = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1, all: feedback.all + 1 });
  };

  const setNeutralFeedback = () => {
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
      all: feedback.all + 1,
    });
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setGoodFeedback} text="good" />
      <Button onClick={setNeutralFeedback} text="neutral" />
      <Button onClick={setBadFeedback} text="bad" />
      <Statistics feedback={feedback} />
    </div>
  );
}

export default App;
