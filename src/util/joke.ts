import Axios, { AxiosResponse } from "axios";

/**
 * Get a joke from jokeapi.dev. If the length of tweet string is greater than 280 character then recurse till you find one.
 * @returns string
 */
export const getJokeTweet = async () => {
  //List of hashtags for the tweet
  const hashTags =
    "@metacollective9 #jokes #javascript #programming #dev #linux #java #programming #python #reactjs #DataScience #infosec #gamedev #BigData #serverless";

  const footerText = "From https://jokeapi.dev";

  //Get a random joke from jokeapi
  let joke: AxiosResponse = await Axios.get(
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
  );

  // \n will add line breaks to the tweet
  const tweet = `${joke.data.joke} \n\n ${hashTags} \n\n ${footerText}`;

  console.log(tweet.length);

  if (tweet.length <= 280) {
    return tweet;
  }

   return await getJokeTweet();
  
};

/**
 * Get a gif image from giphy.com
 * @returns image buffer
 */
export const getJokeImage = async () => {
  //get a giphy to go with this joke
  let giphy: AxiosResponse = await Axios.get(
    `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=bad+joke&rating=g`
  );

  //Get that giphy image as a buffer.
  const image: AxiosResponse = await Axios.get(giphy?.data.data.images.downsized_medium.url, {
    responseType: "arraybuffer",
  });

  return image;
};
