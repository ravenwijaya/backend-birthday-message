const cron = require("node-cron");
const helpers = require("./users");
const hookbinHelper = require("./hookbin");

let timeZone = [
  "Asia/Jakarta",
  "Asia/Jayapura",
  "Europe/Athens",
  "Australia/Melbourne",
];

exports.Schedule = () => {
  let today = new Date();

  //reset every 1 JAN 00:00
  cron.schedule("0 0 1 JAN *", function () {
    helpers.resetStatus();
  });

  //  5 minute
  cron.schedule("5 * * * *", function () {
    let zones = [];
    timeZone.forEach((zone) => {
      const hour = today.toLocaleString("de-DE", {
        hour: "2-digit",
        hour12: false,
        timeZone: `${zone}`,
      });
      if (hour === "9 Uhr") {
        zones.push(zone);
      }
    });
    if (zones.length > 0) {
      const users = helpers.getUserList(today, zones);

      users.then((userList) => {
        if (userList.length > 0) {
          userList.forEach((user) => {
            const userId = user._id.toString();
            const fullname = `${user.first_name} ${user.last_name}`;
            const result = hookbinHelper.sendMessage(fullname);

            result.then((res) => {
              if (res === 200) {
                const updated = helpers.updateStatus(userId);
                updated.then((res) => console.log("Success"));
              }
            });
          });
        }
      });
    }
  });
};
