const d = document;
const inputsAreValid = [false, false, false, false];

function checkAge() {
  const ageInput = d.body.querySelector('#age');
  const ageError = d.body.querySelector('#age ~ .error');

  if (parseInt(ageInput.value, 10) < parseInt(ageInput.min, 10)) {
    ageError.textContent = "You must be over 18";
    ageError.className = "error active";
    setTimeout(() => {
      ageError.className = "error";
    }, 2500);
    return false;
  } else if (parseInt(ageInput.value, 10) > parseInt(ageInput.max, 10)) {
    ageError.textContent = "Max age = 122";
    ageError.className = "error active";
    setTimeout(() => {
      ageError.className = "error";
    }, 2500);
    return false;
  } else if (ageInput.value === "") {
    ageError.textContent = "Please enter a valid number";
    ageError.className = "error active";
    setTimeout(() => {
      ageError.className = "error";
    }, 2500);
    return false;
  }

  return true;
}

function checkEmail() {
  const emailInput = d.body.querySelector('#mail');
  const emailError = d.body.querySelector('#mail ~ .error');

  if (emailInput.validity.valueMissing) {
    emailError.textContent = "Please enter a valid email address";
    emailError.className = "error active";
    setTimeout(() => {
      emailError.className = "error";
    }, 2500);
    return false;
  } else if (emailInput.validity.tooShort) {
    emailError.textContent = `Minimum email length: ${emailInput.minLength}`;
    emailError.className = "error active";
    setTimeout(() => {
      emailError.className = "error";
    }, 2500);
    return false;
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = `${emailInput.value} is not a valid email`;
    emailError.className = "error active";
    setTimeout(() => {
      emailError.className = "error";
    }, 2500);
    return false;
  }

  return true;
}

function checkPassword() {
  const passwordInput = d.body.querySelector('#password');
  const confirmPasswordInput = d.body.querySelector('#confirm-password');
  const confirmPasswordError = d.body.querySelector('#confirm-password ~ .error');
  const inputHint = d.body.querySelector('#password ~ .input-hint');
  const confirmInputHint = d.body.querySelector('#confirm-password ~ .input-hint');

  if (passwordInput.validity.tooShort) {
    confirmPasswordError.textContent = `Minimum password length: ${passwordInput.minLength}`;
    confirmPasswordError.className = "error active";
    setTimeout(() => {
      confirmPasswordError.className = "error";
    }, 2500);
    return false;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = "Passwords must match";
    confirmPasswordError.className = "error active";
    inputHint.style.color = "hsla(0, 50%, 50%, 0.8)";
    confirmInputHint.style.color = "hsla(0, 50%, 50%, 0.8)";
    setTimeout(() => {
      confirmPasswordError.className = "error";
    }, 2500);
    return false;
  } else {
    inputHint.style.color = "hsla(110, 50%, 50%, 0.8)";
    confirmInputHint.style.color = "hsla(110, 50%, 50%, 0.8)";
  }

  return true;
}

function checkName() {
  const nameInput = d.body.querySelector('#name');
  const nameError = d.body.querySelector('#name ~ .error');

  const regex = /^[a-zA-Z\s]+$/;

  if (!regex.test(nameInput.value)) {
    nameError.textContent = "Your name may contain letters only.";
    nameError.className = "error active";
    setTimeout(() => {
      nameError.className = "error";
    }, 2500);
    return false;
  }

  return true;
}

export default function SignUpForm() {
  const form = d.createElement('form');
  form.classList.add('sign-up-form');
  form.noValidate = true;
  form.method = "POST";
  form.action = "submit";

  form.innerHTML = `
      <div class="form-input-container">
        <label for="name">
          <input type="text" id="name" name="name" required maxlength="30" placeholder=""/>
          <div class="input-hint-bg">Name:</div>
          <div class="input-hint">Name:</div>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
      <div class="form-input-container">
        <label for="age">
          <input type="number" id="age" name="age" required min="18" max="122" placeholder=""/>
          <div class="input-hint-bg">Age:</div>
          <div class="input-hint">Age:</div>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
       <div class="form-input-container">
        <label for="mail">
          <input type="email" id="mail" name="mail" required minlength="8" placeholder=""/>
          <div class="input-hint-bg">Email address:</div>
          <div class="input-hint">Email address:</div>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
       <div class="form-input-container">
        <label for="password">
          <input type="password" id="password" name="password" required minlength="12" placeholder=""/>
          <div class="input-hint-bg">Password:</div>
          <div class="input-hint">Password:</div>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
       <div class="form-input-container">
        <label for="confirm-password">
          <input type="password" id="confirm-password" name="confirm-password" required minlength="12" placeholder=""/>
          <div class="input-hint-bg">Password confirm:</div>
          <div class="input-hint">Password confirm:</div>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
    <button type="submit" class="submit-btn">Submit</button>
  `;

  const name = form.querySelector('#name');
  name.addEventListener(('blur'), () => {

    inputsAreValid[0] = checkName();
  });

  const age = form.querySelector('#age');
  age.addEventListener(('blur'), () => {
    inputsAreValid[1] = checkAge();
  });

  const email = form.querySelector('#mail');
  email.addEventListener(('blur'), () => {
    inputsAreValid[2] = checkEmail();
  });

  const confirmPassword = form.querySelector('#confirm-password');
  confirmPassword.addEventListener(('blur'), () => {
    inputsAreValid[3] = checkPassword();
  });

  form.addEventListener(('submit'), (ev) => {
    if (inputsAreValid.some((input) => input === false)) {
      ev.preventDefault;
    }
  });

  return form;
}
