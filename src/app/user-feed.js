const casual = require("casual");
const { userRecordConstructor } = require("firebase-functions/v1/auth");
const fetch = require("node-fetch");


const userFeed = [];

const get = async () => {
  if (userFeed.length === 0) {
    userFeed.push({
      ques: "What did you eat for breakfast today?",
      res: "I had cereal with toast and some eggs. The cereal was my favorite kind - Cinnamon Toast Crunch. It reminds me of my childhood",
      photo_url: "/profile.jpg"
    });
    userFeed.push({
      ques: "Have you left your house yet today? What did you do?",
      res: "I had class this morning at 8:30am that I had to go. Normally it is virtual but today we had presentations",
      photo_url: "/profile2.jpg"
    });
    userFeed.push({
      ques: "What's your favorite food?",
      res: "My favorite food are dumplings because I love the way they taste and I used to make them with my Grandma when I was younger!",
      photo_url: "/profile3.jpg"
    });
    userFeed.push({
      ques: "What's your biggest irrational fear?",
      res: "I'm terrified of getting attacked by a shark! Even in the most random places like a shallow pool",
      photo_url: "/profile4.jpg"
    });
    userFeed.push({
      ques: "Where would your dream vacation be?",
      res: "I would love to go to Greece. Not only is it beautiful and full of beaches but I am a huge Mamma Mia fan",
      photo_url: "/profile5.jpg"
    });
  } else {
    return userFeed;
  }

  return userFeed;
};

const add = async (user, question, answer) => {
  userFeed.push({
    photo_url: "/explore.jpg",
    //nameHandle: user.email,
    ques: question,
    res: answer,
  });
};

const sendmessage = async (user, message) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
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

