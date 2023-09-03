fetch(
  "https://oauth.vk.com/authorize?client_id=51741291&redirect_uri=https://widget-vk-posts.nomoredomainsicu.ru&scope=12&display=page&response_type=code"
)
  .then((res) => res.json)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
