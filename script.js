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
    const email = document.querySelector('input[name="signup-email"]').value;
    const mobile = document.querySelector('input[name="signup-mobile"]').value;

    // Validate the inputs (you can add more complex validation here)
    if (username && password && email && mobile) {
        // Save the user data temporarily
        localStorage.setItem('tempUsername', username);
        localStorage.setItem('tempPassword', password);
        localStorage.setItem('tempEmail', email);
        localStorage.setItem('tempMobile', mobile);

        // Send OTP (this is just a simulation)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('otp', otp);
        alert(`OTP sent to ${mobile} and ${email}: ${otp}`);

        // Display OTP box
        document.querySelector('.signup-box').style.display = 'none';
        document.querySelector('.otp-box').style.display = 'block';
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('otp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const enteredOtp = document.querySelector('input[name="otp"]').value;
    const savedOtp = localStorage.getItem('otp');

    if (enteredOtp === savedOtp) {
        // Save the user data permanently
        const username = localStorage.getItem('tempUsername');
        const password = localStorage.getItem('tempPassword');
        const email = localStorage.getItem('tempEmail');
        const mobile = localStorage.getItem('tempMobile');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        localStorage.setItem('mobile', mobile);

        // Clear temporary data and otp
        localStorage.removeItem('tempUsername');
        localStorage.removeItem('tempPassword');
        localStorage.removeItem('tempEmail');
        localStorage.removeItem('tempMobile');
        localStorage.removeItem('otp');

        // Redirect to the login page
        document.querySelector('.otp-box').style.display = 'none';
        document.querySelector('.login-box').style.display = 'block';
        alert('OTP verified successfully. You can now log in.');
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="login-username"]').value;
    const password = document.querySelector('input[name="login-password"]').value;

    // Validate the inputs (you can add more complex validation here)
    if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
        localStorage.setItem('currentUser', username);
        // Redirect to the next page
        window.location.href = 'next.html';
    } else {
        alert('Invalid username or password.');
    }
});
