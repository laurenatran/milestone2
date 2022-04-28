const casual = require("casual");
const fetch = require("node-fetch");

const userFeed = [];

const get = async () => {
  if (userFeed.length === 0) {
    userFeed.push({
      ques: "What is your favorite season?",
      res: "My favorite season would probably have to be the spring, I love all the cherry blossoms",
      photo_url: "/explore.jpg"
    });
    userFeed.push({
      ques: "What is your favorite color?",
      res: "My favorite color right now is a light pastel green. Pastels for spring are the best.",
      photo_url: "/explore2.jpg"
    });
    userFeed.push({
      ques: "What's your go-to meal to cook?",
      res: "I love cooking chicken noodle soup. It's so easy to make but people always love a classic.",
      photo_url: "/explore3.jpg"
    });
    userFeed.push({
      ques: "Have you ever played any sports?",
      res: "I used to play a lot of sports when I was younger. I played soccer, tennis, swimming, and basketball.",
      photo_url: "/explore4.jpg"
    });
  } else {
    return userFeed;
  }

  return userFeed;
};
  
module.exports = {
  get
};