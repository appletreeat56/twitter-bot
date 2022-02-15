import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { twitterClient } from "./src/util/twitterApiClient";
import { getJokeImage, getJokeTweet } from "./src/util/joke";
import { AxiosResponse } from "axios";
import { MediaUpload } from "twitter-api-client";
export const twitterJokesBot: APIGatewayProxyHandler = async (_event, _context) => {
  let tweet: string = "";

  try {
    //get Joke
    tweet = await getJokeTweet();

    const image: AxiosResponse = await getJokeImage();

    //Upload media to twitter
    const media: MediaUpload = await twitterClient.media.mediaUpload({
      media: Buffer.from(image.data, "binary").toString("base64"),
    });

    //Send a tweet with joke and media
    await twitterClient.tweets.statusesUpdate({
      status: tweet,
      media_ids: media.media_id_string,
    });
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        joke: tweet,
        length: tweet.length
      },
      null,
      2
    ),
  };
};
