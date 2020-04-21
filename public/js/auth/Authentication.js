class Authentication {
  autEmailPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          Swal.fire(
            `Bienvenido! ${result.user.displayName}`,
            'Has iniciado sesión!',
            'success'
          );
          window.location.href = 'http://localhost:5500/questions.html';
        } else {
          firebase.auth().signOut();
          Swal.fire({
            title: 'Error!',
            text: 'Lo sentimos, no has verificado tu cuenta',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  crearCuentaEmailPass(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const configuracion = {
          url: 'http://localhost:5500/',
        };

        result.user
          .sendEmailVerification(configuracion)
          .then((result) => {
            firebase.auth().signOut();

            Swal.fire(
              'Bienvenido!',
              'Te hemos enviado un email para que verifiques tu cuenta!',
              'success'
            );
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: 'Error!',
              text: 'Error en enviar email de confirmación',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo crear el usuario',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  }
}
