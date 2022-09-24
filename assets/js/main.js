let firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  locations = document.getElementById("locations"),
  hobby = document.getElementById("hobby"),
  inputs = document.getElementsByClassName("form-control"),
  addBtn = document.getElementById("addBtn"),
  tBody = document.getElementById("tBody");

let productContainer;

if (localStorage.getItem("allProduct") !== null) {
  productContainer = JSON.parse(localStorage.getItem("allProduct"));
  displayProduct();
} else {
  productContainer = [];
}

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add Item") {
    createProduct();
  } else {
    updateProduct();
  }

  displayProduct();
  clearProduct();
};

function createProduct() {
  let allProducts = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    phone: phone.value,
    locations: locations.value,
    hobby: hobby.value,
  };

  productContainer.push(allProducts);
  localStorage.setItem("allProduct", JSON.stringify(productContainer));
}

function displayProduct() {
  let newProduct = ``;
  for (let i = 0; i < productContainer.length; i++) {
    newProduct += `
    <tr>
            <td>${i + 1}</td>
            <td>${productContainer[i].first}</td>
            <td>${productContainer[i].last}</td>
            <td>${productContainer[i].email}</td>
            <td>${productContainer[i].phone}</td>
            <td>${productContainer[i].locations}</td>
            <td>${productContainer[i].hobby}</td>
            <td>
            <button onclick="editProduct (${i})" class="btn btn-success btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="deleteProduct (${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
          </td>
           </tr>
    `;
  }

  tBody.innerHTML = newProduct;
}

function clearProduct() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  displayProduct();
  localStorage.setItem("allProduct", JSON.stringify(productContainer));
}

function searchProduct(searchText) {
  let newProduct = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].first.toLowerCase().includes(searchText.toLowerCase())
    ) {
      newProduct += `
        <tr>
                <td>${i + 1}</td>
                <td>${productContainer[i].first}</td>
                <td>${productContainer[i].last}</td>
                <td>${productContainer[i].email}</td>
                <td>${productContainer[i].phone}</td>
                <td>${productContainer[i].locations}</td>
                <td>${productContainer[i].hobby}</td>
                <td>
                <button onclick="editProduct (${i})" class="btn btn-success btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteProduct (${i})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
              </td>
               </tr>
        `;
    }
  }
  tBody.innerHTML = newProduct;
}

let currentIndex = 0;

function editProduct(index) {
  currentIndex = index;

  let currentProduct = productContainer[index];
  firstName.value = currentProduct.first;
  lastName.value = currentProduct.last;
  email.value = currentProduct.email;
  phone.value = currentProduct.phone;
  locations.value = currentProduct.locations;
  hobby.value = currentProduct.hobby;

  addBtn.innerHTML = "Update Item";
}

function updateProduct() {
  let allProducts = {
    first: firstName.value,
    last: lastName.value,
    email: email.value,
    phone: phone.value,
    locations: locations.value,
    hobby: hobby.value,
  };
  productContainer[currentIndex] = allProducts;
  localStorage.setItem("allProduct", JSON.stringify(productContainer));
  addBtn.innerHTML = "Add Item";
}
