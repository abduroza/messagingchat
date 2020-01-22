const sucRes = function(result, message) {
  return {
    success: true,
    messages: message,
    results: result
  };
};
const failRes = function(result, message) {
  return {
    success: false,
    messages: message,
    results: result
  };
};
module.exports = { sucRes, failRes };
