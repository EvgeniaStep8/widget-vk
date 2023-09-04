const script = document.createElement("SCRIPT");
script.src =
  "https://api.vk.com/method/wall.get?owner_id=-9695053&domain=wildberries_shop/kartini_s_istoriei&offset=1&count=10&filter=all&access_token=2914c1c32914c1c32914c1c30d2a0143a8229142914c1c34de7a3b7b2d6996882e55c7b&v=5.131&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);

const widget = document.querySelector(".widget");

function callbackFunc(result) {
  console.log(result);
  renderPosts(result.response.items);
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
  data.forEach((post) => addPost(post));
};

const checkPosition = () => {
  const height = 500;
  const threshold = (height / 5) * 4;
};

widget.addEventListener("scroll", () => {
  console.log(widget.scrollTop);
});
