import { getAccessToken } from "./get-token.js";
const rootURL = "https://photo-app-secured.herokuapp.com";

export async function updatePost(postID) {
    // get access token (like logging in) so that you can query for "your data":
    const token = await getAccessToken(rootURL, "caleb", "password");

    // data to sent to server:
    const patchData = {
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/800px-Tux.svg.png",
        caption: "Testing the permissions of a token",
    };

    // endpoint:
    const endpoint = `${rootURL}/api/posts/${postID}/`;

    // send asynchronous request and wait for response headers:
    const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patchData),
    });

    // now wait for response body (also asynchronous):
    const data = await response.text();

    // now print to the console:
    console.log(endpoint);
    console.log(data);
}

updatePost(237);
