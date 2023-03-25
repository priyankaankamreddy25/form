const form = document.getElementById('user-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent default form submission behavior

  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const phone = form.elements['phone'].value;

  const userExists = await checkUserExists(email);

  if (userExists) {
    alert('User Found');
  } else {
    const userCreated = await createUser(name, email, phone);
    alert('User Created Successfully');
  }
});

async function checkUserExists(email) {
  const response = await fetch(`https://api.example.com/users?email=${email}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.length > 0;
}

async function createUser(name, email, phone) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
