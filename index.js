require("dotenv").config();

const { KEY } = process.env;

const url =
  "https://api.vk.com/method/wall.get?owner_id=-76127976&domain=vk.com/wildberries_shop&offset=1&count=10&filter=all";

const createPost = () => {
  const postTemplate = document.querySelector("#post-template").content;
  const post = postTemplate.querySelector(".post").cloneNode(true);

  return post;
};

const addPost = ({ attachments, text, likes, reposts, views }) => {
  const post = createPost();

  post.querySelector(".text").textContent = text;

  post.querySelector(".image").src = attachments[0].photo.sizes.find(
    (size) => size.type === "q"
  ).url;

  post.querySelector(".likes").textContent = likes.count;
  post.querySelector(".reposts").textContent = reposts.count;
  post.querySelector(".views").textContent = views.count;

  document.querySelector(".posts").append(post);
};

const renderPosts = (data) => {
  data.forEach((post) => addPost(post));
};

fetch(url, {
  headers: {
    Authorization: `Bearer ${KEY}`,
  },
})
  .then((res) => res.json)
  .then((data) => renderPosts(data.items))
  .catch((err) => console.log(err));
