// Сервер

// Добавить в JSON пользователя

async function createClient() {
  let name = document.querySelector('.input-name')
  let surename = document.querySelector('.input-surename')
  let lastname = document.querySelector('.input-lastname')
  let list = document.querySelectorAll('.input-select')
  let contact = [];
  list.forEach(element => {
    let select = element.querySelector('.form-select')
    let input = element.querySelector('.form-controls')
    let objcontact = {
      type: select.value,
      value: input.value,
    }
    contact.push(objcontact)
  });
  let response = await fetch("http://localhost:3000/api/clients", {
    method: "POST",
    body: JSON.stringify({
      name: name.value,
      surname: surename.value,
      lastName: lastname.value,
      contacts: contact,
    }),
  });
  if (response.ok) {
    let result = await response.json();
    return result;
  } else {
    document.querySelector('.modal__wrapper').classList.remove('modal__wrapper-active')
    document.querySelector('.modal-error').textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!'
  }
}

// Редактирование пользователя JSON
async function editClient(id) {
  let name = document.querySelector('.input-name')
  let surename = document.querySelector('.input-surename')
  let lastname = document.querySelector('.input-lastname')
  let list = document.querySelectorAll('.input-select')
  let contact = [];
  list.forEach(element => {
    let select = element.querySelector('.form-select')
    let input = element.querySelector('.form-controls')
    let objcontact = {
      type: select.value,
      value: input.value,
    }
    contact.push(objcontact)
  });
  let response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: name.value,
      surname: surename.value,
      lastName: lastname.value,
      contacts: contact,
    }),
  });
  if (response.ok) {
    let result = await response.json();
    return result;
  } else {
    document.querySelector('.modal__wrapper').classList.remove('modal__wrapper-active')
    document.querySelector('.modal-error').textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!'
  }
}

// Удаление пользователя из JSON
async function deleteClient(id) {
  let response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    let result = await response.json();
    return result;
  }
}

// База данных
async function getClientList() {
  $table.append(prealoaderContent)
  let response = await fetch("http://localhost:3000/api/clients");
  prealoaderContent.remove()
  if (response.ok) {
    let result = await response.json();
    return result;
  }
}

// Поиск
async function searchClient(str) {
  let response = await fetch(`http://localhost:3000/api/clients?search=${str}`);
  if (response.ok) {
    let result = await response.json();
    return result;
  }
}

// Доступ к клиенту по ID
async function getClient(id) {
  let response = await fetch(`http://localhost:3000/api/clients/${id}`);
  if (response.ok) {
    let result = await response.json();
    return result;
  }
}

// Валидация
function validation(form) {
  let result = true;

  const allInputs = form.querySelectorAll('input');

  function removeError(input) {
    if (input.style.borderColor = 'red') {
      input.style.borderColor = "#ced4da"
    }
  }

  for (const input of allInputs) {

    if (input.dataset.required == "true") {
      removeError(input)
      if (input.value == '') {
        input.style.borderColor = "red"
        result = false;
      }
    }
  }

  return result;
}

// Флаги фильтрации
let sortColumnFlag = 'id',
  sortDirFlag = true

// Создание элементов
const $app = document.getElementById("app"),

  $searchHeader = document.createElement('header'),
  $searchContainer = document.createElement('div'),
  $searchContent = document.createElement('div'),
  $searchLogo = document.createElement('a'),
  $searchUser = document.createElement('input'),

  $main = document.createElement('main'),
  $section = document.createElement('section'),
  $container = document.createElement('div'),
  $tableHeader = document.createElement('h1'),
  $table = document.createElement("table"),
  $tableHead = document.createElement("thead"),
  $tableBody = document.createElement("tbody"),

  $tableHeadTr = document.createElement("tr"),
  $tableHeadThId = document.createElement("th"),
  $tableHeadThFIO = document.createElement("th"),
  $tableHeadThCreated = document.createElement("th"),
  $tableHeadThUpdated = document.createElement("th"),
  $tableHeadThContacts = document.createElement("th"),
  $tableHeadThEvents = document.createElement("th"),

  $buttonContent = document.createElement('div'),
  $buttonEvent = document.createElement('button'),

  prealoaderContent = document.createElement('div'),
  prealoader = document.createElement('div');

$searchHeader.classList.add('header')
$searchContainer.classList.add('container', 'header__container')
$searchContent.classList.add('header__content')
$searchLogo.classList.add('header__logo')
$searchUser.classList.add('header__input')
$section.classList.add('content')
$container.classList.add('container')
$tableHeader.classList.add('content__header')
$table.classList.add('table')
$tableBody.classList.add('table-tbody')
$tableHeadThId.classList.add('table-th', 'get-sort', 'sorted', 'get-sorted')
$tableHeadThFIO.classList.add('table-th', 'get-sort')
$tableHeadThCreated.classList.add('table-th', 'get-sort')
$tableHeadThUpdated.classList.add('table-th', 'get-sort')
$tableHeadThContacts.classList.add('table-th')
$tableHeadThEvents.classList.add('table-th')
prealoaderContent.classList.add('prealoader-content')
prealoader.classList.add('lds-dual-ring')
$buttonContent.classList.add('text-center')
$buttonEvent.classList.add('content__btn')

