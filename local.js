let signup = () => {
   
    let signname = document.querySelector("#name").value;
    let signmobile = document.querySelector("#mobile").value;
    let signemail = document.querySelector("#email").value;
    let signpassword = document.querySelector("#password").value;

    let errorname = document.querySelector("#name");
    let errormobile = document.querySelector("#mobile");
    let erroremail = document.querySelector("#email");
    let errorpassword = document.querySelector("#password");

    errorname.setAttribute("placeholder", "");
    errormobile.setAttribute("placeholder", "");
    erroremail.setAttribute("placeholder", "");
    errorpassword.setAttribute("placeholder", "");

   
    if (signname === "") {
        errorname.setAttribute("placeholder", "Please Enter your Name");
        errorname.style.borderColor = "red";
        document.querySelector("#name").focus();
        return false;
    }

    
    if (isNaN(signmobile)) {
        errormobile.setAttribute("placeholder", "Please Enter a valid Mobile Number");
        errormobile.style.borderColor = "red";
        document.querySelector("#mobile").focus();
        return false;
    } else if (signmobile === "") {
        errormobile.setAttribute("placeholder", "Please Enter your Mobile");
        errormobile.style.borderColor = "red";
        document.querySelector("#mobile").focus();
        return false;
    } else if (signmobile.length !== 10) {
        errormobile.setAttribute("placeholder", "Please Enter 10 digit Mobile Number");
        errormobile.style.borderColor = "red";
        document.querySelector("#mobile").focus();
        return false;
    }

  
    if (!(signemail.includes('@') && signemail.includes('.com'))) {
        erroremail.setAttribute("placeholder", "Please Enter a Valid Email");
        erroremail.style.borderColor = "red";
        document.querySelector("#email").focus();
        return false;
    } else if (signemail === "") {
        erroremail.setAttribute("placeholder", "Please Enter your Email");
        erroremail.style.borderColor = "red";
        document.querySelector("#email").focus();
        return false;
    }

   
    if (!(signpassword.match(/[1234567890]/) &&
        signpassword.match(/[!@#$%^&*()]/) &&
        signpassword.match(/[a-z]/) &&
        signpassword.match(/[A-Z]/))) {
        document.querySelector("#password").focus();
        // alert();
        Swal.fire({
          icon: "error",
          title: "Oops...",
        
          text: "Password should have at least one uppercase letter, one lowercase letter, one digit and one special character.",
         
        });
        return false;
    } else if (signpassword === "") {
        errorpassword.setAttribute("placeholder", "Please Enter your Password");
        errorpassword.style.borderColor = "red";
        document.querySelector("#password").focus();
        return false;
    }

  
    localStorage.setItem("name", signname);
    localStorage.setItem("mobile", signmobile);
    localStorage.setItem("email", signemail);
    localStorage.setItem("password", signpassword);

   
    location.href = "locallogin.html";
    return false; 
}

let login = () => {
  let loginname = document.querySelector("#name").value;
  let loginpassword = document.querySelector("#password").value;

  let errornamelogin = document.querySelector("#name");
  let errorpasswordlogin = document.querySelector("#password");

  // Clear placeholder text if any
  errornamelogin.setAttribute("placeholder", "");
  errorpasswordlogin.setAttribute("placeholder", "");

  // Validate name input
  if (loginname === "") {
    errornamelogin.setAttribute("placeholder", "Please Enter your Name");
    errornamelogin.style.borderColor = "red";
    document.querySelector("#name").focus();
    return false;
  }

  // Validate password with specific requirements
  if (!(loginpassword.match(/[1234567890]/) &&
        loginpassword.match(/[!@#$%^&*()]/) &&
        loginpassword.match(/[a-z]/) &&
        loginpassword.match(/[A-Z]/))) {
    document.querySelector("#password").focus();
    Swal.fire({
      icon: "error",
      title: "Oops...",
    
      text: "Password should have at least one uppercase letter, one lowercase letter, one digit and one special character.",
     
    });
    return false;
  }

  // Validate empty password field
  else if (loginpassword === "") {
    errorpasswordlogin.setAttribute("placeholder", "Please Enter your Password");
    errorpasswordlogin.style.borderColor = "red";
    document.querySelector("#password").focus();
    return false;
  }

  // Retrieve stored credentials
  let storedName = localStorage.getItem("name");
  let storedPassword = localStorage.getItem("password");


  if (loginname === storedName && loginpassword === storedPassword) {
   
    localStorage.setItem("isLoggedIn", "true");
   
    

    location.href = "index.html"; 
 
  } else {
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
    
      text:"Login credentials do not match!",
     
    });
  }

  return false;
};


// hamburger menu 
const hamburger = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.navbar-links');
const authButtons = document.querySelector('.auth-buttons');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); 
  navbarLinks.classList.toggle('active'); 
  authButtons.classList.toggle('active'); 
});




// home

let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

const loginButton = document.getElementById('login-btn');
const logoutButton = document.getElementById('logout-btn');

if (isLoggedIn) {
  loginButton.style.display = 'none'; 
  logoutButton.style.display = 'inline-block'; 
} else {
  loginButton.style.display = 'inline-block'; 
  logoutButton.style.display = 'none'; 
}


loginButton.addEventListener('click', () => {
  isLoggedIn = true;
  loginButton.style.display = 'none'; 
  logoutButton.style.display = 'inline-block'; 
  

  // localStorage.setItem('isLoggedIn', 'true');
 
});


logoutButton.addEventListener('click', () => {
  isLoggedIn = false;
  logoutButton.style.display = 'none'; 
  loginButton.style.display = 'inline-block'; 
  
 
  localStorage.clear();
 
});






// slider code
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true, // Enable infinite loop
  speed: 800, // Smooth transition speed (in milliseconds)
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


