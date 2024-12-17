const messageCodes = async (vars) => {
  let { code } = vars;

  if (!code) {
    return "";
  }
  let messageArray = {};
  return messageArray[code];
};

module.exports = { messageCodes };