$searchLogo.innerHTML = `
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#9873FF">
</circle>
<path d="M17.2617 29.082C17.2617 30.0898 16.9102 30.8574 16.207 31.3848C15.5098 31.9121 14.4639 32.1758 13.0693 32.1758C12.3545 32.1758 11.7451 32.126 11.2412 32.0264C10.7373 31.9326 10.2656 31.792 9.82617 31.6045V29.3896C10.3242 29.624 10.8838 29.8203 11.5049 29.9785C12.1318 30.1367 12.6826 30.2158 13.1572 30.2158C14.1299 30.2158 14.6162 29.9346 14.6162 29.3721C14.6162 29.1611 14.5518 28.9912 14.4229 28.8623C14.2939 28.7275 14.0713 28.5781 13.7549 28.4141C13.4385 28.2441 13.0166 28.0479 12.4893 27.8252C11.7334 27.5088 11.1768 27.2158 10.8193 26.9463C10.4678 26.6768 10.21 26.3691 10.0459 26.0234C9.8877 25.6719 9.80859 25.2412 9.80859 24.7314C9.80859 23.8584 10.1455 23.1846 10.8193 22.71C11.499 22.2295 12.46 21.9893 13.7021 21.9893C14.8857 21.9893 16.0371 22.2471 17.1562 22.7627L16.3477 24.6963C15.8555 24.4854 15.3955 24.3125 14.9678 24.1777C14.54 24.043 14.1035 23.9756 13.6582 23.9756C12.8672 23.9756 12.4717 24.1895 12.4717 24.6172C12.4717 24.8574 12.5977 25.0654 12.8496 25.2412C13.1074 25.417 13.667 25.6777 14.5283 26.0234C15.2959 26.334 15.8584 26.624 16.2158 26.8936C16.5732 27.1631 16.8369 27.4736 17.0068 27.8252C17.1768 28.1768 17.2617 28.5957 17.2617 29.082ZM21.9287 26.6562L23.0977 25.1621L25.8486 22.1738H28.8721L24.9697 26.4365L29.1094 32H26.0156L23.1855 28.0186L22.0342 28.9414V32H19.3535V18.3242H22.0342V24.4238L21.8936 26.6562H21.9287ZM35.9824 21.9893C37.1426 21.9893 38.0508 22.4434 38.707 23.3516C39.3633 24.2539 39.6914 25.4932 39.6914 27.0693C39.6914 28.6924 39.3516 29.9492 38.6719 30.8398C37.998 31.7305 37.0781 32.1758 35.9121 32.1758C34.7578 32.1758 33.8525 31.7568 33.1963 30.9189H33.0117L32.5635 32H30.5156V18.3242H33.1963V21.5059C33.1963 21.9102 33.1611 22.5576 33.0908 23.4482H33.1963C33.8232 22.4756 34.752 21.9893 35.9824 21.9893ZM35.1211 24.1338C34.459 24.1338 33.9756 24.3389 33.6709 24.749C33.3662 25.1533 33.208 25.8242 33.1963 26.7617V27.0518C33.1963 28.1064 33.3516 28.8623 33.6621 29.3193C33.9785 29.7764 34.4766 30.0049 35.1562 30.0049C35.707 30.0049 36.1436 29.7529 36.4658 29.249C36.7939 28.7393 36.958 28.001 36.958 27.0342C36.958 26.0674 36.7939 25.3438 36.4658 24.8633C36.1377 24.377 35.6895 24.1338 35.1211 24.1338ZM41.5283 30.7432C41.5283 30.251 41.6602 29.8789 41.9238 29.627C42.1875 29.375 42.5713 29.249 43.0752 29.249C43.5615 29.249 43.9365 29.3779 44.2002 29.6357C44.4697 29.8936 44.6045 30.2627 44.6045 30.7432C44.6045 31.2061 44.4697 31.5723 44.2002 31.8418C43.9307 32.1055 43.5557 32.2373 43.0752 32.2373C42.583 32.2373 42.2021 32.1084 41.9326 31.8506C41.6631 31.5869 41.5283 31.2178 41.5283 30.7432Z" fill="white">
</path>
</svg>
`

$searchLogo.href = "#"

$searchUser.placeholder = 'Введите запрос'

$tableHeader.textContent = "Клиенты"

$tableHeadThId.textContent = "ID"
$tableHeadThFIO.textContent = "Фамилия Имя Отчество"
$tableHeadThCreated.textContent = "Дата и время создания"
$tableHeadThUpdated.textContent = "Последние изменение"
$tableHeadThContacts.textContent = "Контакты"
$tableHeadThEvents.textContent = "Действия"

$buttonEvent.innerHTML = `
<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"></path>
</svg>
Добавить клиента
`

$searchHeader.append($searchContainer)
$searchContainer.append($searchContent)
$searchContent.append($searchLogo)
$searchContent.append($searchUser)

$main.append($section)
$section.append($container)
$container.append($tableHeader)
$container.append($table)
$container.append($buttonContent)

$buttonContent.append($buttonEvent)

$tableHeadTr.append($tableHeadThId);
$tableHeadTr.append($tableHeadThFIO);
$tableHeadTr.append($tableHeadThCreated);
$tableHeadTr.append($tableHeadThUpdated);
$tableHeadTr.append($tableHeadThContacts);
$tableHeadTr.append($tableHeadThEvents);

$tableHead.append($tableHeadTr);
$table.append($tableHead);
$table.append($tableBody);

$app.append($searchHeader);
$app.append($main);

prealoaderContent.append(prealoader)

// Создание модального окна

$buttonEvent.addEventListener('click', () => {
  const $modal = document.createElement('div'),
    $modalDialog = document.createElement('div');

  document.body.classList.add('modal-open')
  $modal.classList.add('modal', 'fade', 'show')
  $modalDialog.classList.add('modal-dialog', 'modal-dialog-centered')

  $modal.style.display = 'block'
  $modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'

  document.body.append($modal)
  $modal.append($modalDialog)
  $modalDialog.append(prealoader)
  setTimeout(() => {
    $modal.remove()
    $modalDialog.remove()
    createModal()
  }, 200);
});

function createAnimationInput(input, span) {
  input.addEventListener('input', () => {
    if (input.value !== '') {
      span.classList.add('focus')
    } else {
      span.classList.remove('focus')
    }
  })
}

