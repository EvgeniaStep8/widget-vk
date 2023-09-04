const posts = [];
const count = 10;
let countOfQueries = 0;

const callbackFunc = (result) => {
  result.response.items.forEach((item) => {
    posts.push(item);
  });
  renderPosts(result.response.items);
  setLocalStoragePosts(posts);
}

const getPosts = (offset) => {
  const script = document.createElement("SCRIPT");
  script.src =
  `https://api.vk.com/method/wall.get?owner_id=-9695053&domain=wildberries_shop/kartini_s_istoriei&offset=${offset}&count=${count}&filter=all&access_token=2914c1c32914c1c32914c1c30d2a0143a8229142914c1c34de7a3b7b2d6996882e55c7b&v=5.131&callback=callbackFunc`;
  document.getElementsByTagName("head")[0].appendChild(script);
}

const createPost = () => {
  const postTemplate = document.querySelector("#post-template").content;
  const post = postTemplate.querySelector(".post").cloneNode(true);

  return post;
};

const addPost = ({ attachments, text, likes, reposts, views }) => {
  const post = createPost();

  post.querySelector(".text").textContent = text;

  if (attachments.length > 0) {
    post.querySelector(".image").src = attachments[0].photo.sizes.find(
      (size) => size.type === "q"
    ).url;
  }

  post.querySelector(".likes").textContent = likes.count;
  post.querySelector(".reposts").textContent = reposts.count;
  post.querySelector(".views").textContent = views.count;

  document.querySelector(".posts").append(post);
};

const renderPosts = (data) => {
  data.forEach((post) => {
    addPost(post);
  });
};

const setLocalStoragePosts = (posts) => {
  posts = JSON.stringify(posts);
  localStorage.setItem("posts", posts);
}

const renderWidget = () => {
  if (localStorage.getItem("posts")) {
    JSON.parse(localStorage.getItem("posts")).forEach((post) => {
      posts.push(post);
    });
    renderPosts(posts);
  } else {
    getPosts(0);
  }
}

renderWidget();


widget.addEventListener("scroll", () => {
  if (widget.scrollHeight - widget.scrollTop === 503) {
    countOfQueries+=1;
    getPosts(countOfQueries * count);
  }
});
