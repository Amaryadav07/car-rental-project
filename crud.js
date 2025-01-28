let GetDataa = async () => {
  let url = "http://localhost:3000/car";
  let res = await fetch(url, { method: "GET" });
  let data = await res.json();
  console.log(data);
  paginationn(data); // Initialize pagination
      // Display data
};

// Display data in table
let DataShow = (data) => {
  let tabledata = document.querySelector("#show");

  // Clear existing content
  tabledata.innerHTML = "";

  data.forEach((e) => {
    tabledata.innerHTML += `
      <tr data-id="${e.id}">
        <td>${e.name}</td>
        <td>${e.age}</td>
        <td>${e.mobile}</td>
        <td>${e.aadhar}</td>
        <td>${e.address}</td>
        <td>${e.premiumCar}</td>
        <td>${e.pickupdate}</td>
        <td>${e.dropoffdate}</td>
        <td>${e.price}</td>
        <td onclick="deleete('${e.id}')" id="del">Delete</td>
        <td onclick="updatee('${e.id}')" id="del1">Edit</td>
      </tr>
    `;
  });
};

// Insert data function
let insertt = () => {
  let inpname = document.querySelector("#inpname").value;
  let inpage = document.querySelector("#inpage").value;
  let inpmobile = document.querySelector("#inpmobile").value;
  let inpaadhar = document.querySelector("#inpidentity").value;
  let inpaddress = document.querySelector("#inpaddress").value;
  let inppremiumCar = document.querySelector("#inppremiumCar").value;
  let inppickupdate = document.querySelector("#inppickupdate").value;
  let inpdropoffdate = document.querySelector("#inpdropoffdate").value;
  let inpprice = document.querySelector("#inpprice").value;

  // Validate inputs
  if (inpname === "" || inpage === "" || inpmobile === "" || inpaadhar === "" || inpaddress === "" || inppremiumCar === "" || inppickupdate === "" || inpdropoffdate === "" || inpprice === "") {
    alert("Please Enter valid Data to Proceed");
    return false;
  }
  else if(inpmobile.length!=10){
    alert( "Please Enter 10 digit Mobile Number");
     
      document.querySelector("#inpmobile").focus();
      return false;
    }
  else if(inpidentity.length!=16){
 
    alert("Please Enter 16 digit Aadhar Number")
    document.querySelector("#inpidentity").focus();
    return false;
  }





  let url = 'http://localhost:3000/car';

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: inpname,
      age: inpage,
      mobile: inpmobile,
      aadhar: inpaadhar,
      address: inpaddress,
      premiumCar: inppremiumCar,
      pickupdate: inppickupdate,
      dropoffdate: inpdropoffdate,
      price: inpprice
    })
  }).then(() => {
    location.href = "detail.html"; 
  });
  return false;
};

// Delete data function
let deleete = (id) => {
  let url = `http://localhost:3000/car/${id}`;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, {
        method: "DELETE",
      }).then(response => {
        if (response.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            location.reload(); // Reload the page after deletion
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the data.",
            icon: "error"
          });
        }
      });
    }
  });
};

