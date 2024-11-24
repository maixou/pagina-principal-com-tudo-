document.querySelectorAll('.arrow-down').forEach(span => {
    span.addEventListener('click', function (evt) {
        
        const span = evt.target;
        const nomeSpan = span.innerText;
        const anchorClasses = span.parentNode.querySelectorAll('.anchor-classes');
        console.log(anchorClasses)

        if (nomeSpan == 'Expandir') {
            span.innerText = 'Fechar';
            anchorClasses.forEach(div => {
                const anchorNode = div.querySelector('*');
                console.log(anchorNode)
                anchorNode.style.display = 'block'
            })
        } else {
            span.innerText = 'Expandir';
            anchorClasses.forEach(div => {
                const anchorNode = div.querySelector('*');
                anchorNode.style.display = 'none'
            })
        }
    })
})