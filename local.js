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
        alert("Password should have at least one uppercase letter, one lowercase letter, one digit");
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

let login=()=>{

    let loginname = document.querySelector("#name").value;
    let loginpassword = document.querySelector("#password").value;

    let errornamelogin = document.querySelector("#name");
    let errorpasswordlogin = document.querySelector("#password");

    errornamelogin.setAttribute("placeholder", "");
    errorpasswordlogin.setAttribute("placeholder", "");

    if (loginname === "") {
        errornamelogin.setAttribute("placeholder", "Please Enter your Name");
        errornamelogin.style.borderColor = "red";
        document.querySelector("#name").focus();
        return false;
    }

    if (!(loginpassword.match(/[1234567890]/) &&
    loginpassword.match(/[!@#$%^&*()]/) &&
    loginpassword.match(/[a-z]/) &&
    loginpassword.match(/[A-Z]/))) {
    document.querySelector("#password").focus();
    alert("Password should have at least one uppercase letter, one lowercase letter, one digit");
    return false;

}
 else if (loginpassword === "") {
    errorpasswordlogin.setAttribute("placeholder", "Please Enter your Password");
    errorpasswordlogin.style.borderColor = "red";
    document.querySelector("#password").focus();
    return false;
}

let storedName = localStorage.getItem("name");
let storedPassword = localStorage.getItem("password");


if (loginname === storedName && loginpassword === storedPassword) {
    alert("Login Successful");
    location.href = "index.html"; 
} else {
    alert("Login credentials do not match!");
}
return false
}

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

let isLoggedIn = false;
const loginButton = document.getElementById('login-btn');
const logoutButton = document.getElementById('logout-btn');


if (localStorage.getItem('isLoggedIn') === 'true') {
  isLoggedIn = true;
  loginButton.style.display = 'none'; 
  logoutButton.style.display = 'inline-block'; 
}
 else {
  isLoggedIn = false;
  loginButton.style.display = 'inline-block'; 
  logoutButton.style.display = 'none'; 
}


loginButton.addEventListener('click', () => {
  isLoggedIn = true;
  loginButton.style.display = 'none'; 
  logoutButton.style.display = 'inline-block'; 
  
  // Save login status to localStorage
  localStorage.setItem('isLoggedIn', 'true');
});


logoutButton.addEventListener('click', () => {
  isLoggedIn = false;
  logoutButton.style.display = 'none'; 
  loginButton.style.display = 'inline-block'; 
  
  
  localStorage.clear();
});

// signup code checkbox validation
// function signup() {
//   let termsCheckbox = document.getElementById('terms');
//   if (!termsCheckbox.checked) {
//       alert("You must agree to the Terms & Conditions.");
//       return false; 
//   }
//   return true; 
// }


// slider code
 var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
//   booking form 


let fetchData = async () => {
  let url = "http://localhost:3000/car";
  try {
      let res = await fetch(url, { method: "GET" });
     
      
      let data = await res.json();
      console.log(data); // Check if the data is being fetched correctly

      let tabledata = document.querySelector("#display");
      tabledata.innerHTML = ""; // Clear any existing table data

      // Loop through the data and insert table rows
      data.forEach((e) => {
          tabledata.innerHTML += `
              <tr data-id="${e.id}">
                  <td>${e.name}</td>
                  <td>${e.age}</td>
                  <td>${e.mobile}</td>
                  <td>${e.identity}</td>
                  <td>${e.address}</td>
                  <td>${e.pickuplocation}</td>
                  <td>${e.dropofflocation}</td>
                  <td>${e.pickupdate}</td>
                  <td>${e.dropoffdate}</td>
                 <td onclick="deleteUser('${e.id}')" id="del">Delete</td>

                 <td onclick="updateUser('${e.id}')" id="del1">Edit</td>

              </tr>
          `;
      });
  } catch (error) {
      console.error("Error fetching data:", error);
  }
};

let insertt=()=>{

  let inpname=document.querySelector("#inpname").value;
  let inpage=document.querySelector("#inpage").value;
  let inpmobile=document.querySelector("#inpmobile").value;
  let inpidentity=document.querySelector("#inpidentity").value;
  let inpaddress=document.querySelector("#inpaddress").value;
  let inppickuplocation=document.querySelector("#inppickuplocation").value;
  let inpdropofflocation=document.querySelector("#inpdropofflocation").value;
  let inppickupdate=document.querySelector("#inppickupdate").value;
  let inpdropoffdate=document.querySelector("#inpdropoffdate").value;
  
   if (inpname=="" ||inpage=="" ||inpmobile=="" || inpidentity=="" || inpaddress=="" ||inppickuplocation=="" ||inpdropofflocation=="" ||inppickupdate=="" ||inpdropoffdate=="" ) {
    alert("Please Enter valid Data to Procced")
    return false;
   }
  let url='http://localhost:3000/car'
  
  
  fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
  
        name:inpname ,
        age:inpage ,
        mobile:inpmobile ,
        identity:inpidentity ,
        address:inpaddress ,
        pickuplocation: inppickuplocation,
        dropofflocation: inpdropofflocation,
        pickupdate: inppickupdate,
        dropoffdate: inpdropoffdate
  
    })
   
  })
  
  location.href="detail.html"
  return false;
  
  
    }


 
