const form = document.forms['signUpForm'];
form.addEventListener('submit', function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const userData = {
    email: form['email'].value,
    name: form['name'].value,
    doc: form['doc'].value,
    numdoc: form['numdoc'].value,
    img: form['img'].value,
    empname: form['empname'].value,
    phone: form['numtel'].value,
  };
  console.log(userData);

  const auth = new Authentication();

  auth.crearCuentaEmailPass(email, password, userData);

  const post = new Post();
  post.crearEmpresa(userData);

  form.reset(); //try
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