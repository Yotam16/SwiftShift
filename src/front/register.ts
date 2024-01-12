import { employee_t, uname_t, pass_t, name_t, email_t, phone_t } from "../back/objects";

function submitUser() {
    const userNameElement = document.getElementById('userName') as HTMLInputElement | null;
    const firstNameElement = document.getElementById('firstName') as HTMLInputElement | null;
    const lastNameElement = document.getElementById('lastName') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const passwordElement = document.getElementById('password') as HTMLInputElement | null;
    const confirmPasswordElement = document.getElementById('confirmPassword') as HTMLInputElement | null;
    
  
    if (!firstNameElement || !lastNameElement || !passwordElement || !confirmPasswordElement || 
                                                                        !userNameElement || !emailElement) {
      
        console.error('One or more elements not found.');
        return;
    }
  
    const userName = userNameElement.value;
    const firstName = firstNameElement.value;
    const lastName = lastNameElement.value;
    const email = emailElement?.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;
  
 
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

 

  const newUser: employee_t = {
    uname : userName,
    fname : firstName,
    lname : lastName,
    password : password,
    created : new Date(),
    email : email
  };

} 


const testUNameSTR = (value: string): string | undefined => {
    const regex = /^[a-zA-Z0-9_-]{5,16}$/;
  
    if (regex.test(value)) {
      return value as string;
    }
  
    return undefined;
  };

  
const testPassSTR = (value: string): uname_t | undefined => {
    const regex = /{8,16}/;
  
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
  