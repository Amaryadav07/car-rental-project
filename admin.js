// Sidebar 
// document.getElementById('sidebarCollapse').addEventListener('click', () => {
//     document.getElementById('sidebar').classList.toggle('active');
// });

//  API for all methods
const API_URL = "http://localhost:3000/car";


// Fetch and Display Data
let GetDataa = async () => {
  try {
    let res = await fetch(API_URL, { method: "GET" });
    let data = await res.json();
    console.log(data);
    
    paginationn(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Display Data in Table
let DataShow = (data) => {
  let tabledata = document.querySelector("#show");
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
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleete('${e.id}')">Delete</button>
          <button class="btn btn-warning btn-sm" onclick="updatee('${e.id}')">Edit</button>
        </td>
      </tr>
    `;
  });
};

// Pagination
let paginationn = (data) => {
  $("#paging").pagination({
    dataSource: data,
    pageSize: 5,
    callback: function (data, pagination) {
      DataShow(data);
    },
  });
};

// Add New Customer
let insertt = async () => {
  let inpname = document.querySelector("#inpname").value;
  let inpage = document.querySelector("#inpage").value;
  let inpmobile = document.querySelector("#inpmobile").value;
  let inpaadhar = document.querySelector("#inpidentity").value;
  let inpaddress = document.querySelector("#inpaddress").value;
  let inppremiumCar = document.querySelector("#inppremiumCar").value;
  let inppickupdate = document.querySelector("#inppickupdate").value;
  let inpdropoffdate = document.querySelector("#inpdropoffdate").value;
  let inpprice = document.querySelector("#inpprice").value;

  // Validation
  if (
    !inpname ||
    !inpage ||
    !inpmobile ||
    !inpaadhar ||
    !inpaddress ||
    !inppremiumCar ||
    !inppickupdate ||
    !inpdropoffdate ||
    !inpprice
  ) {
    Swal.fire("Error", "Please fill all fields", "error");
    return false;
  }

  if (inpmobile.length !== 10) {
    Swal.fire("Error", "Mobile number must be 10 digits", "error");
    return false;
  }

  if (inpaadhar.length !== 16) {
    Swal.fire("Error", "Aadhar number must be 16 digits", "error");
    return false;
  }

  try {
    let res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        price: inpprice,
      }),
    });

    if (res.ok) {
      Swal.fire("Success", "Customer added successfully", "success");
      GetDataa(); // Refresh data
    } else {
      Swal.fire("Error", "Failed to add customer", "error");
    }
  } catch (error) {
    console.error("Error adding customer:", error);
    Swal.fire("Error", "Something went wrong", "error");
  }

  return false; // Prevent form submission
};

// Delete Customer
let deleete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        let res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("Deleted!", "Customer has been deleted.", "success");
          GetDataa(); // Refresh data
        } else {
          Swal.fire("Error", "Failed to delete customer", "error");
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  });
};

// Update Customer (Fetch Data for Edit)
let updatee = async (id) => {
  try {
    let res = await fetch(`${API_URL}/${id}`);
    let data = await res.json();

   
    document.querySelector("#updateform").innerHTML = `
      <form id="updateForm" onsubmit="return finalupdate('${data.id}')" class="bg-light p-4 rounded shadow">
        <h2 class="mb-4">Update Customer</h2>
        <div class="row g-3">
          <div class="col-md-6">
            <label for="upname" class="form-label">Name:</label>
            <input type="text" id="upname" class="form-control" value="${data.name}" required>
          </div>
          <div class="col-md-6">
            <label for="upage" class="form-label">Age:</label>
            <input type="number" id="upage" class="form-control" value="${data.age}" required>
          </div>
          <div class="col-md-6">
            <label for="upmobile" class="form-label">Mobile:</label>
            <input type="text" id="upmobile" class="form-control" value="${data.mobile}" required>
          </div>
          <div class="col-md-6">
            <label for="upaadhar" class="form-label">Aadhar:</label>
            <input type="text" id="upaadhar" class="form-control" value="${data.aadhar}" required>
          </div>
          <div class="col-md-6">
            <label for="upaddress" class="form-label">Address:</label>
            <input type="text" id="upaddress" class="form-control" value="${data.address}" required>
          </div>
          <div class="col-md-6">
            <label for="uppremiumCar" class="form-label">Car:</label>
            <select id="uppremiumCar" class="form-control" required>
              <option value="audi" ${data.premiumCar === "audi" ? "selected" : ""}>Audi</option>
              <option value="bmw" ${data.premiumCar === "bmw" ? "selected" : ""}>BMW</option>
              <option value="mercedes" ${data.premiumCar === "mercedes" ? "selected" : ""}>Mercedes</option>
              <option value="lamborghini" ${data.premiumCar === "lamborghini" ? "selected" : ""}>Lamborghini</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="uppickupdate" class="form-label">Pickup Date:</label>
            <input type="date" id="uppickupdate" class="form-control" value="${data.pickupdate}" required>
          </div>
          <div class="col-md-6">
            <label for="updropoffdate" class="form-label">Drop-off Date:</label>
            <input type="date" id="updropoffdate" class="form-control" value="${data.dropoffdate}" required>
          </div>
          <div class="col-md-6">
            <label for="upprice" class="form-label">Price:</label>
            <input type="text" id="upprice" class="form-control" value="${data.price}" required>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Update</button>
            <button type="button" class="btn btn-secondary" onclick="closeUpdateForm()">Cancel</button>
          </div>
        </div>
      </form>
    `;

    // Show Update Form
    document.querySelector("#updateform").style.display = "block";
    document.querySelector("#updateform").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error fetching customer data:", error);
    Swal.fire("Error", "Failed to fetch customer data", "error");
  }

};

// Final Update Function
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



let searchData = () => {
  let searchQuery = document.querySelector("#searchInput").value.toLowerCase();

  let tableRows = document.querySelectorAll("#show tr");
  tableRows.forEach(row => {
    let name = row.cells[0].textContent.toLowerCase();
   
    let mobile = row.cells[2].textContent.toLowerCase();

    if (name.includes(searchQuery) ||  mobile.includes(searchQuery)) {
      row.style.display = ''; 
    } else {
      row.style.display = 'none'; 
    }
  });
};
  

// Initialize Data on Page Load
window.onload = () => {
  GetDataa();
 
};


// admin code starts from here  cars section code

// const adminurl="http://localhost:3000/admin"

let insertCar= async()=>{

  let name=document.querySelector("#carName").value
  let model=document.querySelector("#carModel").value
  let price=document.querySelector("#carPrice").value
  let engine= document.querySelector("#carEngine").value
  let fuel=document.querySelector("#carFuelEfficiency").value
  let seats=document.querySelector("#carSeats").value
  let features= document.querySelector("#carFeatures").value
  let image= document.querySelector("#carImage").value
  


    await fetch("http://localhost:3000/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        carName: name,
        carModel: model,
        carPrice: price,
        carEngine: engine,
        carFuelEfficiency: fuel,
        carSeats: seats,
        carFeatures: features,
        carimage:image
       
       
      }),
    });
   
    return false; 
  }
  

  let userr = () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      // alert("okk")
      location.href = "booking.html";
    } else {
     
     
   alert("Login to Procced Further")
  
      
    }
  }; 

// ----------------------------------- from here we can Fetch and Display Car Data---------------------------------------------------
let GetCarDataa = async () => {
 
    let res = await fetch("http://localhost:3000/admin", { method: "GET" });
    let data = await res.json();
    console.log(data);
    displayCarBrands(data);
   
};

//------------------------------- from here we are  Display Car Data in the "Browse by Car Brand" Section------------------
let displayCarBrands = (data) => {
  let brandsSection = document.querySelector("#brands .car-brand-list");
  data.forEach((car) => {
    let carimagearry=  car?.carimage.split("\\");
    let imageUrl = `./images/${carimagearry[carimagearry.length-1]}` ; 
    // brandsSection.innerHTML = "";
    brandsSection.innerHTML += `
      <div class="brand" >
        <img src="${imageUrl}" alt="${imageUrl}" >
        
        <details>
          <summary>Know More</summary>
          <p ><strong>Price per day:</strong> $${car.carPrice}</p>
          <p ><strong>Engine:</strong> ${car.carEngine}</p>
          <p ><strong>Fuel Efficiency:</strong> ${car.carFuelEfficiency} MPG</p>
          <p ><strong>Seats:</strong> ${car.carSeats}</p>
          <p><strong>Features:</strong> ${car.carFeatures}</p>
          <span id="book"  onclick="userr()">Book Now</span>
        </details>
        <button>
          <span>${car.carName}</span>
        </button>
      </div>
    `;
    
  });
};

window.onload = () => {
  GetDataa();
  GetCarDataa();

 
};


