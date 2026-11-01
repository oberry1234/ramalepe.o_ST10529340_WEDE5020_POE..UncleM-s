

// ==========================================
// 1. ARTICLE SLIDER
// ==========================================

const articles = [
    {
        title: "Information Technology",
        description: "Learn how computers and networks work."
    },
    {
        title: "Computer Networking",
        description: "Learn how devices connect and communicate."
    },
    {
        title: "Web Development",
        description: "Learn how HTML, CSS and JavaScript build websites."
    }
];

let currentArticle = 0;

const articleTitle = document.getElementById("title");
const articleDescription = document.getElementById("description");
const article = document.querySelector(".article");

function showArticle(direction) {

    if (!article || !articleTitle || !articleDescription) {
        return;
    }

    article.classList.add("moving");

    setTimeout(function () {

        currentArticle =
            (currentArticle + direction + articles.length) % articles.length;

        articleTitle.textContent = articles[currentArticle].title;
        articleDescription.textContent = articles[currentArticle].description;

        article.classList.remove("moving");

    }, 150);
}


// NEXT ARTICLE
const nextButton = document.getElementById("next");

if (nextButton) {
    nextButton.addEventListener("click", function () {
        showArticle(1);
    });
}


// PREVIOUS ARTICLE
const previousButton = document.getElementById("previous");

if (previousButton) {
    previousButton.addEventListener("click", function () {
        showArticle(-1);
    });
}


// ==========================================
// 2. GALLERY IMAGE PREVIEW
// ==========================================

// GET ALL GALLERY IMAGES
const galleryImages = document.querySelectorAll(
    ".featured-gallery img, .menu img"
);

let currentImageIndex = 0;


// OPEN IMAGE PREVIEW
function openPreview(image) {

    const preview = document.getElementById("imagePreview");
    const previewImage = document.getElementById("previewImage");

    if (!preview || !previewImage) {
        return;
    }

    // Find the selected image in the gallery
    currentImageIndex = Array.from(galleryImages).indexOf(image);

    previewImage.src = image.src;
    previewImage.alt = image.alt;

    preview.style.display = "flex";

    document.body.style.overflow = "hidden";
}


// CHANGE PREVIEW IMAGE
function changeImage(direction, event) {

    if (event) {
        event.stopPropagation();
    }

    if (galleryImages.length === 0) {
        return;
    }

    currentImageIndex += direction;

    // RETURN TO FIRST IMAGE
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    // RETURN TO LAST IMAGE
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    const selectedImage = galleryImages[currentImageIndex];

    const previewImage = document.getElementById("previewImage");

    if (previewImage) {
        previewImage.src = selectedImage.src;
        previewImage.alt = selectedImage.alt;
    }
}


// CLOSE IMAGE PREVIEW
function closePreview() {

    const preview = document.getElementById("imagePreview");

    if (preview) {
        preview.style.display = "none";
    }

    document.body.style.overflow = "auto";
}


// CLOSE PREVIEW USING KEYBOARD
document.addEventListener("keydown", function (event) {

    const preview = document.getElementById("imagePreview");

    if (!preview || preview.style.display !== "flex") {
        return;
    }

    if (event.key === "Escape") {
        closePreview();
    }

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }

});


// ==========================================
// 3. MEMBERSHIP PASSWORD VISIBILITY
// ==========================================

function togglePassword(inputId, button) {

    const passwordInput = document.getElementById(inputId);

    if (!passwordInput) {
        return;
    }

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        button.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        button.textContent = "Show";

    }
}


// ==========================================
// 4. MEMBERSHIP REGISTRATION
// ==========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");

        if (password !== confirmPassword) {

            message.textContent = "Your passwords do not match.";
            return;

        }

        message.textContent =
            "Your details have been checked. Connect a secure registration system to create your account.";

    });

}


// ==========================================
// 5. MEMBER SIGN IN
// ==========================================

const signinForm = document.getElementById("signinForm");

if (signinForm) {

    signinForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message =
            document.getElementById("signinMessage");

        message.textContent =
            "Your sign-in form is ready. Connect it to a secure account system to verify your details.";

    });

}


// ==========================================
// 6. FORGOT PASSWORD
// ==========================================

function showRecoveryMessage(event) {

    event.preventDefault();

    alert(
        "Password recovery will be available once the membership account system is connected."
    );

}


// ==========================================
// 7. ORDER FORM ELEMENTS
// ==========================================

const foodChoice = document.getElementById("foodChoice");
const quantity = document.getElementById("quantity");
const orderType = document.getElementById("orderType");
const paymentMethod = document.getElementById("paymentMethod");


// ==========================================
// 8. UPDATE ORDER SUMMARY
// ==========================================

function updateOrderSummary() {

    const summaryFood = document.getElementById("summaryFood");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryType = document.getElementById("summaryType");
    const summaryPayment = document.getElementById("summaryPayment");

    if (summaryFood) {
        summaryFood.textContent =
            foodChoice ? foodChoice.value || "No meal selected" : "No meal selected";
    }

    if (summaryQuantity) {
        summaryQuantity.textContent =
            quantity ? quantity.value || "1" : "1";
    }

    if (summaryType) {
        summaryType.textContent =
            orderType ? orderType.value || "Not selected" : "Not selected";
    }

    if (summaryPayment) {
        summaryPayment.textContent =
            paymentMethod ? paymentMethod.value || "Not selected" : "Not selected";
    }

}


