//bootstrap script used for form validation
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

/*
let passwordVisibility = document.getElementById('flexCheckDefault');
let password = document.getElementById('password');
let passwordVisibilityDiv = document.getElementById('password-visibility-div');

password.addEventListener('keydown', () => {
    passwordVisibilityDiv.style.display = "block";
    let visibility = "false";
    passwordVisibility.addEventListener("click", () => {
        if (visibility == "false") {
            password.type = "text";
            visibility = "true";
        }
        else {
            password.type = "password";
            visibility = "false";
        }
    })
})
*/