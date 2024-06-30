document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const aadhar = document.getElementById('aadhar').value;

    const res = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone, address, aadhar })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        alert(data.message);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        alert(data.message);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const res = await fetch('http://localhost:8080/api/users', {
        headers: {
            'x-auth-token': token
        }
    });

    const data = await res.json();
    if (res.ok) {
        document.getElementById('username').textContent = data.name;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('address').textContent = data.address;
        document.getElementById('aadhar').textContent = data.aadhar;
        document.getElementById('profilePicture').src = `http://localhost:8080/${data.profilePicture}`;
    } else {
        alert(data.message);
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = document.getElementById('newPhone').value;
    const address = document.getElementById('newAddress').value;

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify({ phone, address })
    });

    const data = await res.json();
    if (res.ok) {
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('address').textContent = data.address;
    } else {
        alert(data.message);
    }
});

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profilePicture', document.getElementById('profilePictureInput').files[0]);

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/users/uploadProfilePicture', {
        method: 'POST',
        headers: {
            'x-auth-token': token
        },
        body: formData
    });

    const data = await res.json();
    if (res.ok) {
        document.getElementById('profilePicture').src = `http://localhost:8080/${data.profilePicture}`;
    } else {
        alert(data.message);
    }
});