// UPDATE SUMMARY WHEN FOOD CHOICE CHANGES
if (foodChoice) {
    foodChoice.addEventListener("change", updateOrderSummary);
}


// UPDATE SUMMARY WHEN QUANTITY CHANGES
if (quantity) {
    quantity.addEventListener("input", updateOrderSummary);
}


// UPDATE SUMMARY WHEN PAYMENT CHANGES
if (paymentMethod) {
    paymentMethod.addEventListener("change", updateOrderSummary);
}


// ==========================================
// 9. DELIVERY AND COLLECTION OPTIONS
// ==========================================

if (orderType) {

    orderType.addEventListener("change", function () {

        const addressSection =
            document.getElementById("deliveryAddress");

        const addressInput =
            document.getElementById("address");

        if (!addressSection || !addressInput) {
            updateOrderSummary();
            return;
        }

        if (orderType.value === "Delivery") {

            addressSection.style.display = "block";
            addressInput.required = true;

        } else {

            addressSection.style.display = "none";
            addressInput.required = false;
            addressInput.value = "";

        }

        updateOrderSummary();

    });

}


// ==========================================
// 10. SELECT FOOD FROM GALLERY
// ==========================================

document.querySelectorAll(".select-food").forEach(function (button) {

    button.addEventListener("click", function () {

        if (!foodChoice) {
            return;
        }

        const selectedMeal = button.dataset.food;

        foodChoice.value = selectedMeal;

        updateOrderSummary();

        const orderSection = document.getElementById("order-form");

        if (orderSection) {
            orderSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// ==========================================
// 11. ORDER FORM SUBMISSION
// ==========================================

const foodOrderForm = document.getElementById("foodOrderForm");

if (foodOrderForm) {

    foodOrderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = document.getElementById("orderMessage");

        const customerName =
            document.getElementById("customerName").value;

        const selectedMeal = foodChoice ? foodChoice.value : "";

        const selectedQuantity = quantity ? quantity.value : "1";

        const selectedType = orderType ? orderType.value : "";

        const selectedPayment = paymentMethod ? paymentMethod.value : "";

        if (!message) {
            return;
        }

        message.textContent =
            "Thank you, " + customerName +
            "! Your order details have been completed. " +
            "Meal: " + selectedMeal +
            " | Quantity: " + selectedQuantity +
            " | Order type: " + selectedType +
            " | Payment: " + selectedPayment +
            ". Please contact UncleM's to confirm your order.";

    });

}


// ==========================================
// 12. SET MINIMUM ORDER DATE
// ==========================================

const orderDate = document.getElementById("orderDate");

if (orderDate) {

    const today = new Date();

    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    orderDate.min = localDate;

}


// ==========================================
// 13. INITIALISE ORDER SUMMARY
// ==========================================

updateOrderSummary();

// ==========================================
// UNCLEM'S FOODTRUCK
// FOOD MENU SEARCH
// ==========================================


// 1. GET SEARCH ELEMENTS

const foodMenuSearch =
    document.getElementById("foodMenuSearch");

const foodMenuCards =
    document.querySelectorAll(".menu .food");

const foodSearchResults =
    document.getElementById("foodSearchResults");

const foodNoResults =
    document.getElementById("foodNoResults");

const clearFoodSearch =
    document.getElementById("clearFoodSearch");


// 2. SEARCH FOOD FUNCTION

function searchFoodMenu() {

    const searchText = foodMenuSearch.value
        .trim()
        .toLowerCase();

    let visibleFood = 0;


    foodMenuCards.forEach(function (food) {

        const foodName =
            food.querySelector("h3");

        const foodDescription =
            food.querySelector("p");

        const foodImage =
            food.querySelector("img");


        // COMBINE FOOD NAME, DESCRIPTION AND IMAGE ALT

        const foodInformation = (

            (foodName ? foodName.textContent : "") +
            " " +
            (foodDescription ? foodDescription.textContent : "") +
            " " +
            (foodImage ? foodImage.alt : "")

        ).toLowerCase();


        // CHECK FOR A MATCH

        const matches =
            foodInformation.includes(searchText);


        // SHOW OR HIDE FOOD CARD

        food.hidden = !matches;


        if (matches) {
            visibleFood++;
        }

    });


    // UPDATE RESULT COUNT

    if (foodSearchResults) {

        foodSearchResults.textContent =
            "Showing " + visibleFood +
            " of " + foodMenuCards.length +
            " food items.";

    }


    // DISPLAY NO RESULTS MESSAGE

    if (foodNoResults) {

        foodNoResults.hidden =
            visibleFood !== 0;

    }


    // SHOW CLEAR BUTTON WHEN SEARCHING

    if (clearFoodSearch) {

        clearFoodSearch.classList.toggle(
            "show",
            searchText.length > 0
        );

    }

}


// 3. SEARCH WHILE TYPING

if (foodMenuSearch) {

    foodMenuSearch.addEventListener(
        "input",
        searchFoodMenu
    );

}


// 4. CLEAR SEARCH

if (clearFoodSearch && foodMenuSearch) {

    clearFoodSearch.addEventListener(
        "click",
        function () {

            foodMenuSearch.value = "";

            searchFoodMenu();

            foodMenuSearch.focus();

        }
    );

}


// 5. INITIALISE MENU SEARCH

if (foodMenuSearch) {

    searchFoodMenu();

}


// ==========================================
// END OF FOOD MENU SEARCH
// ==========================================
