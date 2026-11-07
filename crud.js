const BASE_URL = 'https://lion-school-phbo.onrender.com/alunos';

const getAlunos = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};
/*
  Uso: A função não recebe parâmetros e retorna uma Promise com a lista de todos os alunos.
  Basta chamar a função e tratar o retorno conforme a necessidade da sua aplicação.
*/

const getAluno = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  return data;
};
/*
  Uso: A função recebe o ID do aluno como parâmetro e retorna uma Promise com os dados desse aluno específico.
*/


const postAluno = async (aluno) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  };

  const response = await fetch(BASE_URL, options);
  const data = await response.json();
  return data;
};
/*
  Uso: Para usar, basta criar um objeto com os dados do novo aluno (sem o ID, pois o backend gera) 
  e enviá-lo como argumento para a função.

  const novoAluno = {
    nome: "Cleyde Gomes da Silva",
    email: "cleydegomes@gmail.com",
    celular: "1199988888",
    logradouro: "rua sem fim",
    bairro: "Sem nome",
    cidade: "Barueri",
    estado: "SP",
    cep: "18135300"
  };
  
  createAluno(novoAluno);
*/


const putAluno = async (aluno) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  };

  const response = await fetch(`${BASE_URL}/${aluno.id}`, options);
  const data = await response.json();
  return data;
};
/*
  Uso: Para usar, crie um objeto contendo obrigatoriamente a propriedade 'id' e os campos que deseja atualizar.
  Envie esse objeto como argumento para a função.

  const alunoAtualizado = {
    id: "5",
    nome: "Cleyde Gomes da Silva",
    email: "cleydegomes@gmail.com"
  };
  
  putAluno(alunoAtualizado);
*/

const deleteAluno = async (id) => {
  const options = {
    method: 'DELETE'
  };

  const res = await fetch(`${BASE_URL}/${id}`, options);
  const data = await res.json();
  return data;
};
/*
  Uso: A função recebe apenas o ID do aluno que deseja remover como parâmetro.
  
  deleteAluno(5);
*/

function salvarCadastro(){
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const celular = document.getElementById('celular').value
  const logradouro = document.getElementById('logradouro').value
  const bairro = document.getElementById('bairro').value
  const cidade = document.getElementById('cidade').value
  const estado = document.getElementById('estado').value
  const cep = document.getElementById('cep').value

  const aluno = {
      nome: nome,
      email: email,
      celular: celular,
      logradouro: logradouro,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      cep: cep
  }

  postAluno(aluno)
}

async function editarCadastro(id) {
  const aluno = await getAluno(id)

  const nome = document.getElementById('nome')
  const email = document.getElementById('email')
  const celular = document.getElementById('celular')
  const logradouro = document.getElementById('logradouro')
  const bairro = document.getElementById('bairro')
  const cidade = document.getElementById('cidade')
  const estado = document.getElementById('estado')
  const cep = document.getElementById('cep')


  nome.value = aluno.nome
  email.value = aluno.email
  celular.value = aluno.celular
  logradouro.value = aluno.logradouro
  bairro.value = aluno.bairro
  cidade.value = aluno.cidade
  estado.value = aluno.estado
  cep.value = aluno.cep
}

function limparCampos(){
  const nome = document.getElementById('nome')
  const email = document.getElementById('email')
  const celular = document.getElementById('celular')
  const logradouro = document.getElementById('logradouro')
  const bairro = document.getElementById('bairro')
  const cidade = document.getElementById('cidade')
  const estado = document.getElementById('estado')
  const cep = document.getElementById('cep')

  nome.value = ""
  email.value = ""
  celular.value = ""
  logradouro.value = ""
  bairro.value = ""
  cidade.value = ""
  estado.value = ""
  cep.value = ""
}

function removerCadastro(id){
  deleteAluno(id)
}

async function visualizarCadastro(){
  const corpo = document.getElementById('corpoTabela');
  const alunoArray =  await getAlunos()

  for(let i = 0; i < alunoArray.length; i++){
    const rowAtual = document.createElement('tr')
    
    const botaoEditar = document.createElement('button')
    const botaoRemover = document.createElement('button')

    botaoEditar.addEventListener('click', () => {editarCadastro(alunoArray[i].id)})
    botaoRemover.addEventListener('click', () => {removerCadastro(alunoArray[i].id)})

    botaoEditar.textContent = "Editar"
    botaoEditar.className = "botaoEditar"

    botaoRemover.textContent = "Remover"
    botaoRemover.className = "botaoRemover"

    const divAcoes = document.createElement('div')
    divAcoes.className = "divAcoes"
    divAcoes.append(botaoEditar, botaoRemover)

    const nomeSpan = document.createElement('td')
    const emailSpan = document.createElement('td')
    const celularSpan = document.createElement('td')
    const cidadeSpan = document.createElement('td')
    const ufSpan = document.createElement('td')
    const cepSpan = document.createElement('td')
    

    nomeSpan.textContent = alunoArray[i].nome
    emailSpan.textContent = alunoArray[i].email
    celularSpan.textContent = alunoArray[i].celular
    cidadeSpan.textContent = alunoArray[i].cidade
    ufSpan.textContent = alunoArray[i].estado
    cepSpan.textContent = alunoArray[i].cep

    rowAtual.append(nomeSpan, emailSpan, celularSpan, cidadeSpan, ufSpan, cepSpan, divAcoes)

    corpo.append(rowAtual)
  }
}
