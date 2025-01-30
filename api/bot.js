require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] Xennium Twitter Bot started...`);

// Load tweets from JSON file
const tweets = JSON.parse(fs.readFileSync(path.join(__dirname, 'xennium_tweets.json'), 'utf8'));
console.log('✅ Tweets loaded:', tweets.length);

// Set up Twitter API client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

console.log('✅ Twitter client is set up.');

let lastTweet = "";

// Function to get a random tweet (avoiding duplicates)
const getRandomTweet = () => {
  let randomTweet;
  do {
    randomTweet = tweets[Math.floor(Math.random() * tweets.length)];
  } while (randomTweet === lastTweet);
  
  lastTweet = randomTweet;
  return randomTweet;
};

// Function to post a tweet
const postTweet = async () => {
  const tweet = getRandomTweet();
  try {
    console.log(`🚀 Posting tweet: "${tweet}"`);
    const response = await client.v2.tweet(tweet);
    console.log(`✅ Tweet posted successfully: https://twitter.com/user/status/${response.data.id}`);
  } catch (error) {
    console.error(`❌ Error posting tweet:`, error);
  }
};

// Run bot (Ensuring only one tweet)
(async () => {
  await postTweet();
  console.log('✅ Tweeting process completed. Exiting...');
  process.exit(0); // Ensures script exits after tweeting
})();
