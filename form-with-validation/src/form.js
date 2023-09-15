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
          <input type="text" id="name" name="name" required maxlength="30" placeholder=""/>
          <div class="input-hint-bg">Name:</div>
          <div class="input-hint">Name:</div>
          <div class="error" aria-live="polite"></div>
        </label>
      </div>       
      <div class="form-input-container">
        <label for="age">
          <input type="number" id="age" name="age" required min="18" max="120" placeholder=""/>
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
    </fieldset>
  `;

  return form;
}
