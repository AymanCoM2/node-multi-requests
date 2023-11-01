const axios = require("axios");

const link1 = "http://10.10.10.66:8005/api/user-docs/0553142429";
const numRequests = 50; // Sending 50 Requests to this API

let counter = 1;
const sendRequest = async () => {
  try {
    const response = await axios.get(link1);
    if (response.data) {
      console.log(`{$counter}` + " " + "Response Data:", response.data);
      counter++;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const sendMultipleRequests = async () => {
  const requestPromises = Array.from({ length: numRequests }, () =>
    sendRequest()
  );
  await Promise.all(requestPromises);
};

sendMultipleRequests();
