const form = document.forms['signUpForm'];
const auth = firebase.auth();
const db = firebase.database();
form.addEventListener('submit', function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const file = form['img'].files[0];
  const userData = {
    name: form['name'].value,
    doc: form['doc'].value,
    numdoc: form['numdoc'].value,
    img: '',
    empname: form['empname'].value,
    phone: form['numtel'].value,
  };

  // const auth = new Authentication();

  // auth.crearCuentaEmailPass(email, password, userData);

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      result.user.displayName = 'empresa';
      const configuracion = {
        url: 'http://localhost:5500/',
      };

      result.user.sendEmailVerification(configuracion);
    })
    .then((result) => {
      Swal.fire(
        `Listo!`,
        'Ya casi, verifica tu cuenta con el link que te enviamos por correo',
        'success'
      );
      form.reset();
      const refStorage = firebase
        .storage()
        .ref(`images/${auth.currentUser.uid}/${file.name}`);
      const task = refStorage.put(file);
      task.on(
        'state_changed',
        null,
        (err) => {
          console.log(err);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            userData.img = url;
            db.ref('empresas/' + auth.currentUser.uid).set(userData);

            console.log(url);
          });
        }
      );
    })

    .catch((err) => {
      console.log(err);
    });

  //try
});

// avoid letters in numeric inputs
function isInputNumber(evt) {
  const ch = String.fromCharCode(evt.which);

  if (!/[0-9]/.test(ch)) {
    evt.preventDefault();
  }
}

// To show selected file name
document
  .querySelector('.custom-file-input')
  .addEventListener('change', function (e) {
    let fileName = document.getElementById('img').files[0].name;
    let nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
  });

//no letters in phone and doc inputs
const numdoc = document.getElementById('numdoc');
numdoc.addEventListener('keypress', isInputNumber);
const numtel = document.getElementById('numtel');
numtel.addEventListener('keypress', isInputNumber);
