module.exports = [
  {
    "name": "tweets",
    "selector": ".tweet",
    "type": "array",
    "attributes": [
      {
        "name": "postBy",
        "selector": ".username",
        "type": "string"
      },
      {
        "name": "datePosted",
        "selector": ".tweet-timestamp",
        "type": "string"
      },
      {
        "name": "content",
        "selector": ".js-tweet-text-container",
        "type": "string"
      },
      {
        "name": "replies",
        "selector": ".ProfileTweet-action--reply",
        "type": "number"
      },
      {
        "name": "retweets",
        "selector": ".ProfileTweet-action--retweet",
        "type": "number"
      },
      {
        "name": "favourites",
        "selector": ".ProfileTweet-action--favorite",
        "type": "number"
      }
    ]
  },
  {
    "name": "info",
    "selector": ".ProfileHeaderCard",
    "type": "object",
    "attributes": [
      {
        "name": "username",
        "selector": ".username",
        "type": "string"
      },
      {
        "name": "summary",
        "selector": ".ProfileHeaderCard-bio",
        "type": "string"
      },
      // Think about having a seperate array
      // item for this one, there might be 
      // more than one item.
      {
        "name": "link",
        "selector": ".ProfileHeaderCard-url",
        "type": "string"
      },
      {
        "name": "joinDate",
        "selector": ".ProfileHeaderCard-joinDate",
        "type": "string"
      }
    ]
  },
  {
    "name": "stats",
    "selector": ".ProfileNav-list",
    "type": "object",
    "attributes": [
      {
        "name": "tweets",
        "selector": ".ProfileNav-item--tweets",
        "type": "number"
      },
      {
        "name": "following",
        "selector": ".ProfileNav-item--following",
        "type": "number"
      },
      {
        "name": "followers",
        "selector": ".ProfileNav-item--followers",
        "type": "number"
      },
      {
        "name": "likes",
        "selector": ".ProfileNav-item--favorites",
        "type": "number"
      }
      

    ]
  }
];