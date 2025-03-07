import { getAccessToken } from "./get-token.js";
const rootURL = "https://photo-app-secured.herokuapp.com";

export async function createPost() {
    // get access token (like logging in) so that you can query for "your data":
    const token = await getAccessToken(rootURL, "caleb", "password");


    // data to sent to server:
    const postData = {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Iceland-1979445_%28cropped_3%29.jpg/800px-Iceland-1979445_%28cropped_3%29.jpg",
        caption: "This is an image of a arctic fox",
        alt_text: "A arctic fox",
    };

    // endpoint:
    const endpoint = `${rootURL}/api/posts/`;

    // send asynchronous request and wait for response headers:
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });

    // now wait for response body (also asynchronous):
    const data = await response.json();

    // now print to the console:
    console.log(data);
}

createPost();
