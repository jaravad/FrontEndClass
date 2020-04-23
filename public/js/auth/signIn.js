const form = document.forms['signInForm'];
form.addEventListener('submit', function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;

  autEmailPass(email, password);
});

const resetPassword = () => {
  const email = document.getElementById('resetEmail');
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(function () {
      Swal.fire(
        'Listo!',
        'Te hemos enviado un email para que restablezcas tu contraseña!',
        'success'
      );
    })
    .catch(function (error) {
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo enviar el correo para restablecer contraseña',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
};

const autEmailPass = (email, password) => {
  firebase.auth().signOut();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (result.user.displayName === 'empresa') {
        if (result.user.emailVerified) {
          Swal.fire(`Bienvenido!`, 'Has iniciado sesión!', 'success');
          window.location.href = 'https://shealweb.web.app/questions.html';
        } else {
          firebase.auth().signOut();
          Swal.fire({
            title: 'Error!',
            text: 'Lo sentimos, no has verificado tu cuenta',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      } else {
        Swal.fire(`Bienvenido!`, 'Has iniciado sesión!', 'success');
        window.location.href = 'https://shealweb.web.app/answer.html';
      }
    })
    .catch(() => {
      Swal.fire({
        title: 'Error!',
        text: 'Correo o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
};
