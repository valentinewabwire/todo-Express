exports.getDate = function () {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
};

exports.getTheDay = function () {
  const today = new Date();

  const options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
};