async function createModal() {

  const $modal = document.createElement('div'),
    $modalDialog = document.createElement('div'),
    $modalContent = document.createElement('div'),
    $modalForm = document.createElement('form'),

    $modalContentHeader = document.createElement('div'),
    $modalHeaderTitle = document.createElement('h5'),
    $modalHeaderButton = document.createElement('span'),

    $modalContentBody = document.createElement('div'),
    $modalBodyCard = document.createElement('div'),

    $modalСardInputName = document.createElement('input'),
    $modalСardInputSurename = document.createElement('input'),
    $modalСardInputLastname = document.createElement('input'),
    $modalСardLabelName = document.createElement('label'),
    $modalСardLabelSurename = document.createElement('label'),
    $modalСardLabelLastname = document.createElement('label'),
    $modalСardSpanName = document.createElement('span'),
    $modalСardSpanSurename = document.createElement('span'),
    $modalСardSpanLastname = document.createElement('span'),
    $modalСardSpanNameImportant = document.createElement('span'),
    $modalСardSpanSurenameImportant = document.createElement('span'),

    $modalBodyContacts = document.createElement('div'),
    $modalContactsForm = document.createElement('div'),
    $modalContactsButton = document.createElement('button'),

    $modalContentFooter = document.createElement('div'),
    $modalFooterError = document.createElement('div'),
    $modalFooterButton = document.createElement('button'),
    $modalFooterCancel = document.createElement('button');

  $modal.classList.add('modal')
  $modalDialog.classList.add('modal-dialog', 'modal-dialog-centered')
  $modalContent.classList.add('modal-content')

  $modalContentHeader.classList.add('modal-header')
  $modalHeaderTitle.classList.add('modal__header')
  $modalHeaderButton.classList.add('modal-close')

  $modalContentBody.classList.add('modal-body')
  $modalBodyCard.classList.add('container')

  $modalСardInputName.classList.add('modal-input', 'input-name')
  $modalСardInputSurename.classList.add('modal-input', 'input-surename')
  $modalСardInputLastname.classList.add('modal-input', 'input-lastname')
  $modalСardLabelName.classList.add('form-label')
  $modalСardLabelSurename.classList.add('form-label')
  $modalСardLabelLastname.classList.add('form-label')
  $modalСardSpanName.classList.add('input-label')
  $modalСardSpanSurename.classList.add('input-label')
  $modalСardSpanLastname.classList.add('input-label')

  $modalСardSpanNameImportant.classList.add('form-important')
  $modalСardSpanSurenameImportant.classList.add('form-important')

  $modalBodyContacts.classList.add('modal__new', 'text-center')
  $modalContactsButton.classList.add('modal__new-contact')
  $modalContactsForm.classList.add('contacts-form')

  $modalContentFooter.classList.add('modal__wrapper', 'modal__wrapper-active')
  $modalFooterError.classList.add('modal-error')
  $modalFooterButton.classList.add('modal-btn-success')
  $modalFooterCancel.classList.add('modal-btn-cancel')

  $modalFooterButton.type = 'submit'

  $modalBodyCard.style.padding = '0 30px'
  $modalForm.style.paddingBottom = '24px'
  $modalHeaderButton.style.cursor = 'pointer'

  $modalСardInputName.dataset.required = "true"
  $modalСardInputSurename.dataset.required = "true"

  $modalHeaderTitle.textContent = 'Новый клиент'
  $modalFooterButton.textContent = 'Сохранить'
  $modalFooterCancel.textContent = 'Отмена'

  $modalСardSpanNameImportant.textContent = '*'
  $modalСardSpanSurenameImportant.textContent = '*'

  $modalСardSpanName.textContent = 'Имя'
  $modalСardSpanSurename.textContent = 'Фамилия'
  $modalСardSpanLastname.textContent = 'Отчество'

  $modalHeaderButton.innerHTML = `
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"/>
  </svg>
  `

  $modalContactsButton.innerHTML = `
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.99998 3.66683C6.63331 3.66683 6.33331 3.96683 6.33331 4.3335V6.3335H4.33331C3.96665 6.3335 3.66665 6.6335 3.66665 7.00016C3.66665 7.36683 3.96665 7.66683 4.33331 7.66683H6.33331V9.66683C6.33331 10.0335 6.63331 10.3335 6.99998 10.3335C7.36665 10.3335 7.66665 10.0335 7.66665 9.66683V7.66683H9.66665C10.0333 7.66683 10.3333 7.36683 10.3333 7.00016C10.3333 6.6335 10.0333 6.3335 9.66665 6.3335H7.66665V4.3335C7.66665 3.96683 7.36665 3.66683 6.99998 3.66683ZM6.99998 0.333496C3.31998 0.333496 0.333313 3.32016 0.333313 7.00016C0.333313 10.6802 3.31998 13.6668 6.99998 13.6668C10.68 13.6668 13.6666 10.6802 13.6666 7.00016C13.6666 3.32016 10.68 0.333496 6.99998 0.333496ZM6.99998 12.3335C4.05998 12.3335 1.66665 9.94016 1.66665 7.00016C1.66665 4.06016 4.05998 1.66683 6.99998 1.66683C9.93998 1.66683 12.3333 4.06016 12.3333 7.00016C12.3333 9.94016 9.93998 12.3335 6.99998 12.3335Z" fill="#9873FF"/>
  </svg>
  Добавить контакт
  `

  document.body.append($modal)
  $modal.append($modalDialog)
  $modalDialog.append($modalContent)

  $modalContent.append($modalContentHeader)
  $modalContent.append($modalForm)
  $modalForm.append($modalContentBody)
  $modalForm.append($modalContentFooter)

  $modalContentHeader.append($modalHeaderTitle)
  $modalContentHeader.append($modalHeaderButton)

  $modalContentBody.append($modalBodyCard)

  $modalBodyCard.append($modalСardLabelName)
  $modalBodyCard.append($modalСardLabelSurename)
  $modalBodyCard.append($modalСardLabelLastname)

  $modalСardLabelName.append($modalСardInputName)
  $modalСardLabelSurename.append($modalСardInputSurename)
  $modalСardLabelLastname.append($modalСardInputLastname)

  $modalСardLabelName.append($modalСardSpanName)
  $modalСardLabelSurename.append($modalСardSpanSurename)
  $modalСardLabelLastname.append($modalСardSpanLastname)

  $modalСardSpanName.append($modalСardSpanNameImportant)
  $modalСardSpanSurename.append($modalСardSpanSurenameImportant)

  $modalContentBody.append($modalBodyContacts)
  $modalBodyContacts.append($modalContactsForm)
  $modalBodyContacts.append($modalContactsButton)

  $modalContentFooter.append($modalFooterError)
  $modalContentFooter.append($modalFooterButton)
  $modalContentFooter.append($modalFooterCancel)

  createAnimationInput($modalСardInputName, $modalСardSpanName)
  createAnimationInput($modalСardInputSurename, $modalСardSpanSurename)
  createAnimationInput($modalСardInputLastname, $modalСardSpanLastname)

  function createContacts() {
    const $modalContactsGroup = document.createElement('div'),

      $modalGroupSelect = document.createElement('select'),
      $modalSelectVk = document.createElement('option'),
      $modalSelectFB = document.createElement('option'),
      $modalSelectMail = document.createElement('option'),
      $modalSelectPhone = document.createElement('option'),
      $modalSelectHomephone = document.createElement('option'),

      $modalGroupInput = document.createElement('input'),
      $modalGroupReset = document.createElement('button');

    $modalContactsGroup.classList.add('input-group', 'input-select')
    $modalGroupSelect.classList.add('form-select')
    $modalGroupInput.classList.add('form-controls')
    $modalGroupReset.classList.add('model__btn-close')

    $modalGroupInput.placeholder = 'Введите данные контакта'

    $modalSelectVk.textContent = 'Вконтакте'
    $modalSelectFB.textContent = 'Facebook'
    $modalSelectMail.textContent = 'Email'
    $modalSelectPhone.textContent = 'Телефон'
    $modalSelectHomephone.textContent = 'ДопТелефон'

    $modalGroupReset.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_224_6681)">
      <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"></path>
      </g>
      <defs>
      <clipPath id="clip0_224_6681">
      <rect width="16" height="16" fill="white"></rect>
      </clipPath>
      </defs>
      </svg>
      `

    $modalGroupInput.dataset.required = "true"

    $modalSelectVk.value = 'Вконтакте'
    $modalSelectFB.value = 'Facebook'
    $modalSelectMail.value = 'Email'
    $modalSelectPhone.value = 'Телефон'
    $modalSelectHomephone.value = 'ДопТелефон'

    $modalContactsForm.append($modalContactsGroup)

    $modalContactsGroup.append($modalGroupSelect)
    $modalGroupSelect.append($modalSelectFB)
    $modalGroupSelect.append($modalSelectVk)
    $modalGroupSelect.append($modalSelectPhone)
    $modalGroupSelect.append($modalSelectHomephone)
    $modalGroupSelect.append($modalSelectMail)
    $modalContactsGroup.append($modalGroupInput)
    $modalContactsGroup.append($modalGroupReset)

    $modalGroupReset.addEventListener('click', () => {
      $modalContactsGroup.remove()
      if ($modalContactsForm.childNodes.length == 0) {
        $modalBodyContacts.style.padding = '0'
        $modalContactsButton.style.padding = '6px 0'
      }
      if ($modalContactsForm.childNodes.length < 10) {
        $modalContactsButton.classList.remove('hidden')
      }
    })
  }

  $modal.addEventListener('click', (e) => {
    if (e.target == $modalDialog || e.target == document.querySelector('.modal-close svg') || e.target == $modalFooterCancel) {
      document.body.classList.remove('modal-open')
      $modal.remove()
    }
  })

  $modalContactsButton.addEventListener('click', (e) => {
    e.preventDefault()
    if ($modalContactsForm.childNodes.length >= 0) {
      $modalBodyContacts.style.padding = '25px 30px'
      $modalContactsButton.style.padding = '25px 0px 0px 0px'
    }
    if ($modalContactsForm.childNodes.length < 10) {
      createContacts()
      document.querySelectorAll('.form-select').forEach(elem => {
        new Choices(elem, {
          searchEnabled: false,
          position: 'bottom',
          allowHTML: true,
          loadingText: '',
          noResultsText: '',
          noChoicesText: '',
          itemSelectText: '',
          uniqueItemText: '',
          customAddItemText: '',
        })
      })
    }
    if ($modalContactsForm.childNodes.length == 10) {
      $modalContactsButton.classList.add('hidden')
    }
  })

  $modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (validation($modalForm) == true) {
      $modalFooterButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#B89EFF" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      </circle>
      </svg>
      <span>Сохранить</span>
      `
      setTimeout(() => {
        $modalFooterButton.innerHTML = `Сохранить`
        createClient()
      }, 200);
    }
  })
}

