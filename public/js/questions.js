const updateCount = () => {
  $('#questionsCount').html($('#questionsContainer').children().length - 1);
};

updateCount();
const addQuestion = () => {
  const form = document.forms['newQuestion'];
  const question = {
    title: form['title'].value,
    question: form['question'].value,
    options: {
      one: { opTitle: form['op-1'].value, opValue: form['op-1-val'].value },
      two: { opTitle: form['op-2'].value, opValue: form['op-2-val'].value },
      three: { opTitle: form['op-3'].value, opValue: form['op-3-val'].value },
      four: { opTitle: form['op-4'].value, opValue: form['op-4-val'].value },
    },
  };

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
