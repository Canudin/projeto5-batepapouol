let user = "";
let userObj = { name: user };
const chatRefresh = setInterval(getChat, 3000);
let statusRefresh = null;
let chatHtml = document.querySelector(".chat");
let chatApi = null;

//Start
getChat();
chatRefresh;
setTimeout(login, 2000);

//Connection and Reconnection
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
  statusRefresh = setInterval(online, 5000);
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

//Send Message
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

//Show messages
function getChat() {
  const getpromise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  getpromise.then(renderChat);
}

let chatTime = "";
let chatFrom = "";
let chatTo = "";
let chatText = "";
let chatType = "";

function renderChat(getpromise) {
  chatHtml.innerHTML = "";
  chatApi = getpromise.data;
  console.log(getpromise.data);

  for (n = 0; n < chatApi.length; n++) {
    chatTime = chatApi[n].time;
    chatFrom = chatApi[n].from;
    chatTo = chatApi[n].to;
    chatText = chatApi[n].text;
    chatType = chatApi[n].type;
    chatHtml.innerHTML += `
    <div class="${chatType}">
      ${chatTime} ${chatFrom} to ${chatTo}: ${chatText}
      </div>
    `;
    const lastMessage = document.querySelector(".chat").lastElementChild;
    lastMessage.scrollIntoView();
  }
}