// Отобразить пользователя в таблице
function createUserTr(oneUser) {
  const $userTr = document.createElement("tr"),
    $userId = document.createElement("th"),
    $contentId = document.createElement("div"),
    $userFIO = document.createElement("th"),
    $userCreated = document.createElement("th"),
    $contentCreated = document.createElement("div"),
    $spanCreated = document.createElement("span"),
    $userUpdated = document.createElement("th"),
    $contentUpdated = document.createElement("div"),
    $spanUpdated = document.createElement("span"),
    $userContacts = document.createElement("th"),
    $groupContacts = document.createElement("div"),
    $userEvents = document.createElement("th"),
    $EventGroup = document.createElement('div'),
    $buttonEdit = document.createElement('button'),
    $buttonDelete = document.createElement('button');

  const iconArr = {
    Вконтакте: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z"/>
    </svg>
    `,
    Facebook: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z"/>
    </svg>
    `,
    Email: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z"/>
    </svg>
    `,
    Телефон: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
    <circle cx="8" cy="8" r="8"/>
    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
    </g>
    </svg>
    `,
    ДопТелефон: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
    <circle cx="8" cy="8" r="8" />
    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
    </g>
    </svg>
    `,
    Другое: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z"/>
    </svg>
    `,
  };

  $userId.classList.add('table-td')
  $userFIO.classList.add('table-td')
  $userCreated.classList.add('table-td')
  $userUpdated.classList.add('table-td')
  $userContacts.classList.add('table-td')
  $userEvents.classList.add('table-td')
  $EventGroup.classList.add('table-event')
  $groupContacts.classList.add('table-contacts')
  $buttonDelete.classList.add('table-btn', 'table-cancel')
  $buttonEdit.classList.add('table-btn', 'table-success')
  $contentId.classList.add('table-id')
  $contentCreated.classList.add('table-create')
  $contentUpdated.classList.add('table-edit')

  $contentId.textContent = oneUser.id;
  $userFIO.textContent = oneUser.fio;
  $contentCreated.textContent = oneUser.createdAtDate;
  $spanCreated.textContent = oneUser.createdAtTime;
  $contentUpdated.textContent = oneUser.updatedAtDate;
  $spanUpdated.textContent = oneUser.updatedAtTime;

  oneUser.contacts.forEach(element => {
    $groupContacts.innerHTML += `
    <div class="tooltips"> ${iconArr[element.type]}
     <span class="tooltiptext">${element.value}</span>
    </div>
    `
  });

  $buttonDelete.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_216_224)">
    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"></path>
    </g>
    <defs>
    <clipPath id="clip0_216_224">
    <rect width="16" height="16" fill="white"></rect>
    </clipPath>
    </defs>
    </svg>
    Удалить
    `
  $buttonEdit.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_216_219)">
    <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z"></path>
    </g>
    <defs>
    <clipPath id="clip0_216_219">
      <rect width="16" height="16" fill="white"></rect>
    </clipPath>
    </defs>
    </svg>
    Изменить
    `

  $userTr.append($userId);
  $userId.append($contentId)
  $userTr.append($userFIO);
  $userTr.append($userCreated);
  $userTr.append($userUpdated);
  $userTr.append($userContacts);
  $userTr.append($userEvents);

  $userCreated.append($contentCreated)
  $contentCreated.append($spanCreated)
  $userUpdated.append($contentUpdated)

  $contentUpdated.append($spanUpdated)
  $userContacts.append($groupContacts)

  $userEvents.append($EventGroup)

  $EventGroup.append($buttonEdit)
  $EventGroup.append($buttonDelete)

  $buttonEdit.addEventListener('click', () => {
    $buttonEdit.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#9873FF" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      </circle>
    </svg>
    <span>Изменить</span>
    `
    setTimeout(() => {
      $buttonEdit.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_216_219)">
    <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z"></path>
    </g>
    <defs>
    <clipPath id="clip0_216_219">
      <rect width="16" height="16" fill="white"></rect>
    </clipPath>
    </defs>
    </svg>
    <span>Изменить</span>
    `
      editModal()
    }, 200);
    async function editModal() {
      const $modal = document.createElement('div'),
        $modalDialog = document.createElement('div'),
        $modalContent = document.createElement('div'),
        $modalForm = document.createElement('form'),

        $modalContentHeader = document.createElement('div'),
        $modalHeaderTitle = document.createElement('h5'),
        $modalHeaderId = document.createElement('span'),
        $modalHeaderButton = document.createElement('span'),

        $modalContentBody = document.createElement('div'),
        $modalBodyCard = document.createElement('div'),

        $modalСardInputName = document.createElement('input'),
        $modalСardInputSurename = document.createElement('input'),
        $modalСardInputLastname = document.createElement('input'),
        $modalСardLabelName = document.createElement('label'),
        $modalСardLabelSurename = document.createElement('label'),
        $modalСardLabelLastname = document.createElement('label'),
        $modalСardSpanName = document.createElement('span'),
        $modalСardSpanSurename = document.createElement('span'),
        $modalСardSpanLastname = document.createElement('span'),
        $modalСardSpanNameImportant = document.createElement('span'),
        $modalСardSpanSurenameImportant = document.createElement('span'),

        $modalBodyContacts = document.createElement('div'),
        $modalContactsForm = document.createElement('div'),
        $modalContactsButton = document.createElement('button'),

        $modalContentFooter = document.createElement('div'),
        $modalFooterError = document.createElement('div'),
        $modalFooterButton = document.createElement('button'),
        $modalFooterCancel = document.createElement('button');

      document.body.classList.add('modal-open')

      $modal.classList.add('modal')
      $modalDialog.classList.add('modal-dialog', 'modal-dialog-centered')
      $modalContent.classList.add('modal-content')

      $modalContentHeader.classList.add('modal-header')
      $modalHeaderTitle.classList.add('modal__header')
      $modalHeaderButton.classList.add('modal-close')

      $modalContentBody.classList.add('modal-body')
      $modalBodyCard.classList.add('container')

      $modalСardInputName.classList.add('modal-input', 'input-important', 'input-name')
      $modalСardInputSurename.classList.add('modal-input', 'input-important', 'input-surename')
      $modalСardInputLastname.classList.add('modal-input', 'input-lastname')
      $modalСardLabelName.classList.add('form-label')
      $modalСardLabelSurename.classList.add('form-label')
      $modalСardLabelLastname.classList.add('form-label')
      $modalСardSpanName.classList.add('input-label')
      $modalСardSpanSurename.classList.add('input-label')
      $modalСardSpanLastname.classList.add('input-label')

      $modalBodyContacts.classList.add('modal__new', 'text-center')
      $modalContactsButton.classList.add('modal__new-contact')
      $modalContactsForm.classList.add('contacts-form')

      $modalContentFooter.classList.add('modal__wrapper', 'modal__wrapper-active')
      $modalFooterError.classList.add('modal-error')
      $modalFooterButton.classList.add('modal-btn-success')
      $modalFooterCancel.classList.add('modal-btn-cancel')

      $modalFooterButton.type = 'submit'

      $modalBodyCard.style.padding = '0 30px'
      $modalForm.style.paddingBottom = '24px'
      $modal.style.display = 'block'
      $modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      $modalHeaderButton.style.cursor = 'pointer'

      $modalСardSpanName.textContent = 'Имя'
      $modalСardSpanSurename.textContent = 'Фамилия'
      $modalСardSpanLastname.textContent = 'Отчество'

      $modalСardSpanNameImportant.textContent = '*'
      $modalСardSpanSurenameImportant.textContent = '*'

      $modalСardInputName.dataset.required = "true"
      $modalСardInputSurename.dataset.required = "true"

      $modalHeaderTitle.textContent = 'Изменить данные'
      $modalHeaderId.textContent = ` id: ${oneUser.id}`
      $modalFooterButton.textContent = 'Сохранить'
      $modalFooterCancel.textContent = 'Удалить клиента'

      $modalHeaderButton.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"/>
      </svg>
      `

      $modalContactsButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_224_8628)">
      <path d="M7.99998 4.66659C7.63331 4.66659 7.33331 4.96659 7.33331 5.33325V7.33325H5.33331C4.96665 7.33325 4.66665 7.63325 4.66665 7.99992C4.66665 8.36659 4.96665 8.66659 5.33331 8.66659H7.33331V10.6666C7.33331 11.0333 7.63331 11.3333 7.99998 11.3333C8.36665 11.3333 8.66665 11.0333 8.66665 10.6666V8.66659H10.6666C11.0333 8.66659 11.3333 8.36659 11.3333 7.99992C11.3333 7.63325 11.0333 7.33325 10.6666 7.33325H8.66665V5.33325C8.66665 4.96659 8.36665 4.66659 7.99998 4.66659ZM7.99998 1.33325C4.31998 1.33325 1.33331 4.31992 1.33331 7.99992C1.33331 11.6799 4.31998 14.6666 7.99998 14.6666C11.68 14.6666 14.6666 11.6799 14.6666 7.99992C14.6666 4.31992 11.68 1.33325 7.99998 1.33325ZM7.99998 13.3333C5.05998 13.3333 2.66665 10.9399 2.66665 7.99992C2.66665 5.05992 5.05998 2.66659 7.99998 2.66659C10.94 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.94 13.3333 7.99998 13.3333Z" fill="#9873FF"/>
      </g>
      <defs>
      <clipPath id="clip0_224_8628">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      Добавить контакт
      `

      $modalСardInputName.value = oneUser.name
      $modalСardInputSurename.value = oneUser.surname
      $modalСardInputLastname.value = oneUser.lastName

      document.body.append($modal)
      $modal.append($modalDialog)
      $modalDialog.append($modalContent)

      $modalContent.append($modalContentHeader)
      $modalContent.append($modalForm)
      $modalForm.append($modalContentBody)
      $modalForm.append($modalContentFooter)

      $modalContentHeader.append($modalHeaderTitle)
      $modalHeaderTitle.append($modalHeaderId)
      $modalContentHeader.append($modalHeaderButton)

      $modalContentBody.append($modalBodyCard)

      $modalBodyCard.append($modalСardLabelName)
      $modalBodyCard.append($modalСardLabelSurename)
      $modalBodyCard.append($modalСardLabelLastname)

      $modalСardLabelName.append($modalСardInputName)
      $modalСardLabelSurename.append($modalСardInputSurename)
      $modalСardLabelLastname.append($modalСardInputLastname)

      $modalСardLabelName.append($modalСardSpanName)
      $modalСardLabelSurename.append($modalСardSpanSurename)
      $modalСardLabelLastname.append($modalСardSpanLastname)

      $modalСardSpanName.append($modalСardSpanNameImportant)
      $modalСardSpanSurename.append($modalСardSpanSurenameImportant)


      $modalContentBody.append($modalBodyContacts)
      $modalBodyContacts.append($modalContactsForm)
      $modalBodyContacts.append($modalContactsButton)

      $modalContentFooter.append($modalFooterError)
      $modalContentFooter.append($modalFooterButton)
      $modalContentFooter.append($modalFooterCancel)

      document.querySelectorAll('.input-important').forEach(elem => {
        if (elem.value !== '') {
          $modalСardSpanName.classList.add('focus') || $modalСardSpanSurename.classList.add('focus')
        } else {
          $modalСardSpanName.classList.remove('focus') || $modalСardSpanSurename.classList.remove('focus')
        }
      })

      if ($modalСardInputLastname.value !== '') {
        $modalСardSpanLastname.classList.add('focus')
      } else {
        $modalСardSpanLastname.classList.remove('focus')
      }

      createAnimationInput($modalСardInputName, $modalСardSpanName)
      createAnimationInput($modalСardInputSurename, $modalСardSpanSurename)
      createAnimationInput($modalСardInputLastname, $modalСardSpanLastname)

      function createContacts() {
        const $modalContactsGroup = document.createElement('div'),

          $modalGroupSelect = document.createElement('select'),
          $modalSelectVk = document.createElement('option'),
          $modalSelectFB = document.createElement('option'),
          $modalSelectMail = document.createElement('option'),
          $modalSelectPhone = document.createElement('option'),
          $modalSelectHomephone = document.createElement('option'),

          $modalGroupInput = document.createElement('input'),
          $modalGroupReset = document.createElement('button');

        $modalContactsGroup.classList.add('input-group', 'input-select')
        $modalGroupSelect.classList.add('form-select')
        $modalGroupInput.classList.add('form-controls')
        $modalGroupReset.classList.add('model__btn-close')

        $modalGroupInput.placeholder = 'Введите данные контакта'

        $modalSelectVk.textContent = 'Вконтакте'
        $modalSelectFB.textContent = 'Facebook'
        $modalSelectMail.textContent = 'Email'
        $modalSelectPhone.textContent = 'Телефон'
        $modalSelectHomephone.textContent = 'ДопТелефон'

        $modalGroupReset.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_224_6681)">
        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"></path>
        </g>
        <defs>
        <clipPath id="clip0_224_6681">
        <rect width="16" height="16" fill="white"></rect>
        </clipPath>
        </defs>
        </svg>
        `

        $modalGroupInput.dataset.required = "true"

        $modalSelectVk.value = 'Вконтакте'
        $modalSelectFB.value = 'Facebook'
        $modalSelectMail.value = 'Email'
        $modalSelectPhone.value = 'Телефон'
        $modalSelectHomephone.value = 'ДопТелефон'

        $modalContactsForm.append($modalContactsGroup)

        $modalContactsGroup.append($modalGroupSelect)
        $modalGroupSelect.append($modalSelectFB)
        $modalGroupSelect.append($modalSelectVk)
        $modalGroupSelect.append($modalSelectPhone)
        $modalGroupSelect.append($modalSelectHomephone)
        $modalGroupSelect.append($modalSelectMail)
        $modalContactsGroup.append($modalGroupInput)
        $modalContactsGroup.append($modalGroupReset)

        $modalGroupReset.addEventListener('click', () => {
          $modalContactsGroup.remove()
          if ($modalContactsForm.childNodes.length == 0) {
            $modalBodyContacts.style.padding = '0'
            $modalContactsButton.style.padding = '6px 0'
          }
          if ($modalContactsForm.childNodes.length < 10) {
            $modalContactsButton.classList.remove('hidden')
          }
        })
      }

      $modal.addEventListener('click', (e) => {
        if (e.target == $modalDialog || e.target == document.querySelector('.modal-close svg')) {
          document.body.classList.remove('modal-open')
          $modal.remove()
        }
      })

      $modalFooterCancel.addEventListener('click', (e) => {
        e.preventDefault()
        removeModal()
      })

      $modalContactsButton.addEventListener('click', (e) => {
        e.preventDefault()
        if ($modalContactsForm.childNodes.length >= 0) {
          $modalBodyContacts.style.padding = '25px 30px'
          $modalContactsButton.style.padding = '25px 0px 0px 0px'
        }
        if ($modalContactsForm.childNodes.length < 10) {
          createContacts()
          document.querySelectorAll('.form-select').forEach(elem => {
            new Choices(elem, {
              searchEnabled: false,
              position: 'bottom',
              allowHTML: true,
              loadingText: '',
              noResultsText: '',
              noChoicesText: '',
              itemSelectText: '',
              uniqueItemText: '',
              customAddItemText: '',
            })
          })
        }
        if ($modalContactsForm.childNodes.length == 10) {
          $modalContactsButton.classList.add('hidden')
        }
      })

      let client = await (getClient(oneUser.id))

      for (let i = 0; i < client.contacts.length; i++) {
        if ($modalContactsForm.childNodes.length >= 0) {
          $modalBodyContacts.style.padding = '25px 30px'
          $modalContactsButton.style.padding = '25px 0px 0px 0px'
        }
        const $modalContactsGroup = document.createElement('div'),

          $modalGroupSelect = document.createElement('select'),
          $modalSelectUser = document.createElement('option'),
          $modalSelectVk = document.createElement('option'),
          $modalSelectFB = document.createElement('option'),
          $modalSelectMail = document.createElement('option'),
          $modalSelectPhone = document.createElement('option'),
          $modalSelectHomephone = document.createElement('option'),

          $modalGroupInput = document.createElement('input'),
          $modalGroupReset = document.createElement('button');

        $modalContactsGroup.classList.add('input-group', 'input-select')
        $modalGroupSelect.classList.add('form-select')
        $modalGroupInput.classList.add('form-controls')
        $modalGroupReset.classList.add('model__btn-close')

        $modalSelectUser.textContent = client.contacts[i].type
        $modalSelectVk.textContent = 'Вконтакте'
        $modalSelectFB.textContent = 'Facebook'
        $modalSelectMail.textContent = 'Email'
        $modalSelectPhone.textContent = 'Телефон'
        $modalSelectHomephone.textContent = 'Доп.Телефон'

        $modalSelectUser.value = client.contacts[i].type
        $modalSelectVk.value = 'Вконтакте'
        $modalSelectFB.value = 'Facebook'
        $modalSelectMail.value = 'Email'
        $modalSelectPhone.value = 'Телефон'
        $modalSelectHomephone.value = 'ДопТелефон'

        $modalGroupReset.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_224_6681)">
        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"></path>
        </g>
        <defs>
        <clipPath id="clip0_224_6681">
        <rect width="16" height="16" fill="white"></rect>
        </clipPath>
        </defs>
        </svg>
        `

        $modalGroupInput.value = client.contacts[i].value

        $modalGroupInput.dataset.required = 'true'

        $modalContactsForm.append($modalContactsGroup)

        $modalContactsGroup.append($modalGroupSelect)
        $modalGroupSelect.append($modalSelectUser)
        $modalGroupSelect.append($modalSelectFB)
        $modalGroupSelect.append($modalSelectVk)
        $modalGroupSelect.append($modalSelectPhone)
        $modalGroupSelect.append($modalSelectHomephone)
        $modalGroupSelect.append($modalSelectMail)
        $modalContactsGroup.append($modalGroupInput)
        $modalContactsGroup.append($modalGroupReset)

        $modalGroupReset.addEventListener('click', (e) => {
          e.preventDefault()
          $modalContactsGroup.remove()
          if ($modalContactsForm.childNodes.length == 0) {
            $modalBodyContacts.style.padding = '0'
            $modalContactsButton.style.padding = '6px 0'
          }
          if ($modalContactsForm.childNodes.length < 10) {
            $modalContactsButton.classList.remove('hidden')
          }
        })
        document.querySelectorAll('.form-select').forEach(elem => {
          new Choices(elem, {
            searchEnabled: false,
            position: 'bottom',
            allowHTML: true,
            loadingText: '',
            noResultsText: '',
            noChoicesText: '',
            itemSelectText: '',
            uniqueItemText: '',
            customAddItemText: '',
          })
        })
        if (document.querySelectorAll('.input-select').length == 10) {
          $modalContactsButton.classList.add('hidden')
        }
      }

      $modalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (validation($modalForm) == true) {
          $modalFooterButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#B89EFF" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
              <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
          </svg>
          <span>Сохранить</span>
          `
          setTimeout(() => {
            $modalFooterButton.innerHTML = `Сохранить`
            editClient(oneUser.id)
          }, 200);
        }
      })
    }

  })
  function removeModal() {
    const $modal = document.createElement('div'),
      $modalDialog = document.createElement('div'),
      $modalContent = document.createElement('div'),

      $modalContentHeader = document.createElement('div'),
      $modalHeaderTitle = document.createElement('h5'),
      $modalHeaderButton = document.createElement('span'),

      $modalContentBody = document.createElement('div'),
      $modalBodyText = document.createElement('p'),

      $modalContentFooter = document.createElement('div'),
      $modalFooterButton = document.createElement('button'),
      $modalFooterCancel = document.createElement('button');

    document.body.classList.add('modal-open')

    $modal.classList.add('modal', 'fade', 'show')
    $modalDialog.classList.add('modal-dialog', 'modal-dialog-centered')
    $modalContent.classList.add('modal-content')

    $modalContentHeader.classList.add('modal-header')
    $modalHeaderTitle.classList.add('modal__header')
    $modalHeaderButton.classList.add('modal-close')

    $modalContentBody.classList.add('modal__body')
    $modalBodyText.classList.add('modal-text')

    $modalContentFooter.classList.add('modal__wrapper', 'modal__wrapper-active')
    $modalFooterButton.classList.add('modal-btn-success')
    $modalFooterCancel.classList.add('modal-btn-cancel')

    $modal.style.display = 'block'
    $modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    $modalHeaderTitle.style.textAlign = 'center'
    $modalHeaderTitle.style.marginBottom = '11px'
    $modalContentFooter.style.paddingBottom = '28px'
    $modalHeaderButton.style.cursor = 'pointer'

    $modalHeaderTitle.textContent = 'Удалить клиента'
    $modalBodyText.textContent = 'Вы действительно хотите удалить данного клиента?'
    $modalFooterButton.textContent = 'Удалить'
    $modalFooterCancel.textContent = 'Отмена'

    $modalHeaderButton.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"/>
      </svg>
      `

    document.body.append($modal)
    $modal.append($modalDialog)
    $modalDialog.append($modalContent)

    $modalContent.append($modalContentHeader)
    $modalContent.append($modalContentBody)
    $modalContent.append($modalContentFooter)

    $modalContentHeader.append($modalHeaderTitle)
    $modalContentHeader.append($modalHeaderButton)

    $modalContentBody.append($modalBodyText)

    $modalContentFooter.append($modalFooterButton)
    $modalContentFooter.append($modalFooterCancel)

    $modal.addEventListener('click', (e) => {
      if (e.target == $modalDialog || e.target == document.querySelector('.modal-close svg') || e.target == $modalFooterCancel) {
        document.body.classList.remove('modal-open')
        $modal.remove()
      }
    })

    $modalFooterButton.addEventListener('click', () => {
      deleteClient(oneUser.id)
    })
  }

  $buttonDelete.addEventListener('click', (e) => {
    e.preventDefault()
    $buttonDelete.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="16px" height="16px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#F06A4D" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      </circle>
    </svg>
    <span>Удалить</span>
    `
    setTimeout(() => {
      $buttonDelete.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_216_224)">
    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"></path>
    </g>
    <defs>
    <clipPath id="clip0_216_224">
      <rect width="16" height="16" fill="white"></rect>
    </clipPath>
    </defs>
    </svg>
    <span>Удалить</span>
    `
      removeModal()
    }, 200);
  })

  return $userTr
}

