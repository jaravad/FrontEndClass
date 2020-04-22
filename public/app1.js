// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();
var operadores = 0;

function iniciarSesion() {
  var correo = document.getElementById('emailoperador').value;
  var contraseña = document.getElementById('passwordoperador').value;
  var user = db
    .collection('users')
    .where('last', '==', correo)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        var password = doc.data().born;
        var email = doc.data().last;
        var validar = doc.data().state;
        empresa = doc.data().empresa;
        console.log(empresa);
        if (password != contraseña) {
          Swal.fire({
            title: 'Error!',
            text: 'Contraseña Erronea',
            icon: 'error',
          });
        } else if (validar == false) {
          Swal.fire({
            title: 'Advertencia',
            text: 'El usuario ha sido inhabilitado',
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        } else {
          Swal.fire({
            title: 'Bienvenido!',
            text: 'Su usuario esta habilitado',
            icon: 'success',
          });
          window.location.href = 'http://localhost:5500/answer.html';
        }
      });
    })
    .catch(function (error) {
      //Si el usuario no es encontrado no hace nada :/
      Swal.fire({
        title: 'Error!',
        text: 'El usuario no existe',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
}
