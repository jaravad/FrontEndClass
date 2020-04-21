let n = 1;

const updateCount = () => {
  $('#questionsCount').html(n - 1);
};

const auth = firebase.auth();
const db = firebase.firestore();

const displayQuestions = (user) => {
  db.collection('empresas')
    .doc(user.email)
    .collection('preguntas')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        appendQuestion(doc.data());
        n = snapshot.docs.length + 1;
        updateCount();
      });
    });
};

auth.onAuthStateChanged(function (user) {
  if (user) {
    displayQuestions(user);

    console.log(user.email);
    const form = document.forms['newQuestion'];
    form.addEventListener('submit', function handleFormSubmit(event) {
      event.preventDefault();
      addQuestion();
      form.reset();
      $('#addQuestion').modal('hide');
    });

    const addQuestion = () => {
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

      n += 1;

      db.collection('empresas')
        .doc(user.email)
        .collection('preguntas')
        .add(question)
        .then(appendQuestion(question));

      updateCount();
    };
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
        name="p1"
        id="p1a"
        value="${question.options.one.opValue}"
      />
      <label class="custom-control-label" for="p1a">
        <p class="mb-2">
        ${question.options.one.opTitle}
        </p>
      </label>
    </div>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p1"
        id="p1b"
        value="${question.options.two.opValue}"
      />
      <label class="custom-control-label" for="p1b">
        <p class="mb-2">${question.options.two.opTitle}</p>
      </label>
    </div>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p1"
        id="p1c"
        value=${question.options.three.opValue}
      />
      <label class="custom-control-label" for="p1c">
        <p class="mb-2">${question.options.three.opTitle}</p>
      </label>
    </div>

    <div class="d-flex align-items-center custom-control custom-radio">
      <input
        class="custom-control-input"
        type="radio"
        name="p1"
        id="p1d"
        value="${question.options.four.opValue}"
      />
      <label class="custom-control-label" for="p1d">
        <p class="mb-2">${question.options.four.opTitle}</p>
      </label>
    </div>

  </div>
</article>`);
  updateCount();
};