// Рендер таблицы
async function render() {
  $tableBody.innerHTML = '';

  let data = await getClientList()

  let copyListData = [...data]

  // Подготовка

  function getDate(str) {
    let options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    let date = new Date(str);
    return date.toLocaleString("ru", options);
  }

  function getTime(str) {
    let options = {
      hour: "numeric",
      minute: "numeric",
    };
    let date = new Date(str);
    return date.toLocaleString("ru", options);
  }

  for (const oneUser of copyListData) {
    oneUser.fio = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastName;
    oneUser.createdAtDate = getDate(oneUser.createdAt);
    oneUser.createdAtTime = getTime(oneUser.createdAt);
    oneUser.updatedAtDate = getDate(oneUser.updatedAt);
    oneUser.updatedAtTime = getTime(oneUser.updatedAt);
  }

  // Сортировка
  copyListData = copyListData.sort(function (a, b) {
    let sort = a[sortColumnFlag] < b[sortColumnFlag];
    if (!sortDirFlag) sort = a[sortColumnFlag] > b[sortColumnFlag]
    if (sort) return -1
  })

  // Поиск
  if ($searchUser.value.trim() !== '') {
    let searchstr = await searchClient($searchUser.value.trim())
    copyListData = copyListData.filter(function (oneUser) {
      for (const iterator of searchstr) {
        if (oneUser['fio'].includes(iterator.surname + ' ' + iterator.name + ' ' + iterator.lastName)) return true
      }
    })
  }

  // Отрисовка
  for (const oneUser of copyListData) {
    const $newTr = createUserTr(oneUser)

    $tableBody.append($newTr)
  }
}

