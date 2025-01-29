require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

// Load the tweets from the JSON file
const tweets = JSON.parse(fs.readFileSync(path.join(__dirname, 'xennium_tweets.json'), 'utf8'));

console.log('Tweets loaded:', tweets.length);

// Set up Twitter API client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

console.log('Twitter client is set up.');

const postTweet = async (tweet) => {
  try {
    console.log(`Posting tweet: ${tweet}`);
    await client.v1.tweet(tweet);
    console.log(`Tweet posted: ${tweet}`);
  } catch (error) {
    console.error(`Error posting tweet: ${error}`);
  }
};

// Post tweets every 5 hours
let tweetIndex = 0;
console.log('Starting tweet loop...');
setInterval(() => {
  console.log(`Posting tweet #${tweetIndex + 1}`);
  postTweet(tweets[tweetIndex]);
  tweetIndex = (tweetIndex + 1) % tweets.length; // Loop back to the first tweet after posting all
}, 5 * 60 * 60 * 1000); // Wait for 5 hours (in milliseconds)
