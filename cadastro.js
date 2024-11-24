const spanErros = document.querySelector('#erros');

document.querySelector('#btn-cadastro').addEventListener('click', function (evt) {
    evt.preventDefault();

    const nomeInput = document.querySelector('#nome');
    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');
    const confirmarSenhaInput = document.querySelector('#confirmar-senha');

    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const senhaConfirmacao = confirmarSenhaInput.value;
    const emailRegex = /^[a-z-A-Z\d]+@[a-z]+\.[a-z]+$/;
    const senhaRegex = /[a-z\d]+/i;

    if (!/^[a-z]+$/i.test(nome)) {
        spanErros.innerText = 'O nome só pode conter letras'
        return;
    }

    if (nome.length > 40) {
        spanErros.innerText = 'Nome maior que o esperado'
        return
    }

    if (!emailRegex.test(email)) {
        spanErros.innerText = 'Email Inválido'
        return
    }

    if (email.length > 35) {
        spanErros.innerText = 'Email maior que o esperado'
        return
    }

    if (!senhaRegex.test(senha)) {
        spanErros.innerText = 'Caracteres inválidos para a senha';
    }

    if (validarSenha(senha)) {
        spanErros.innerText = validarSenha(senha);
        return
    }

    if (senhaConfirmacao !== senha) {
        spanErros.innerText = 'A senha precisa ser igual';
        return
    }

    spanErros.innerText = '';

    const usuarioAtual = { nome, email, senha }

    //Inicializando o armazenamento caso o mesmo não exista
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify([]));
    }

    const usuarios = obterUsuariosBD();

    const usuarioExiste = usuarios.find(usuario => {
        return usuario.email === usuarioAtual.email;
    })

    if (usuarioExiste) {
        spanErros.innerText = 'Email já cadastrado';
    } else {
        //Deslogando todos usuários
        usuarios.forEach(usuario => {
            usuario.login = false;
        })  

        usuarios.push({...usuarioAtual, login: true });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('Usuario cadastrado!\nChave usuarios: ' + localStorage.getItem('usuarios'));
        window.location.href = 'cursos.html';
    }

});

function obterUsuariosBD () {
    return JSON.parse(localStorage.getItem('usuarios'));
}


function validarSenha (senha) {
    let erro;

    if (!/\d/g.test(senha)) {
        erro = 'Necessário 1 número no mínimo na senha';
    }

    if (!/[a-z]/.test(senha)) {
        erro = 'Necessário 1 caractere minúsculo no mínimo na senha'
    }

    if (!/[A-Z]/.test(senha)) {
        erro = 'Necessário 1 caractere maiúsculo no mínimo na senha'
    }

    if (senha.length < 6) {
        erro = 'Necessário mais de 5 caracteres na senha'
    }
     
    if (senha.length > 24) {
        erro = 'Necessário menos de 25 caracteres na senha';
    }

    return erro;
}