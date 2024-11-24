const spanErros = document.querySelector('#erros');

document.querySelector('#btn-login').addEventListener('click', function (evt) {
    evt.preventDefault();

    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');

    const email = emailInput.value;
    const senha = senhaInput.value;

    const usuarioAtual = { email, senha }

    const usuarios = obterUsuariosBD();

    usuarios.forEach(usuario => {
        usuario.login = false;
    })  

    const usuarioEncontrado = usuarios.find(usuario => {
        return usuario.email === usuarioAtual.email;
    })

    console.log(usuarioAtual)
    console.log(usuarioEncontrado)

    if (usuarioEncontrado) {
        if (usuarioAtual.senha === usuarioEncontrado.senha) {
            usuarioEncontrado.login = true;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            window.location.href = 'cursos.html';
        } else {
            spanErros.innerText = 'Senha incorreta';
        }
    } else {
        spanErros.innerText = 'Usuário inexistente';
    }

});

function obterUsuariosBD () {
    return JSON.parse(localStorage.getItem('usuarios'));
}