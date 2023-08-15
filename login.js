function logar(){
    var login = document.getElementById('nome').value.trim()
    var senha = document.getElementById('senha').value.trim()
    if (login == "admin" && senha == "admin"){
        location.href = "dashboard.html"
    } else {
        alert ('Usuário ou senha incorreta')
    }
}

