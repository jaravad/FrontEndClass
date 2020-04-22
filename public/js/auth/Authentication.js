class Authentication {
  autEmailPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
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
      })
      .catch(() => {
        Swal.fire({
          title: 'Error!',
          text: 'Correo o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }
}
