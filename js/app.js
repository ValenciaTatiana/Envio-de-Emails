document.addEventListener('DOMContentLoaded', function() {
    // Datos email
    const email = {
        email: "",
        cc: "",
        asunto: "",
        mensaje: ""
    }
    // Seleccionar elementos de la interfaz
    const inputEmail = document.querySelector("#email");
    const inputCC = document.querySelector("#cc");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnEnviar = document.querySelector("#formulario button[type='submit']");
    const btnReset = document.querySelector("#formulario button[type='reset']");
    const spinner = document.querySelector("#spinner");

    // Agregar eventos a los inputs
    inputEmail.addEventListener('input', validarInputs);
    inputCC.addEventListener('input', validarInputs);
    inputAsunto.addEventListener('input', validarInputs);
    inputMensaje.addEventListener('input', validarInputs);

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        resetFormulario(e)
        limpiarAlerta(formulario);

    });

    function enviarEmail(e) {
        e.preventDefault();

        // Quitamos la clase hidden para mostrar el spinner
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.add("hidden");

            resetFormulario(e)

            // Alerta exito
            const alertaExito = document.createElement("P");
            alertaExito.textContent = "Email Enviado Correctamente";
            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "uppercase", "rounded-lg", "mt-10", "font-bold", "text-sm");

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);

    }

    function validarInputs(e) {
        console.log(e.target.id === "cc" && e.target.value.trim() != '');
        
        if(e.target.id === "cc" && e.target.value.trim() != '') {
            if (!validarEmail(e.target.value)) {
                mostrarAlerta("El Email no es válido", e.target.parentElement);
                comprobarObjectEmail();
                return;
            }
        } else {
            email.cc = "opcional"
        }
        if (e.target.value.trim() === '' && e.target.id != "cc") {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarObjectEmail();
            return;
        }
        if (!validarEmail(e.target.value) && e.target.id === "email") {
            mostrarAlerta("El Email no es válido", e.target.parentElement);
            email[e.target.name] = "";
            comprobarObjectEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement)

        email[e.target.name] = e.target.value.trim().toLowerCase();

        console.log(email);

        comprobarObjectEmail();
    }

    function mostrarAlerta(mensaje, refencia) {
        limpiarAlerta(refencia);

        // Crear html para alerta
        const error = document.createElement("P");
        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center", "uppercase");

        refencia.appendChild(error)
    }

    function limpiarAlerta(refencia) {
        // Comprobar si ya existe una alerta
        const alerta = refencia.querySelector(".bg-red-600");
        if (alerta) {
            alerta.remove()
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarObjectEmail() {
        if(!Object.values(email).includes("")) {
            btnEnviar.classList.remove("opacity-50");
            btnEnviar.removeAttribute("disabled");
        } else {
            btnEnviar.classList.add("opacity-50");
            btnEnviar.setAttribute("disabled", true);
        }
    }

    function resetFormulario(e) {
        for (let key in email) {
            email[key] = "";
        }
        formulario.reset();
        comprobarObjectEmail();
    }
})