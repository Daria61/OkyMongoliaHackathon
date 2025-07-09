function onSubmit(e) {
  e.preventDefault()

  const name = document.getElementById('username').value
  const password = document.getElementById('password').value

  fetch(API_BASE_URL + '/account/delete-from-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('password').value = ''
      document.getElementById('username').value = ''
      document.getElementById('message').className = 'text-success'
      document.getElementById('message').innerText = 'Account deleted successfully'
    })
    .catch((error) => {
      document.getElementById('password').value = ''
      document.getElementById('username').value = ''
      document.getElementById('message').className = 'text-danger'
      document.getElementById('message').innerText = 'An error occurred'
      console.error('Error:', error)
    })
}

document.getElementById('delete-account-form').addEventListener('submit', onSubmit)

function viewPassword() {
  var passwordInput = document.getElementById('password')
  var passStatus = document.getElementById('pass-status')

  if (passwordInput.type == 'password') {
    passwordInput.type = 'text'
    passStatus.className = 'fa fa-eye'
  } else {
    passwordInput.type = 'password'
    passStatus.className = 'fa fa-eye-slash'
  }
}