// Update data function
let updatee = async (id) => {
  let url = `http://localhost:3000/car/${id}`;
  let res = await fetch(url);
  let data = await res.json();

  let formdata = `
    <form id="js" data-aos="fade-down" data-aos-duration="3000" data-aos-delay="500">
      <span class="close-btn" onclick="closeForm()">&times;</span>
      <label for="upname">Enter Name:</label>
      <input type="text" id="upname" placeholder="Please Enter Your Name" value="${data.name}" required>

      <label for="upage">Enter Age:</label>
      <input type="text" id="upage" placeholder="Please Enter Your Age" value="${data.age}" required>

      <label for="upnumber">Enter Mobile Number:</label>
      <input type="text" id="upmobile" placeholder="Please Enter Your Mobile" value="${data.mobile}" required>

      <label for="upaadhar">Enter Aadhar:</label>
      <input type="text" id="upaadhar" placeholder="Please Enter Your Aadhar" value="${data.aadhar}" required>

      <label for="upaddress">Enter Address:</label>
      <input type="text" id="upaddress" placeholder="Please Enter Your Address" value="${data.address}" required>

      <label for="premiumCar">Choose Your Car:</label>
      <select id="uppremiumCar" name="premiumCar" required>
        <option value="" disabled selected>Select a car</option>
        <option value="audi" ${data.premiumCar === "audi" ? "selected" : ""}>Audi</option>
        <option value="bmw" ${data.premiumCar === "bmw" ? "selected" : ""}>BMW</option>
        <option value="mercedes" ${data.premiumCar === "mercedes" ? "selected" : ""}>Mercedes-Benz</option>
        <option value="porsche" ${data.premiumCar === "porsche" ? "selected" : ""}>Porsche</option>
        <option value="rollsRoyce" ${data.premiumCar === "rollsRoyce" ? "selected" : ""}>Rolls-Royce</option>
        <option value="lamborghini" ${data.premiumCar === "lamborghini" ? "selected" : ""}>Lamborghini</option>
        <option value="ferrari" ${data.premiumCar === "ferrari" ? "selected" : ""}>Ferrari</option>
        <option value="mclaren" ${data.premiumCar === "mclaren" ? "selected" : ""}>McLaren</option>
        <option value="astonMartin" ${data.premiumCar === "astonMartin" ? "selected" : ""}>Aston Martin</option>
        <option value="bugatti" ${data.premiumCar === "bugatti" ? "selected" : ""}>Bugatti</option>
        <option value="tesla" ${data.premiumCar === "tesla" ? "selected" : ""}>Tesla</option>
        <option value="maserati" ${data.premiumCar === "maserati" ? "selected" : ""}>Maserati</option>
        <option value="bentley" ${data.premiumCar === "bentley" ? "selected" : ""}>Bentley</option>
      </select>

      <label for="uppickupdate">Enter Pick-up Date:</label>
      <input type="date" id="uppickupdate" value="${data.pickupdate}" required>

      <label for="updropoffdate">Enter Return-Date:</label>
      <input type="date" id="updropoffdate" value="${data.dropoffdate}" required>

      <label for="upprice">Enter Price:</label>
      <input type="text" id="upprice" value="${data.price}" readonly>

      <input type="submit" value="Update" onclick="return finalupdate('${data.id}')">
    </form>
  `;

  document.querySelector("#updateform").innerHTML = formdata;
};

// Close form
function closeForm() {
  const form = document.getElementById("js");
  form.classList.add("hidden");
}

// Final update function
let finalupdate = (id) => {
  let inpname = document.querySelector("#upname").value;
  let inpage = document.querySelector("#upage").value;
  let inmobile = document.querySelector("#upmobile").value;
  let inaadhar = document.querySelector("#upaadhar").value;
  let inaddress = document.querySelector("#upaddress").value;
  let inpremiumCar = document.querySelector("#uppremiumCar").value;
  let inpickupdate = document.querySelector("#uppickupdate").value;
  let indropoffdate = document.querySelector("#updropoffdate").value;
  let inprice = document.querySelector("#upprice").value;

  // Show confirmation popup before updating data
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then((result) => {
    if (result.isConfirmed) {
      let url = `http://localhost:3000/car/${id}`;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: inpname,
          age: inpage,
          mobile: inmobile,
          aadhar: inaadhar,
          address: inaddress,
          premiumCar: inpremiumCar,
          pickupdate: inpickupdate,
          dropoffdate: indropoffdate,
          price: inprice
        })
      })
      .then(response => {
        if (response.ok) {
          Swal.fire("Saved!", "Your changes have been saved.", "success");
          location.reload(); // Reload the page after update
        } else {
          Swal.fire("Error!", "There was an issue saving the data.", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Network Error!", "Failed to update the data. Please try again.", "error");
      });
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });

  return false;
};


let paginationn = (data) => {
  $('#paging').pagination({
    dataSource: data,
    pageSize: 5,
    callback: function(data, pagination) {
      DataShow(data);  // Re-display data for the current page
    }
  });
};

// Search functionality
let searchData = () => {
  let searchQuery = document.querySelector("#searchInput").value.toLowerCase();


  let tableRows = document.querySelectorAll("#show tr");

 
  tableRows.forEach(row => {
    let name = row.cells[0].textContent.toLowerCase();
    let id = row.getAttribute('data-id').toLowerCase();
    let mobile = row.cells[2].textContent.toLowerCase();

    if (name.includes(searchQuery) || id.includes(searchQuery) || mobile.includes(searchQuery)) {
      row.style.display = ''; 
    } else {
      row.style.display = 'none'; 
    }
  });
};


window.onload = () => {
  GetDataa(); 
};

let userr = () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    // alert("okk")
    location.href = "booking.html";
  } else {
   
    alert("Please Login");
    // location.href = "login.html";
  }
};


