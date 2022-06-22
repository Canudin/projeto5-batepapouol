let msg = {
	from: "nome do usuário",
	to: "destinatário",
	text: "mensagem digitada",
	type: "message"
}

function send(msg){
  axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);
}
const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promise.then(processPromise);

function processPromise(serverData) {
	console.log(serverData.data);
}