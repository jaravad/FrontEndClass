// Initialize Cloud Firestore through Firebase

var auth = firebase.auth();
var db = firebase.firestore();
const rdb = firebase.database();

var operadores = 0;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $('.dropdown-item').click((e) => {
      auth.signOut().then(() => {
        window.location.href = 'https://shealweb.web.app/';
      });
    });
    const photoRef = rdb.ref(`empresas/${user.uid}`);
    photoRef.once('value').then(function (snapshot) {
      $('#userPhoto').attr('src', snapshot.val().img);
      $('#empName').html(snapshot.val().empname);
    });
  } else {
    // No user is signed in.
  }
});

//------------------OPERADORES --------------------------
db.collection('users').onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    operadores++;
    document.getElementById('numOperadores').innerHTML = `${operadores}`;
  });
  operadores = 0;
});

function crearUsuario() {
  let originalUser = firebase.auth().currentUser;
  var name = document.getElementById('orangeForm-name').value;
  var email = document.getElementById('orangeForm-email').value;
  var contraseña = document.getElementById('orangeForm-pass').value;

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user.uid);
      function arrayJSON(id, empresa, name, password, estado) {
        var data = {
          id: id,
          empresa: empresa,
          name: name,
          password: password,
          estado: estado,
        };
        return data;
      }
      var arrayData = arrayJSON(user.uid, email, name, contraseña, true);
      var task = firebase.database().ref('Operadores/' + user.uid);
      task.set(arrayData);
      auth.createUserWithEmailAndPassword(email, contraseña).then((result) => {
        result.user.updateProfile({
          displayName: 'usuario',
          phoneNumber: originalUser.uid,
        });
      });
      firebase.auth().updateCurrentUser(originalUser);
    }
  });
}
mostrar();
function mostrar() {
  var task = firebase.database().ref('Operadores/');
  task.on('child_added', function (data) {
    var Taskvalue = data.val();
    console.log(Taskvalue.name);
    var tabla = document.getElementById('operator');
    if (Taskvalue.estado == true) {
      tabla.innerHTML += `
            <article class="person-card col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center">
            <img class="w-50" src="./images/user.svg" alt="Profile photo" />
            <p>${Taskvalue.name}</p>
            
            <a href="" type="button" class="btn btn-danger my-1" onclick=eliminar('${Taskvalue.id}')>Delete</a>
            <a href="" type="button" class="btn btn-primary my-1" data-toggle="modal" data-target="#modalRegisterForm" onclick=update('${Taskvalue.id}','${Taskvalue.name}','${Taskvalue.empresa}','${Taskvalue.password}')>Update</button>
            <a href="" type="button" class="btn btn-success my-1" onclick=habilitar('${Taskvalue.id}','${Taskvalue.id}','${Taskvalue.name}','${Taskvalue.empresa}','${Taskvalue.password}')>Habilitado</a>
            </article>`;
    } else {
      tabla.innerHTML += `
            <article class="person-card col-4 col-sm-3 col-md-2 d-flex flex-column align-items-center">
            <img class="w-50" src="./images/user.svg" alt="Profile photo" />
            <p>${Taskvalue.name}</p>
            
            <a href="" type="button" class="btn btn-danger my-1" onclick=eliminar('${Taskvalue.id}')>Delete</a>
            <a href="" type="button" class="btn btn-primary my-1" data-toggle="modal" data-target="#modalRegisterForm" onclick=update('${Taskvalue.id}','${Taskvalue.name}','${Taskvalue.empresa}','${Taskvalue.password}')>Update</button>
            <a href="" type="button" class="btn btn-warning my-1" onclick=deshabilitar('${Taskvalue.id}','${Taskvalue.id}','${Taskvalue.name}','${Taskvalue.empresa}','${Taskvalue.password}','${Taskvalue.estado}')>Deshabilitado</a>
            </article>`;
    }
  });
}

function habilitar(id, name, email, contraseña) {
  function arrayJSON(id, empresa, name, password, estado) {
    var data = {
      id: id,
      empresa: empresa,
      name: name,
      password: password,
      estado: estado,
    };
    return data;
  }
  var arrayData = arrayJSON(id, name, email, contraseña, false);
  var task = firebase.database().ref('Operadores/' + id);
  task.set(arrayData);
}

function deshabilitar(id, name, email, contraseña) {
  function arrayJSON(id, empresa, name, password, estado) {
    var data = {
      id: id,
      empresa: empresa,
      name: name,
      password: password,
      estado: estado,
    };
    return data;
  }
  var arrayData = arrayJSON(id, name, email, contraseña, true);
  var task = firebase.database().ref('Operadores/' + id);
  task.set(arrayData);
}

function eliminar(id) {
  firebase
    .database()
    .ref('Operadores/' + id)
    .remove();
}

//Arreglar el state
function update(id, name, email, contraseña, estado) {
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
    function arrayJSON(id, empresa, name, password, estado) {
      var data = {
        id: id,
        empresa: empresa,
        name: name,
        password: password,
        estado: estado,
      };
      return data;
    }
    var arrayData = arrayJSON(id, email, name, contraseña, estado);
    var task = firebase.database().ref('Operadores/' + id);
    task.set(arrayData);

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
  };
}
