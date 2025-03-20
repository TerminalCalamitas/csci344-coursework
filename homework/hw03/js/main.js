import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "caleb";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    getUserData();
    getSuggestions();
    getStories();

    getPosts();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button aria-label="sign out" class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

async function getUserData() {
  const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  //console.log(data);
  showUserData(data);
}

function showUserData(userData) {
  const template = `
      <img src="${userData.thumb_url}" alt="${userData.username}'s profile picture" class="rounded-full w-16" />
      <h2 class="font-Comfortaa font-bold text-2xl">${userData.username}</h2>
  `;

  const container = document.querySelector("aside header");
  container.insertAdjacentHTML('beforeend', template);

}

async function getSuggestions() {
  const response = await fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  //console.log(data);
  renderSuggestions(data);
}

function renderSuggestions(suggestions) {
  suggestions.forEach(renderSuggestion)
}

function renderSuggestion(suggestion) {
  const template = `
    <section class="flex justify-between items-center mb-4 gap-2">
      <img src="${suggestion.thumb_url}" alt="${suggestion.username}'s profile picture" class="rounded-full" />
        <div class="w-[180px]">
          <p class="font-bold text-sm">${suggestion.username}</p>
          <p class="text-gray-500 text-xs">suggested for you</p>
        </div>
        <button aria-label="follow user" class="text-blue-500 text-sm py-2">follow</button>
    </section>
  `;

  const container = document.querySelector("aside div")
  container.insertAdjacentHTML('beforeend', template)

}

async function getStories() {
  const response = await fetch("https://photo-app-secured.herokuapp.com/api/stories/", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  //console.log(data);
  renderStories(data);
}

function renderStories(stories) {
  stories.forEach(renderStory)
}

function renderStory(story) {
  const template = `
    <div class="flex flex-col justify-center items-center">
      <img src="${story.user.thumb_url}" alt="${story.user.username}'s profile picture" class="rounded-full border-4 border-gray-300" />
      <p class="text-xs text-gray-500">${story.user.username}</p>
    </div>
  `;

  const container = document.querySelector("main header")
  container.insertAdjacentHTML('beforeend', template)

}

// implement remaining functionality below:
//await / async syntax:
async function getPosts() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/posts/?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    renderPosts(data);
}

function renderBookmarkButton(postJSON) {
  let template = '';

  if (postJSON.current_user_bookmark_id) {
    template = `
      <button aria-label="remove bookmark from post" onclick="window.removeBookmark(${postJSON.current_user_bookmark_id})">
          <i class="fas fa-bookmark"></i>
      </button>`;
    
  } else {
    template = `
      <button aria-label="add bookmark to post" onclick="window.createBookmark(${postJSON.id})">
          <i class="far fa-bookmark"></i>
      </button>`;
  }

  return template;
}

function renderLikeButton(postJSON) {
  let template = '';

  if (postJSON.current_user_like_id) {
    template = `
      <button aria-label="remove like from post" onclick="window.removeLike(${postJSON.current_user_like_id})">
          <i class="text-blue-500 fas fa-heart"></i>
      </button>`;
    
  } else {
    template = `
      <button aria-label="add like to post" onclick="window.addLike(${postJSON.id})">
          <i class="far fa-heart"></i>
      </button>`;
  }

  return template;
}

function getCommentSection(postJSON) {
  let template = '';
  let commentNum = Object.keys(postJSON.comments).length;

  if (commentNum > 1) {
      template = `<button aria-label="view all comments" class="text-blue-500 text-sm py-2">View all ${commentNum} comments</button>
<p class="text-sm mb-3">
                    <strong>${postJSON.comments[commentNum - 1].user.username}</strong>
                    ${postJSON.comments[commentNum - 1].text}
                </p>
                <p class="uppercase text-gray-500 text-xs">${postJSON.comments[commentNum - 1].display_time}</p>

      `;
  } else if (commentNum === 1){
    template = `<p class="text-sm mb-3">
                    <strong>${postJSON.comments[commentNum - 1].user.username}</strong>
                    ${postJSON.comments[commentNum - 1].text}
                </p>
                <p class="uppercase text-gray-500 text-xs">${postJSON.comments[commentNum - 1].display_time}</p>
    `;

  }

  return template
}

function renderPost(postJSON) {
  const template = `
        <!-- Post 1 -->
        <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${postJSON.user.username}</h3>
                <button aria-label="post options" class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${postJSON.image_url}" alt="${postJSON.alt_text}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${renderLikeButton(postJSON)}
                        <button aria-label="view comment section"><i class="far fa-comment"></i></button>
                        <button aria-label="share post"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                      ${renderBookmarkButton(postJSON)}
                    </div>
                </div>
                <p class="font-bold mb-3">${postJSON.likes.length} likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${postJSON.user.username}</strong>
                        ${postJSON.caption}
                    </p>
                </div>
                <p class="uppercase text-gray-500 text-xs">${postJSON.display_time}</p>
                ${getCommentSection(postJSON)}
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input aria-label="add a comment" type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button aria-label="post comment" class="text-blue-500 py-2">Post</button>
            </div>
        </section>
  `;
  const container = document.querySelector('main');
  container.insertAdjacentHTML('beforeend', template);
}

function renderPosts(postListJSON) {
  postListJSON.forEach(renderPost);
}


//await / async syntax:
async function getBookmarks() {
    const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}


//await / async syntax:
window.createBookmark = async function (post_id) {
    const postData = {
      "post_id": post_id
    };

    const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log(data);
}

//await / async syntax:
window.removeBookmark = async function (post_id) {
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${post_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}

//await / async syntax:
window.addLike = async function (post_id) {
    const postData = {
      "post_id": post_id
    };

    const response = await fetch("https://photo-app-secured.herokuapp.com/api/likes/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log(data);
}

//await / async syntax:
window.removeLike = async function (post_id) {
    console.log("AAAAAAHHHHH WHY ARE YOU KILLING ME :(")
    const response = await fetch(`https://photo-app-secured.herokuapp.com/api/likes/${post_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}


// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
