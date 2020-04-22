data = {
  name: 'Jesus',
  addres: 'Colombia',
  tel: '3183519851',
};

firebase
  .auth()
  .createUserWithEmailAndPassword('jesusdavid2607@gmail.com', '123456789')
  .then((result) => {
    const configuracion = {
      url: 'http://localhost:5500/',
    };

    result.user.sendEmailVerification(configuracion);
  })
  .then((result) => {
    firebase.auth().signOut();

    Swal.fire(
      'Bienvenido!',
      'Te hemos enviado un email para que verifiques tu cuenta!',
      'success'
    );
  })
  .then((result) => {
    firebase.firestore().collection('test').doc('hola').set(data);
  })
  .catch((err) => console.error(err));
