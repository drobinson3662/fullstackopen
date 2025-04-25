const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  let style = null;
  const notificationSuccessStyle = {
    color: "green",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const notificationWarningStyle = {
    color: "red",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (type === "warning") {
    style = notificationWarningStyle;
  } else {
    style = notificationSuccessStyle;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
