require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

module.exports = async (req, res) => {
  try {
    // Check if the request method is POST (optional)
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Twitter API client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    // Sample tweet
    const tweetText = "Automated tweet from Xennium Bot! #Xennium #Blockchain";
    
    // Post the tweet
    const response = await client.v2.tweet(tweetText);
    
    // Return success response
    return res.status(200).json({ success: true, tweet: response.data });
  } catch (error) {
    console.error("Error posting tweet:", error);
    return res.status(500).json({ error: error.message });
  }
};
