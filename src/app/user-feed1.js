const casual = require("casual");
const fetch = require("node-fetch");

const userFeed = [];

const get = async () => {
  if (userFeed.length === 0) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/5");
    const body = await response.json();
    for (const dogUrl of body.message) {
      userFeed.push({
        name: casual.full_name,
        nameHandle: `@${casual.username}`,
        message: `${casual.sentence}. ${casual.sentence}`,
        imageSource: dogUrl,
      });
    }
  } else {
    return userFeed;
  }

  return userFeed;
};

const add = async (user, message) => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random/1");
  const body = await response.json();
  userFeed.unshift({
    name: user.name,
    nameHandle: user.email,
    message: message,
    imageSource: body.message,
  });
};

const sendmessage = async (user, message) => {
  const accountSid = "AC89cd9582197a4cf08ddcc13652804f8f";
  const authToken = "3908cdc1f0e90e57b897e4068bd7b3cf";
  const client = require('twilio')(accountSid, authToken);

  const message1 = await client.messages
    .create({
      body: 'smallTalk: ' + message,
      from: '+16204593186',
      to: '+19082271594'
    })
    console.log(message1.sid)
  };
  

module.exports = {
  get,
  add,
  sendmessage,
};

