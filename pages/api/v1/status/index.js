function status(requests, response) {
  response.status(200).json({"chave": "valor"});
}

export default status;