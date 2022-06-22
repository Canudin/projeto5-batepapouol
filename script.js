const nome = prompt("Qual seu nome de usuário?");

function send() {
  let msgText = document.querySelector("input").value;
  let msg = {
    from: nome,
    to: "Todos",
    text: msgText,
    type: "message",
  };
  const sendMsg = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg);
  //sendMsg.catch(newName);
}

function getChat() {
  const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
  promise.then(renderChat);
}

function renderChat(serverData) {
  console.log(serverData.data);
  /*
  let chatFrom = from;
  let chatTo = ;
  let chatText = ;
  let chatType = ;
  const chatMsg = {chatFrom, chatTo, chatText, chatType};
  for (n = 0; n < serverData; n++){
  
  }*/
}
