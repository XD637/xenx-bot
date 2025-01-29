require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

// Load tweets from JSON file
const tweets = JSON.parse(fs.readFileSync(path.join(__dirname, 'xennium_tweets.json'), 'utf8'));

console.log('Tweets loaded:', tweets.length);

// Set up Twitter API client using v2
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

console.log('Twitter client is set up.');

let lastTweet = "";

// Function to pick a random tweet (avoiding duplicates)
const getRandomTweet = () => {
  let randomTweet;
  do {
    randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
  } while (randomTweet === lastTweet); // Avoid repeating the last tweet
  lastTweet = randomTweet;
  return randomTweet;
};

// Function to post a tweet
const postTweet = async () => {
  const tweet = getRandomTweet();
  try {
    console.log(`Posting tweet: ${tweet}`);
    const response = await client.v2.tweet(tweet);
    console.log(`✅ Tweet posted successfully: ${response.data.id}`);
  } catch (error) {
    console.error(`❌ Error posting tweet: ${error}`);
  }
};

// Post an immediate test tweet
console.log('Posting an immediate test tweet...');
postTweet();

// Schedule tweets every 5 hours
console.log('Starting tweet loop...');
setInterval(postTweet, 5 * 60 * 60 * 1000); // 5 hours in milliseconds
