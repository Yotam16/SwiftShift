import { employee_t } from "../back/objects";

function submitUser() {
    const firstNameElement = document.getElementById('firstName') as HTMLInputElement | null;
    const lastNameElement = document.getElementById('lastName') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;
    const confirmPasswordElement = document.getElementById('confirmPassword') as HTMLInputElement | null;
  
    if (!firstNameElement || !lastNameElement || !passwordElement || !confirmPasswordElement) {
      console.error('One or more elements not found.');
      return;
    }
  
    const firstName = firstNameElement.value;
    const lastName = lastNameElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;
  
 
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

 

  const newUser: employee_t = {
    fname : firstName,
    lname : lastName,
    password : password,
    created : new Date(),
    empID : 0
  };

} 
