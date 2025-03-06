import StatisticLine from "./StatisticLine";

const Statistics = ({ feedback }) => {
  if (feedback.all === 0) {
    return (
      <div>
        <p>No Feedback Given!</p>
      </div>
    );
  }
  const getAverage = () => {
    const badFeedback = feedback.bad * -1;
    return (feedback.good + badFeedback) / feedback.all;
  };
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <thead>
          <StatisticLine text="good" value={feedback.good} />
          <StatisticLine text="Neutral" value={feedback.neutral} />
          <StatisticLine text="Bad" value={feedback.bad} />
          <StatisticLine text="All" value={feedback.all} />
          <StatisticLine text="Average" value={getAverage()} />
          <StatisticLine
            text="Positive"
            value={(feedback.good / feedback.all) * 100}
          />
        </thead>
      </table>
    </div>
  );
};

export default Statistics;
