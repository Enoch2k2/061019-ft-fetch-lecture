// what fetch is?
// how to make get requests and post requests with fetch
// how to map out our data to be used by the strong params of rails
// what promises are?
// how to use our promise to get json
// what to do when we have our json

const BASE_URL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('form').addEventListener('submit', createPost);
  loadPosts();
})

function createPost(e) {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;
  let ul = document.getElementById('posts');

  let params = {
    post: {
      title: title,
      content: content
    }
  }

  fetch(BASE_URL + '/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(resp => resp.json())
    .then(post => {
      ul.innerHTML += `<li>${post.title} - ${post.content}</li>`
    })
}

function loadPosts() {
  let ul = document.getElementById('posts');

  // we need to communicate with our rails server
  fetch(BASE_URL + "/posts")
    .then(response => {
      if(response.status != 200) {
        throw new Error(response.statusText);
      } else {
        return response.json()
      }
    })
    .then( posts => {
      debugger;
      posts.forEach(post => ul.innerHTML += `<li>${post.title} - ${post.content}</li>`)
    })
    .catch(errors => console.log(errors))
}