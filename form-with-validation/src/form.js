const d = document;

export default function SignUpForm() {
  const form = d.createElement('form');
  form.classList.add('sign-up-form');
  form.noValidate = true;
  form.method = "POST";
  form.action = "submit";

  form.innerHTML = `
    <fieldset>
      <legend class="form-title">Sign up for more great features!</legend>
      <div class="form-input-container">
        <label for="name">
          <div class="input-hint-bg">Name:</div>
          <div class="input-hint">Name:</div>
          <input type="text" id="name" name="name" required maxlength="30"/>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
      <div class="form-input-container">
        <label for="age">
          <div class="input-hint-bg">Age:</div>
          <div class="input-hint">Age:</div>
          <input type="number" id="age" name="age" required min="18" max="120"/>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
       <div class="form-input-container">
        <label for="mail">
          <div class="input-hint-bg">Email address:</div>
          <div class="input-hint">Email address:</div>
          <input type="email" id="mail" name="mail" required minlength="8"/>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
       <div class="form-input-container">
        <label for="password">
          <div class="input-hint-bg">Password:</div>
            <div class="input-hint">Password:</div>
          <input type="password" id="password" name="password" required minlength="12"/>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
       <div class="form-input-container">
        <label for="confirm-password">
          <div class="input-hint-bg">Password confirm:</div>
          <div class="input-hint">Password confirm:</div>
          <input type="password" id="confirm-password" name="confirm-password" required minlength="12"/>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
    </fieldset>
  `;

  return form;
}
