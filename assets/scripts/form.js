function maskTel(input) {
    let value = input.value;
    let valueOnlyNumber = value.replace(/\D/g, "");

    if (valueOnlyNumber.length > 11) {
        if (valueOnlyNumber.substring(0, 3) === '550') {
            value = value.substring(3);
        }
        if (valueOnlyNumber.substring(0, 2) === '55') {
            value = value.substring(2);
        }
    }

    value = value.substring(0, 15);
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d\d)(\d)/g, "($1) $2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    document.getElementById(input.id).value = value;
}

function validateName(name) {
    return name.length > 5 && name.length < 50;
}

function validateSubject(subject) {
    return subject.length > 5 && subject.length < 50;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\(\d{2}\)\s\d{4}-\d{4,5}$/gi;
    return re.test(String(phone).toLowerCase());
}

function validateMessage(message) {
    return message.length > 10 && message.length < 250;
}

function validateAccessKey(key) {
    const re = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm;
    return re.test(String(key).toLowerCase());
}

function validValues() {

    if (!validateAccessKey(document.getElementById('accessKey').value)) {
        return false;
    }

    if (!validateSubject(document.getElementById('subject').value)) {
        return false;
    }

    if (!validateName(document.getElementById('name').value)) {
        const errorElement = document.getElementById('submitErrorBoxMessage');
        errorElement.innerHTML = 'O nome deve ter entre 5 e 50 caracteres.';
        return false;
    }

    if (!validatePhone(document.getElementById('phone').value)) {
        const errorElement = document.getElementById('submitErrorBoxMessage');
        errorElement.innerHTML = 'O Telefone informado é inválido.';
        return false;
    }

    if (!validateEmail(document.getElementById('email').value)) {
        const errorElement = document.getElementById('submitErrorBoxMessage');
        errorElement.innerHTML = 'O Email informado é inválido.';
        return false;
    }

    if (!validateMessage(document.getElementById('message').value)) {
        const errorElement = document.getElementById('submitErrorBoxMessage');
        errorElement.innerHTML = 'A mensagem deve ter entre 10 e 250 caracteres.';
        return false;
    }

    return true;
}

async function handleSubmit(form) {

    function success() {
        document.getElementById("staticform").classList.add('d-none');
        document.getElementById("success-message").classList.remove('d-none');
        document.getElementById("successAnimation").classList.add('animated');
        document.getElementById("submitFormBtn").removeAttribute("disabled");
        document.getElementById("name").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("email").value = '';
        document.getElementById("message").value = '';
        document.getElementById("staticform").setAttribute('data-send', 'true');
    }

    const errorElement = document.getElementById('submitErrorBox');
    errorElement.classList.add("d-none");
    document.getElementById("submitFormBtn").setAttribute("disabled", 'true');

    if (document.getElementById("staticform").getAttribute('data-send') === "true") {
        document.getElementById('success-message-box').innerHTML =
            "<span class='font-Lato-Bold fs-3'>Mensagem já enviada!</span><br>\n" +
            "Calma esse coração <3, é só aguardar que entro em contato em breve.";
        setTimeout(function () {
            success();
        }, 2000);
        return false;
    }

    const formDataObj = Object.fromEntries(new FormData(form).entries());

    if (!validValues()) {
        errorElement.classList.remove("d-none");
        document.getElementById("submitFormBtn").removeAttribute("disabled");
        return false;
    }

    try {
        const res = await fetch('https://api.staticforms.xyz/submit', {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {'Content-Type': 'application/json'}
        });

        const json = await res.json();

        if (json.success) {

            setTimeout(function () {
                success();
            }, 3000);

        } else {
            const errorElement = document.getElementById('submitErrorBoxMessage');
            errorElement.classList.remove("d-none");
            errorElement.innerHTML = 'Ocorreu um erro no envio do formulário, atualize a página para tentar novamente ou volte mais tarde.';
            document.getElementById("submitFormBtn").removeAttribute("disabled");
        }
    } catch (e) {
        const errorElement = document.getElementById('submitErrorBoxMessage');
        errorElement.classList.remove("d-none");
        errorElement.innerHTML = 'Ocorreu um erro no envio do formulário, atualize a página para tentar novamente ou volte mais tarde.';
        document.getElementById("submitFormBtn").removeAttribute("disabled");
    }
}

function showForm() {
    document.getElementById("staticform").classList.remove('d-none');
    document.getElementById("success-message").classList.add('d-none');
    document.getElementById("successAnimation").classList.remove('animated');
}