render()


// Клики сортировки
$tableHeadThId.addEventListener('click', function (e) {
  e.currentTarget.classList.add('sorted')
  if (e.currentTarget.classList.contains('sorted')) {
    e.currentTarget.classList.toggle('get-sorted')
  }
  $tableHeadThFIO.classList.remove('sorted')
  $tableHeadThCreated.classList.remove('sorted')
  $tableHeadThUpdated.classList.remove('sorted')
  $tableHeadThFIO.classList.remove('get-sorted')
  $tableHeadThCreated.classList.remove('get-sorted')
  $tableHeadThUpdated.classList.remove('get-sorted')
  sortColumnFlag = 'id'
  sortDirFlag = !sortDirFlag
  render()
})

$tableHeadThFIO.addEventListener('click', function (e) {
  e.currentTarget.classList.add('sorted')
  if (e.currentTarget.classList.contains('sorted')) {
    e.currentTarget.classList.toggle('get-sorted')
  }
  $tableHeadThId.classList.remove('sorted')
  $tableHeadThCreated.classList.remove('sorted')
  $tableHeadThUpdated.classList.remove('sorted')
  $tableHeadThId.classList.remove('get-sorted')
  $tableHeadThCreated.classList.remove('get-sorted')
  $tableHeadThUpdated.classList.remove('get-sorted')
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  render()
})

