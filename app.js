const status = document.querySelector('.status-msg');
const c1 = document.querySelector('.c1');
const c2 = document.querySelector('.c2');
const c3 = document.querySelector('.c3');

function animatedForm() {
  const arrows = document.querySelectorAll('.fa-sign-in-alt'); // We are selecting the icons (i)

  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      const input = arrow.previousElementSibling; // This will always select the current field input
      const parent = arrow.parentElement; // This will select the parent element of I (div)
      const nextField = parent.nextElementSibling; // This will select the next parent field

      // Check for validation
      if (input.type === 'text' && validateUser(input)) {
        nextSlide(parent, nextField);
      } else if (input.type === 'email' && validateEmail(input)) {
        nextSlide(parent, nextField);
      } else if (input.type === 'password' && validatePassword(input)) {
        nextSlide(parent, nextField);
      } else {
        parent.style.animation = 'shakey 0.5s ease';
      }
      // To replay the shakey animation when constantly entering incorrect input
      parent.addEventListener('animationend', () => {
        parent.style.animation = '';
      });
    });
  });
}

function validateUser(user) {
  if (user.value.length < 6) {
    error(red());
    status.textContent = 'Not Enough Characters';
    c1.style.backgroundColor = amber();
  } else {
    error(white());
    status.textContent = '';
    c1.style.backgroundColor = green();
    return true;
  }
}

function validateEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex for email check
  if (validation.test(email.value)) {
    error(white());
    status.textContent = '';
    c2.style.backgroundColor = green();
    return true;
  } else {
    error(red());
    status.textContent = 'Please enter a valid email address';
    c2.style.backgroundColor = amber();
  }
}

function validatePassword(password) {
  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/; //regex for 1 lowercase, 1 uppercase and 1 number with a minumum length of 6
  if (pass.test(password.value)) {
    error(white());
    status.textContent = '';
    c3.style.backgroundColor = green();
    return true;
  } else {
    error(red());
    status.textContent =
      'Minimum 6 characters, atleast 1 uppercase and number!';
    c3.style.backgroundColor = amber();
  }
}

function nextSlide(parent, nextField) {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  nextField.classList.add('active');
}

function error(color) {
  document.body.style.backgroundColor = color;
}

function green() {
  return 'rgb(87, 189, 130)';
}

function amber() {
  return 'rgb(255,191,0)';
}

function red() {
  return 'rgb(187, 87, 87)';
}

function white() {
  return 'rgb(255,255,255)';
}

animatedForm();
