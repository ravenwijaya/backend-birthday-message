const axios = require("axios");

exports.sendMessage = (fullName) => {
  const data = JSON.stringify({
    message: `Hey ${fullName} it's your birthday`,
  });

  const res = axios({
    method: "post",
    url: "https://hookb.in/nPKEj989GBCZ7Qrr7blo",
    data: data,
    port: 443,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  })
    .then((res) => res.status)
    .catch(console.error);

  return res;
};
