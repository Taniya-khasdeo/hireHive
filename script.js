document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Utility functions
  function showError(input, message) {
    const parent = input.parentElement;
    let error = parent.querySelector('.error');
    if (!error) {
      error = document.createElement('small');
      error.className = 'error';
      error.style.color = 'red';
      parent.appendChild(error);
    }
    error.innerText = message;
  }

  function clearErrors(form) {
    form.querySelectorAll('.error').forEach(e => e.remove());
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Login Form
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors(loginForm);

      const email = loginForm.querySelector('input[type="email"]');
      const password = loginForm.querySelector('input[type="password"]');

      let isValid = true;

      if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      if (password.value.trim() === '') {
        showError(password, 'Password is required');
        isValid = false;
      }

      if (!isValid) return;

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value.trim(),
            password: password.value
          })
        });

        const result = await response.json();

        if (response.ok) {
          // You may store userId in localStorage if needed: localStorage.setItem('userId', result.userId);
          window.location.href = 'index.html';
        } else {
          showError(email, result.message || 'Login failed.');
        }
      } catch (err) {
        console.error('Login error:', err);
      }
    });
  }

  // Signup Form
  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors(signupForm);

    const fullname = signupForm.querySelector('input[name="fullname"]');
    const email = signupForm.querySelector('input[name="email"]');
    const password = signupForm.querySelector('input[name="password"]');
    const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]');
      let isValid = true;

      if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      if (password.value.trim() === '') {
        showError(password, 'Password is required');
        isValid = false;
      }

      if (confirmPassword.value.trim() === '') {
        showError(confirmPassword, 'Please confirm your password');
        isValid = false;
      } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
      }

      if (!isValid) return;

      try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullname.value.trim(),
            email: email.value.trim(),
            password: password.value
          })
        });

        const result = await response.json();

        if (response.ok) {
          window.location.href = "index.html";
        } else {
          showError(email, result.message || 'Signup failed.');
        }
      } catch (err) {
        console.error("Signup error:", err);
      }
    });
  }

  // Header animation
  function animateJobSearchHeader() {
    const header = document.querySelector('.jobsearch-title');
    if (header) {
      header.style.opacity = 0;
      setTimeout(() => {
        header.style.opacity = 1;
        header.style.transition = 'opacity 1.2s ease-in-out';
      }, 300);
    }
  }

  window.onload = animateJobSearchHeader;

  // Resume Upload
  document.querySelectorAll('.upload-btn').forEach((button, index) => {
    const fileInput = document.querySelectorAll('.resume-input')[index];

    // Trigger file selector
    button.addEventListener('click', () => {
      fileInput.click();
    });

    // When file is selected
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', '12345'); // Replace with actual user ID

      try {
        const res = await fetch('http://localhost:3000/api/resume/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();
        alert(result.message || 'Uploaded!');
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload failed');
      }
    });
  });
});