$tableHeadThCreated.addEventListener('click', function (e) {
  e.currentTarget.classList.add('sorted')
  if (e.currentTarget.classList.contains('sorted')) {
    e.currentTarget.classList.toggle('get-sorted')
  }
  $tableHeadThId.classList.remove('sorted')
  $tableHeadThFIO.classList.remove('sorted')
  $tableHeadThUpdated.classList.remove('sorted')
  $tableHeadThId.classList.remove('get-sorted')
  $tableHeadThFIO.classList.remove('get-sorted')
  $tableHeadThUpdated.classList.remove('get-sorted')
  sortColumnFlag = 'createdAt'
  sortDirFlag = !sortDirFlag
  render()
})

$tableHeadThUpdated.addEventListener('click', function (e) {
  e.currentTarget.classList.add('sorted')
  if (e.currentTarget.classList.contains('sorted')) {
    e.currentTarget.classList.toggle('get-sorted')
  }
  $tableHeadThId.classList.remove('sorted')
  $tableHeadThFIO.classList.remove('sorted')
  $tableHeadThCreated.classList.remove('sorted')
  sortColumnFlag = 'updatedAt'
  sortDirFlag = !sortDirFlag
  render()
})


// Фильтр
let timeout = 0;
$searchUser.addEventListener('input', () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    render()
  }, 300)
})
