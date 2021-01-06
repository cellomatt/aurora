const signUpForm = document.getElementById('signUp')

signUpForm.addEventListener("submit", (event) => {
  // get the values of the password field and confirm field
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  // if the values are not equal, alert the user
  // otherwise, submit the form
  if (password !== confirmPassword) {
    // prevent the default submission behavior
    event.preventDefault();
    const err = new Error("Passwords must match!");
    console.error(err);
  }
});
