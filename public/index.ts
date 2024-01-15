import { employee_t, uname_t, pass_t, name_t, email_t, phone_t } from "./objects";


const testUNameSTR = (value: string): uname_t | undefined => {
    const regex = /^[a-zA-Z0-9_-]{5,16}$/;
  
    if (regex.test(value)) {
        return value as uname_t;
    }
  
    return undefined;
};

const testPassSTR = (value: string): pass_t | undefined => {
    const regex = /^.{8,16}$/;
  
    if (regex.test(value)) {
        return value as pass_t;
    }
    
    return undefined;
};

const testNameSTR = (value: string): name_t | undefined => {
    const regex = /^[a-zA-Z]{2,16}$/;
  
    if (regex.test(value)) {
        return value as name_t;
    }
    
    return undefined;
};

const testEmail = (value: string): email_t | undefined => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(value)) {
        return value as email_t;
    }
 
    return undefined;
};

const testPhone = (value: string): phone_t | undefined => {
    const regex = /^[0-9+]{5,13}/;

    if (regex.test(value)) {
        return value as phone_t;
    }
 
    return undefined;
};

function submitUser() {
    const userNameElement = document.getElementById('userName') as HTMLInputElement | null;
    const firstNameElement = document.getElementById('firstName') as HTMLInputElement | null;
    const lastNameElement = document.getElementById('lastName') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;
    const confirmPasswordElement = document.getElementById('confirmPassword') as HTMLInputElement | null;
    
    const userNameError = document.getElementById('userNameError') as HTMLSpanElement | null;
    const firstNameError = document.getElementById('firstNameError') as HTMLSpanElement | null;
    const lastNameError = document.getElementById('lastNameError') as HTMLSpanElement | null;
    const emailError = document.getElementById('emailError') as HTMLSpanElement | null;
    const passwordError = document.getElementById('passwordError') as HTMLSpanElement | null;
    const confirmPasswordError = document.getElementById('confirmPasswordError') as HTMLSpanElement | null;

    if (!firstNameElement || !lastNameElement || !passwordElement || !confirmPasswordElement || 
        !userNameElement || !emailElement || 
        !userNameError || !firstNameError || !lastNameError || !emailError || !passwordError || !confirmPasswordError) {
      
        console.error('One or more elements not found.');
        return;
    }

    userNameError.textContent = '';
    firstNameError.textContent = '';
    lastNameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    const userName = userNameElement.value;
    const firstName = firstNameElement.value;
    const lastName = lastNameElement.value;
    const email = emailElement?.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    const validatedUserName = testUNameSTR(userName);
    if (!validatedUserName) {
        userNameError.textContent = 'Invalid username';
        return;
    }

    const validatedFirstName = testNameSTR(firstName);
    if (!validatedFirstName) {
        firstNameError.textContent = 'Invalid first name';
        return;
    }

    const validatedLastName = testNameSTR(lastName);
    if (!validatedLastName) {
        lastNameError.textContent = 'Invalid last name';
        return;
    }

    const validatedEmail = testEmail(email);
    if (!validatedEmail) {
        emailError.textContent = 'Invalid email';
        return;
    }

    const validatedPassword = testPassSTR(password);
    if (!validatedPassword) {
        passwordError.textContent = 'Invalid password';
        return;
    }

    const validatedConfirmPassword = testPassSTR(confirmPassword);
    if (!validatedConfirmPassword) {
        confirmPasswordError.textContent = 'Invalid confirm password';
        return;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        return;
    }

    const newUser: employee_t = {
        uname: validatedUserName,
        fname: validatedFirstName,
        lname: validatedLastName,
        password: validatedPassword,
        created: new Date(),
        email: validatedEmail
    };


    console.log(newUser);

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('User registered successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error registering user. Please try again.');
    });
    alert("Submituser ending");
}
