// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCAN4OyXQI0Lk88aPt0xHm5ccKRL7nQxok',
  authDomain: 'shealweb.firebaseapp.com',
  databaseURL: 'https://shealweb.firebaseio.com',
  projectId: 'shealweb',
});

var db = firebase.firestore();
var operadores = 0;

//------------------OPERADORES --------------------------
db.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    operadores++;
    document.getElementById('numOperadores').innerHTML = `${operadores}`;
  });
  operadores = 0;
});

console.log(db.collection('users').doc('uFjwgTld1m0JblYaNBaV').born);

function crearUsuario() {
  var name = document.getElementById('orangeForm-name').value;
  var email = document.getElementById('orangeForm-email').value;
  var contraseña = document.getElementById('orangeForm-pass').value;

  db.collection('users')
    .add({
      first: name,
      last: email,
      born: contraseña,
      state: true,
      respuestas: [0, 0, 0, 0, 0],
      valor: [0, 0, 0, 0, 0],
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('orangeForm-name').value = '';
      document.getElementById('orangeForm-email').value = '';
      document.getElementById('orangeForm-pass').value = '';
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
}
//Mostrar operadores en tiempo real
var tabla = document.getElementById('operator');
db.collection('users').onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    if (doc.data().state == true) {
      //Revisa el estado para poner el boton habilitado o deshabilitado
      tabla.innerHTML += `
            <article class="person-card col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center">
            <img class="w-50" src="./images/faces/9.jpg" alt="Profile photo" />
            <p>${doc.data().first}</p>
            <p>${doc.data().last}</p>
            <p>${doc.data().born}</p>
            <a href="" type="button" class="btn btn-danger my-1" onclick=eliminar('${
              doc.id
            }')>Delete</a>
            <a href="" type="button" class="btn btn-primary my-1" data-toggle="modal" data-target="#modalRegisterForm" onclick=update('${
              doc.id
            }','${doc.data().first}','${doc.data().last}','${
        doc.data().born
      }')>Update</button>
            <a href="" type="button" class="btn btn-success my-1" onclick=habilitar('${
              doc.id
            }','${doc.data().first}','${doc.data().last}','${
        doc.data().born
      }')>Habilitado</a>
            </article>`;
    } else {
      tabla.innerHTML += `
            <article class="person-card col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center">
            <img class="w-50" src="./images/faces/9.jpg" alt="Profile photo" />
            <p>${doc.data().first}</p>
            <p>${doc.data().last}</p>
            <p>${doc.data().born}</p>
            <a href="" type="button" class="btn btn-danger my-1" onclick=eliminar('${
              doc.id
            }')>Delete</a>
            <a href="" type="button" class="btn btn-primary my-1" data-toggle="modal" data-target="#modalRegisterForm" onclick=update('${
              doc.id
            }','${doc.data().first}','${doc.data().last}','${
        doc.data().born
      }')>Update</button>
            <a href="" type="button" class="btn btn-warning my-1" onclick=habilitar('${
              doc.id
            }','${doc.data().first}','${doc.data().last}','${
        doc.data().born
      }')>Deshabilitado</a>
            </article>`;
    }
  });
});

//Funcion con error
function habilitar(id, name, email, contraseña) {
  console.log('ENTREEEEEEEEEEEEEEEEEEEE');
  db.collection('users')
    .doc(id)
    .set({
      first: name,
      last: email,
      born: contraseña,
      state: true,
    })
    .then(function () {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    })
    .catch(function (error) {
      console.error('BBBBBBBBBBBBBBBBBBBBBBB ', error);
    });
}
//A veces funciona, aveces no. Revisar
function eliminar(id) {
  db.collection('users')
    .doc(id)
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
}

//Arreglar el state
function update(id, name, email, contraseña) {
  document.getElementById('orangeForm-name').value = name;
  document.getElementById('orangeForm-email').value = email;
  document.getElementById('orangeForm-pass').value = contraseña;
  document.getElementById('modalDatos').innerHTML = `
          <h4 class="modal-title w-100 font-weight-bold">Actualizar operador</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>`;
  document.getElementById('updateUser').innerHTML = `
    <button class="btn btn-deep-orange" id="botonActualizar">Actualizar Usuario</button>`;
  var boton = document.getElementById('botonActualizar');
  boton.onclick = function () {
    var name = document.getElementById('orangeForm-name').value;
    var email = document.getElementById('orangeForm-email').value;
    var contraseña = document.getElementById('orangeForm-pass').value;
    db.collection('users')
      .doc(id)
      .set({
        first: name,
        last: email,
        born: contraseña,
        state: false,
      })
      .then(function () {
        console.log('Document successfully written!');
        document.getElementById('orangeForm-name').value = '';
        document.getElementById('orangeForm-email').value = '';
        document.getElementById('orangeForm-pass').value = '';
        document.getElementById('modalDatos').innerHTML = `
                <h4 class="modal-title w-100 font-weight-bold">Crear operador</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>`;
        document.getElementById('updateUser').innerHTML = `
                <button class="btn btn-deep-orange" id="botonActualizar" onclick="crearUsuario()">Crear Usuario</button>`;
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };
}
