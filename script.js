let user = "";
let userObj = { name: user };
const chatRefresh = setInterval(getChat, 100);
const statusRefresh = setInterval(online, 5000);

setTimeout(login, 2000);
chatRefresh;

function login() {
  user = prompt("Digite seu usuário");
  userObj = { name: user };
  const sendUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userObj);
  console.log(userObj);
  sendUser.then(sendStatus);
  sendUser.catch(usedName);
}

function sendStatus() {
  console.log("enviei login");
  statusRefresh;
}
function online() {
  const online = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userObj);
  //console.log(userObj);
  console.log("online");
  online.catch(disconnected);
}
function usedName() {
  console.log("erro login");
  alert("Nome já está em uso");
  login();
}
function disconnected() {
  clearInterval(statusRefresh);
  console.log("erro conexão");
  alert("Você foi desconectado");
  login();
}
function send() {
  let msgText = document.querySelector("input").value;
  let msg = {
    from: user,
    to: "Todos",
    text: msgText,
    type: "message",
  };
  console.log(msg);
  axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg);
  document.querySelector("input").value = "";
}

function getChat() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promise.then(renderChat);
}

let allchat = document.querySelector(".chat");
function renderChat(serverData) {
  let chatFrom = "";
  let chatTo = "";
  let chatText = "";
  let chatType = "";
  const chatMsg = {chatFrom, chatTo, chatText, chatType};
  /*for (n=0; n<serverData; n++){

  }*/
}
