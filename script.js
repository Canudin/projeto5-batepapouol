let user = "";
let userObj = { name: user };
const chatRefresh = setInterval(getChat, 3000);
let statusRefresh = null;
let chatHtml = document.querySelector(".chat");
let chatApi = null;
let msgTo = "Todos";
let msgType = null;
let msgText = null;
let msg = {
  from: user,
  to: msgTo,
  text: msgText,
  type: msgType,
};
let participants = [];

//Start
setTimeout(login, 2000);

//Connection and Reconnection
function login() {
  chatRefresh;
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
  msg = {
    from: user,
    to: msgTo,
    text: msgText,
    type: msgType,
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
  participants = [];
  for (n = 0; n < chatApi.length; n++) {
    chatTime = chatApi[n].time;
    chatFrom = chatApi[n].from;
    chatTo = chatApi[n].to;
    chatText = chatApi[n].text;
    chatType = chatApi[n].type;
    if (chatType === "private_message" && (chatTo !== user || chatFrom !== user)) {
      const lastMessage = document.querySelector(".chat").lastElementChild;
      lastMessage.scrollIntoView();
    } else {
      chatHtml.innerHTML += `
        <div class="${chatType}">
          <p>
          <span class="time">${chatTime}</span>
          <span class="name"> ${chatFrom}</span>
          to 
          <span class="name">${chatTo}</span>: ${chatText}
          </p>
        </div>  
        `;
      const lastMessage = document.querySelector(".chat").lastElementChild;
      lastMessage.scrollIntoView();
    }
  }
}

function getParticipants() {
  const participantsPromisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
  participantsPromisse.then(renderParticipants);
}

function renderParticipants(answer) {
  const participants = answer.data;
  const menuParticipants = document.querySelector(".participants");
  for (n = 0; n < participants.length; n++) {
    menuParticipants.innerHTML += `
    <div class="contact" onclick="msgPrivate()">
      <ion-icon name="person-circle"></ion-icon>
      <p>${participants[n]}</p>
    </div>
    `;
  }
}

function showMenu() {
  const menuButton = document.querySelector(".menu");
  menuButton.style.display = "flex";
  getParticipants();
}
function showChat() {
  const menuButton = document.querySelector(".menu");
  menuButton.style.display = "none";
}
function msgTodos() {
  msgType = "message";
}
function msgPrivate() {
  msgType = "private_message";
}
