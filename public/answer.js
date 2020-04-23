let n = 1;

const updateCount = () => {
  $('#questionsCount').html(n - 1);
};

const auth = firebase.auth();
const db = firebase.database();
const form = document.forms['answers'];

const questionsInfo = `<article class="col-12 col-md-6 pl-2 pr-2 mb-4">
<div class="w-100 h-100 soft p-3 d-flex align-items-center globe">
  <div class="ml-auto mr-sm-5">
    <h4 class="mb-2 font-weight-normal text-right">Preguntas</h4>
    <div class="d-flex align-items-start justify-content-end color-1">
      <h3 class="mr-4" id="questionsCount">0</h3>
      <i class="material-icons">
        help
      </i>
    </div>

    <h4 class="mb-2 font-weight-normal text-right">
      Tests realizados
    </h4>
    <div class="d-flex align-items-start justify-content-end color-2">
      <h3 class="mr-4">12</h3>
      <i class="material-icons">
        assessment
      </i>
    </div>
  </div>
</div>
</article>`;

const displayQuestions = (user) => {
  $('questionsContainer').html('');
  $('#questionsContainer').append(questionsInfo);

  const questionsRef = db.ref(`empresas/${user.uid}/preguntas`);
  questionsRef.once('value').then(function (snapshot) {
    const questions = snapshot.val();
    Object.keys(questions).forEach(function (question) {
      appendQuestion(questions[question]); // value
    });
  });
};

const evaluateForm = (user) => {};

auth.onAuthStateChanged(function (user) {
  if (user) {
    displayQuestions(user);
    //photo
    $('.dropdown-item').click((e) => {
      auth.signOut().then(() => {
        window.location.href = 'http://localhost:5500/';
      });
    });
    const photoRef = db.ref(`empresas/${user.uid}`);
    photoRef.once('value').then(function (snapshot) {
      $('#userPhoto').attr('src', snapshot.val().img);
      $('#empName').html(snapshot.val().empname);
    });

    /*form.addEventListener('submit', function handleFormSubmit(event) {
      event.preventDefault();
      addQuestion(user);
      form.reset();
      $('#addQuestion').modal('hide');
    });*/
  } else {
    // No user is signed in.
  }
});

const appendQuestion = (question) => {
  $('#questionsContainer')
    .append(`<article class="col-12 col-md-6 pl-2 pr-2 mb-4">
  <div class="w-100 soft p-3">
    <h5 class="text-dark ml-2">${question.title}</h5>
    <p class="mb-2">
      ${question.question}
    </p>
    <h6 class="text-secondary ml-2 mb-2">Opciones de respuesta</h6>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p${n}"
        id="p${n}a"
        value="${question.options.one.opValue}"
        required
      />
      <label class="custom-control-label" for="p${n}a">
        <p class="mb-2">
        ${question.options.one.opTitle}
        </p>
      </label>
    </div>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p${n}"
        id="p${n}b"
        value="${question.options.two.opValue}"
      />
      <label class="custom-control-label" for="p${n}b">
        <p class="mb-2">${question.options.two.opTitle}</p>
      </label>
    </div>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p${n}"
        id="p${n}c"
        value=${question.options.three.opValue}
      />
      <label class="custom-control-label" for="p${n}c">
        <p class="mb-2">${question.options.three.opTitle}</p>
      </label>
    </div>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p${n}"
        id="p${n}d"
        value="${question.options.four.opValue}"
      />
      <label class="custom-control-label" for="p${n}d">
        <p class="mb-2">${question.options.four.opTitle}</p>
      </label>
    </div>

  </div>
</article>`);
  n += 1;
  updateCount();
};

function enviarTest() {
  console.log('submitted');
  total = document.getElementsByClassName('col-12 col-md-6 pl-2 pr-2 mb-4').length -1;
  
    function answerScore (i) {
      var radiosNo = [document.getElementById(`p${i+1}a`),
      document.getElementById(`p${i+1}b`),
      document.getElementById(`p${i+1}c`),
      document.getElementById(`p${i+1}d`),];
      console.log(radiosNo)
      for (var j = 0, length = radiosNo.length; j < length; j++) {
        console.log(radiosNo[j]);   
        if (radiosNo[j].checked) {
            var answerValue = Number(radiosNo[j]);
        }
      }
      if (isNaN(answerValue)) {
        answerValue = 0;
      }
      //return answerValue;
    }
    answerScore(0)
    console.log()
    /*var puntaje = (answerScore('p1') + answerScore('p2') + answerScore('p3') + answerScore('p4')+ answerScore('p5'));
    console.log("puntaje: " + puntaje); // it works!
    var questionCountArray = document.getElementsByClassName('question');
    var totalPreguntas = 5;
    var mostrarPuntaje = "Preguntas Correctas: " + puntaje +"/" + totalPreguntas;
    document.getElementById('resultado').innerHTML = mostrarPuntaje;*/
  

};