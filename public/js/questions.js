let n = 1;

const updateCount = () => {
  $('#questionsCount').html(n - 1);
};

const auth = firebase.auth();
const db = firebase.database();
const form = document.forms['newQuestion'];

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
  $('#questionsContainer').html('');
  $('#questionsContainer').append(questionsInfo);

  const questionsRef = db.ref(`empresas/${user.uid}/preguntas`);
  questionsRef.once('value').then(function (snapshot) {
    const questions = snapshot.val();
    Object.keys(questions).forEach(function (question) {
      appendQuestion(questions[question]); // value
    });
  });
};

const addQuestion = (user) => {
  const question = {
    title: `Pregunta ${n}`,
    question: form['question'].value,
    options: {
      one: { opTitle: form['op-1'].value, opValue: form['op-1-val'].value },
      two: { opTitle: form['op-2'].value, opValue: form['op-2-val'].value },
      three: {
        opTitle: form['op-3'].value,
        opValue: form['op-3-val'].value,
      },
      four: {
        opTitle: form['op-4'].value,
        opValue: form['op-4-val'].value,
      },
    },
  };

  db.ref(`empresas/${user.uid}/preguntas/p${n}`).set(question, function (
    error
  ) {
    if (error) {
      // The write failed...
    } else {
      appendQuestion(question);
      n += 1;
      updateCount();
    }
  });
};

auth.onAuthStateChanged(function (user) {
  if (user) {
    displayQuestions(user);
    //photo
    $('.dropdown-item').click((e) => {
      auth.signOut().then(() => {
        window.location.href = 'https://shealweb.web.app/';
      });
    });
    const photoRef = db.ref(`empresas/${user.uid}`);
    photoRef.once('value').then(function (snapshot) {
      $('#userPhoto').attr('src', snapshot.val().img);
      $('#empName').html(snapshot.val().empname);
    });

    form.addEventListener('submit', function handleFormSubmit(event) {
      event.preventDefault();
      addQuestion(user);
      form.reset();
      $('#addQuestion').modal('hide');
    });
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
