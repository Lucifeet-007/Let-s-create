document.getElementById('sign-up').addEventListener('click', function() {
    document.querySelector('.login-box').style.display = 'none';
    document.querySelector('.signup-box').style.display = 'block';
});

document.getElementById('back-to-login').addEventListener('click', function() {
    document.querySelector('.signup-box').style.display = 'none';
    document.querySelector('.login-box').style.display = 'block';
});

document.getElementById('forgot-password').addEventListener('click', function() {
    alert('Forgot Password functionality is not implemented yet.');
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="signup-username"]').value;
    const password = document.querySelector('input[name="signup-password"]').value;
    const mobile = document.querySelector('input[name="signup-mobile"]').value;

    // Validate the inputs (you can add more complex validation here)
    if (username && password && mobile) {
        // Save the user data (you can use localStorage or send it to a server)
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('mobile', mobile);

        // Redirect to the next page
        window.location.href = 'next.html';
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="login-username"]').value;
    const password = document.querySelector('input[name="login-password"]').value;

    // Validate the inputs (you can add more complex validation here)
    if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
        // Redirect to the next page
        window.location.href = 'next.html';
    } else {
        alert('Invalid username or password.');
    }
});
