'use strict'

const QuadroRegistro = () => {
    const quadroRegistroDOM = document.getElementById('QuadroRegistro')
    quadroRegistroDOM
    .classList.add('active')
    quadroRegistroDOM.addEventListener('click', IconeClose)
}
const DeletePage = () => 
{
    document.getElementById('DeletePage').classList.add('active')
}
const IconeClose = (event) => {
    console.log('IconeClose', event)
    const quadroRegistroDOM = document.getElementById('QuadroRegistro')
    const iconeCloseDOM = document.getElementById('IconeClose')
    const CancelarDOM = document.getElementById('Cancelar')

    if (event.target === quadroRegistroDOM || event.target === iconeCloseDOM || event.target === CancelarDOM){
        clearFields()
        document.getElementById('QuadroRegistro').classList.remove('active')
    }

}
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_funcionarios')) ?? []
const setLocalStorage = (dbFuncionarios) =>localStorage.setItem("db_funcionarios", JSON.stringify (dbFuncionarios))
//================ CRUD=================
//CRUD ==== DELETE ====
const deleteClient = (index) => {
    const db_funcionarios = readClient()
    db_funcionarios.splice(index, 1)
    setLocalStorage(db_funcionarios)
}
//CRUD ==== UPDATE ====
const updateClient = (index, client) => {
    const db_funcionarios = readClient()
    db_funcionarios[index] = client
    setLocalStorage(db_funcionarios)
}
//CRUD ==== READ ====
const readClient = () => getLocalStorage()
// CRUD ==== CREATE ====
const createClient = (client) => {
    const dbfuncionarios = getLocalStorage()
    dbfuncionarios.push (client)
    setLocalStorage(dbfuncionarios)
}
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}
//INTERAÇÃO COM LAYOUT ===========
const clearFields = () => {
    const fields = document.querySelectorAll('.campo-registro')
    fields.forEach(field => field.value = "")
}
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            telefoneRec: document.getElementById ('telefoneRec').value,
            cidade: document.getElementById('cidade').value,
            senha: document.getElementById('password').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updadeTable()
            IconeClose()
            alert ("cadastrado com sucesso")
        } else {
            updateClient(index, client)
            updadeTable()
            IconeClose()
        }

    }
}
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <div class="colunmSummary">
        <details>
        <summary onclick="toggleSummaryColor(this)">${client.nome}</summary>
        <tr><p>E-mail: ${client.email}</p></tr>
        <tr><p>Telefone: +${client.telefone} | Tel.recado: +${client.telefoneRec} </tr>
        <tr><p>Cidade: ${client.cidade}</tr>
        <tr><p><div class="button_editDelete">
            <button type="button" class="button-green" id="edit-${index}">Editar</button>
            <button type="button" class="button-red" id="delete-${index}">Excluir</button>
        </div>
        </tr>
        <tr>
        </details>
        </div>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}
const updadeTable = () => {
    const dbFuncionarios = readClient()
    clearTable()
    dbFuncionarios.forEach(createRow)
}
const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('telefone').value = client.telefone
    document.getElementById('telefoneRec').value = client.telefoneRec
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}
const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    QuadroRegistro()
}
const editDelete = (event) => {
    if (event.target.type == 'button'){
        const[action, index] = event.target.id.split('-')
            
            if (action == 'edit'){
                editClient(index)
            } else {
                DeletePage()
            }
    }  
}
updadeTable()
function toggleSummaryColor(summaryElement) {
    summaryElement.classList.toggle("summary-active")
}
function searchBox() {
    const searchValue = document.querySelector('.searchTxt').value.toLowerCase();
    const dbFuncionarios = readClient();
    const filteredFuncionarios = dbFuncionarios.filter((client) => client.nome.toLowerCase().includes(searchValue))

    clearTable();
    filteredFuncionarios.forEach(createRow);
}
function checkLogin(email, senha) {
    const dbFuncionarios = readClient();
    return dbFuncionarios.some((client) => client.email === email && client.senha === senha);
  }
function logar() {
    const email = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    if (checkLogin(email, senha)) {
        location.href = "dashboard.html"
    } else {
      alert('Email ou senha incorreta');
    }
}
    //EVENTOS
document.getElementById('CadastrarFuncionario')
    .addEventListener('click', QuadroRegistro)

document.getElementById('IconeClose')
    .addEventListener('click', IconeClose)

document.getElementById('Salvar')
    .addEventListener('click', saveClient)

document.getElementById('Cancelar')
    .addEventListener('click', IconeClose)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.querySelector('.searchTxt')
    .addEventListener('input', searchBox)

document.getElementById('DeletePage')
    .addEventListener('click', DeletePage)



