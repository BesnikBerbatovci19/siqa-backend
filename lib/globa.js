exports.returnErrors = async (e, req) => {
  try {
    let { statusCode, message, extra_data, data, showErrorMessage } = e;
    let messageCode = message;
    let dataCode = data;
    // HTTP Code
    statusCode = statusCode || 400;
    // Extra parameters for message
    extra_data = extra_data || [];
    // Check Message Type
    let mode = await this.checkMessageType({ messageCode });
    let dataMode = await this.checkMessageType({ dataCode });

    if (mode == "c") {
      message = messageCodes({ code: messageCode });
    } else {
      console.log(e);
      await this.sendMessageToSlack({ message: messageCode });
      if (!showErrorMessage) {
        message = "A error has occurred. Please try again later.";
      }
      messageCode = 1025;
    }
    if (dataMode == "c" && dataCode) {
      data = messageCodes({ code: dataCode });
    } else {
      data = message;
    }
    // Add Extra parameters on message
    Object.keys(extra_data).forEach((key) => {
      message = message.replace(`{{${key}}}`, extra_data[key]);
      data = data.replace(`{{${key}}}`, extra_data[key]);
    });
    // Response Body
    let body = {
      error: {
        code: messageCode,
        message: message || "",
        data: data || "",
      },
    };

    // Return the response
    let return_data = {
      statusCode,
      body,
    };
    // if (process.env.stage != "local") {
    self.showLog({
      prefix: req.prefix,
      m: JSON.stringify(return_data),
    });
    // }
    return return_data;
  } catch (e) {
    console.log(e);
    return false;
  }
};
