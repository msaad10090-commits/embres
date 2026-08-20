/* =====================================================
   EMBRES — COMPLETE JAVASCRIPT
   STEP 2 + STEP 3
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       1. HERO SLIDER
    ================================================= */

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dot");

    const nextBtn = document.querySelector(".slider-next");
    const prevBtn = document.querySelector(".slider-prev");

    let currentSlide = 0;
    let sliderTimer;

    const SLIDE_TIME = 5000;


    function showSlide(index) {

        if (!slides.length) return;

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        currentSlide = index;


        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        slides[currentSlide].classList.add("active");


        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

    }


    function nextSlide() {

        showSlide(currentSlide + 1);

        restartSlider();

    }


    function previousSlide() {

        showSlide(currentSlide - 1);

        restartSlider();

    }


    function startSlider() {

        clearInterval(sliderTimer);

        sliderTimer = setInterval(function () {

            showSlide(currentSlide + 1);

        }, SLIDE_TIME);

    }


    function restartSlider() {

        clearInterval(sliderTimer);

        startSlider();

    }


    if (nextBtn) {

        nextBtn.addEventListener("click", nextSlide);

    }


    if (prevBtn) {

        prevBtn.addEventListener("click", previousSlide);

    }


    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);

            restartSlider();

        });

    });


    if (slides.length) {

        showSlide(0);

        startSlider();

    }



    /* =================================================
       2. MOBILE MENU
    ================================================= */

    const menuButton = document.querySelector(".menu-toggle");

    const navigation = document.querySelector(".navigation");


    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("mobile-open");


            menuButton.classList.toggle("menu-open");


            if (navigation.classList.contains("mobile-open")) {

                menuButton.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

            } else {

                menuButton.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        });

    }



    /* =================================================
       3. MOBILE NAVIGATION LINKS
    ================================================= */

    const navLinks =
        document.querySelectorAll(".navigation a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 900) {

                navigation.classList.remove("mobile-open");

                if (menuButton) {

                    menuButton.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';

                }

            }

        });

    });

/* =================================================
   4. EMBRES — WORKING PRODUCT SEARCH
================================================= */

const searchForm =
    document.querySelector(".search-box");

const searchInput =
    document.querySelector(".search-box input");

const searchCategory =
    document.querySelector(".search-box select");

const searchProducts =
    document.querySelectorAll(".product-card");


function runProductSearch() {

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedCategory =
        searchCategory
            ? searchCategory.value
                .toLowerCase()
                .trim()
            : "all categories";


    let foundProducts = 0;


    searchProducts.forEach(function(card) {

        /* PRODUCT NAME */

        const nameElement =
            card.querySelector("h3");


        const productName =
            nameElement
                ? nameElement.textContent
                    .toLowerCase()
                    .trim()
                : "";


        /* PRODUCT CATEGORY */

        const categoryElement =
            card.querySelector(
                ".product-category"
            );


        const productCategory =
            categoryElement
                ? categoryElement.textContent
                    .toLowerCase()
                    .trim()
                : "";


        /* DATA CATEGORY */

        const dataCategory =
            (
                card.getAttribute(
                    "data-category"
                ) || ""
            ).toLowerCase();


        /* =========================
           SEARCH MATCH
        ========================= */

        const searchMatch =
            searchText === "" ||
            productName.includes(searchText) ||
            productCategory.includes(searchText) ||
            dataCategory.includes(searchText);


        /* =========================
           CATEGORY MATCH
        ========================= */

        let categoryMatch = true;


        if (
            selectedCategory !== "" &&
            selectedCategory !== "all categories"
        ) {


            if (
                selectedCategory.includes(
                    "stitched suits"
                )
            ) {

                categoryMatch =
                    dataCategory === "stitched";

            }


            else if (
                selectedCategory.includes(
                    "unstitched suits"
                )
            ) {

                categoryMatch =
                    dataCategory === "unstitched";

            }


            else if (
                selectedCategory.includes(
                    "luxury pret"
                )
            ) {

                categoryMatch =
                    dataCategory === "pret";

            }


            else if (
                selectedCategory.includes(
                    "new arrivals"
                )
            ) {

                categoryMatch =
                    card.querySelector(
                        ".product-badge"
                    ) !== null;

            }

        }


        /* =========================
           SHOW / HIDE
        ========================= */

        if (
            searchMatch &&
            categoryMatch
        ) {

            card.style.display = "";

            foundProducts++;

        }

        else {

            card.style.display = "none";

        }

    });


    /* =========================
       NO RESULTS
    ========================= */

    let noResult =
        document.getElementById(
            "embresNoSearchResult"
        );


    if (!noResult) {

        noResult =
            document.createElement("div");

        noResult.id =
            "embresNoSearchResult";

        noResult.style.display =
            "none";

        noResult.style.textAlign =
            "center";

        noResult.style.padding =
            "50px 20px";

        noResult.innerHTML = `

            <h3 style="
                font-family:'Playfair Display',serif;
                font-size:26px;
                color:#241d19;
                margin-bottom:8px;
            ">
                No Products Found
            </h3>

            <p style="
                font-family:'Poppins',sans-serif;
                font-size:12px;
                color:#777;
            ">
                Try another product or category.
            </p>

        `;


        const grid =
            document.querySelector(
                ".products-grid"
            );


        if (grid) {

            grid.parentNode.insertBefore(
                noResult,
                grid
            );

        }

    }


    if (noResult) {

        noResult.style.display =
            foundProducts === 0
                ? "block"
                : "none";

    }

}


/* =================================================
   SEARCH BUTTON
================================================= */

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            runProductSearch();

        }
    );

}


/* =================================================
   LIVE SEARCH
================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            runProductSearch();

        }
    );


    /* ENTER */

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                runProductSearch();

            }

        }
    );

}


/* =================================================
   CATEGORY SEARCH
================================================= */

if (searchCategory) {

    searchCategory.addEventListener(
        "change",
        function() {

            runProductSearch();

        }
    );

}


    /* =================================================
       7. MAIN NAVIGATION
    ================================================= */

    const navigationItems =
        document.querySelectorAll(
            ".navigation > ul > li > a"
        );


    navigationItems.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                link.getAttribute("href");


            /*
               Empty # links کو ابھی page jump
               کرنے سے روکیں.
            */

            if (!href || href === "#") {

                event.preventDefault();

            }

        });

    });



    /* =================================================
       8. CATEGORIES DROPDOWN
    ================================================= */

    const dropdownLinks =
        document.querySelectorAll(
            ".dropdown a"
        );


    dropdownLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();


            const category =
                link.textContent.trim();


            window.location.href =
                "shop.html?category=" +
                encodeURIComponent(category);

        });

    });



    /* =================================================
       9. ACCOUNT / WISHLIST / CART
    ================================================= */

    const accountLink =
        document.querySelector(
            '.header-actions a[aria-label="Account"]'
        );


    const wishlistLink =
        document.querySelector(
            '.header-actions a[aria-label="Wishlist"]'
        );


    const cartLink =
        document.querySelector(
            '.header-actions a[aria-label="Shopping Cart"]'
        );


    if (accountLink) {

        accountLink.addEventListener("click", function (event) {

            event.preventDefault();

            alert("Account section will be available soon.");

        });

    }


    if (wishlistLink) {

        wishlistLink.addEventListener("click", function (event) {

            event.preventDefault();

            alert("Your wishlist is currently empty.");

        });

    }


    if (cartLink) {

        cartLink.addEventListener("click", function (event) {

            event.preventDefault();

            alert("Your shopping bag is empty.");

        });

    }



    /* =================================================
       10. CLOSE MOBILE MENU ON OUTSIDE CLICK
    ================================================= */

    document.addEventListener("click", function (event) {

        if (!navigation || !menuButton) return;


        const clickedInsideMenu =
            navigation.contains(event.target);


        const clickedButton =
            menuButton.contains(event.target);


        if (
            window.innerWidth <= 900 &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navigation.classList.remove("mobile-open");

            menuButton.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });



    /* =================================================
       11. ESC KEY — CLOSE MENU
    ================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (navigation) {

                navigation.classList.remove(
                    "mobile-open"
                );

            }

            if (menuButton) {

                menuButton.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }

    });



    /* =================================================
       12. WINDOW RESIZE
    ================================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            if (navigation) {

                navigation.classList.remove(
                    "mobile-open"
                );

            }

            if (menuButton) {

                menuButton.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }

    });

});
/* =====================================================
   STEP 4 — PRODUCT FILTER
===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const filter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        productCards.forEach(function(card) {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =====================================================
   WISHLIST
===================================================== */

document.querySelectorAll(".wishlist-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        button.classList.toggle("active");

        const icon = button.querySelector("i");

        if (button.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =====================================================
   WHATSAPP ORDER
===================================================== */

document.querySelectorAll(".whatsapp-order").forEach(function(button) {

    button.addEventListener("click", function() {

        const product =
            button.dataset.product;

        const price =
            button.dataset.price;

        const phone =
            "923142199338";

        const message =
            "Assalam o Alaikum EMBRES,%0A%0A" +
            "I want to order:%0A" +
            product +
            "%0APrice: PKR " +
            price +
            "%0A%0APlease share order details.";

        const url =
            "https://wa.me/" +
            phone +
            "?text=" +
            message;

        window.open(url, "_blank");

    });

});


/* =====================================================
   ADD TO CART
===================================================== */

document.querySelectorAll(".add-cart").forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".product-card");

        const name =
            card.querySelector("h3").textContent.trim();

        alert(
            name +
            " has been added to your shopping bag."
        );

    });

});
/* =====================================================
   STEP 7 — NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            newsletterEmail.value.trim();


        if (email === "") {

            newsletterMessage.textContent =
                "Please enter your email address.";

            return;

        }


        newsletterMessage.textContent =
            "Thank you! You are now part of the EMBRES world.";

        newsletterForm.reset();

    });

}
/* =====================================================
   EMBRES — STEP 8 SHOPPING CART
===================================================== */

let cart = JSON.parse(
    localStorage.getItem("embresCart")
) || [];


/* ================= ELEMENTS ================= */

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const emptyCart = document.getElementById("emptyCart");
const cartBottom = document.getElementById("cartBottom");
const continueShopping = document.getElementById("continueShopping");
const checkoutWhatsApp = document.getElementById("checkoutWhatsApp");
const cartButton = document.getElementById("cartButton");


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "embresCart",
        JSON.stringify(cart)
    );

}


/* ================= OPEN CART ================= */

function openCart() {

    if (!cartDrawer || !cartOverlay) return;

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

    renderCart();

}


/* ================= CLOSE CART ================= */

function closeCartDrawer() {

    if (!cartDrawer || !cartOverlay) return;

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* ================= CART BUTTON ================= */

if (cartButton) {

    cartButton.addEventListener("click", function (e) {

        e.preventDefault();

        openCart();

    });

}


/* ================= CLOSE BUTTON ================= */

if (closeCart) {

    closeCart.addEventListener("click", function () {

        closeCartDrawer();

    });

}


/* ================= OVERLAY ================= */

if (cartOverlay) {

    cartOverlay.addEventListener("click", function () {

        closeCartDrawer();

    });

}


/* ================= CONTINUE SHOPPING ================= */

if (continueShopping) {

    continueShopping.addEventListener("click", function () {

        closeCartDrawer();

    });

}


/* =====================================================
   ADD TO CART
===================================================== */

document.addEventListener("click", function (event) {

    const button =
        event.target.closest(".add-to-cart");

    if (!button) return;


    const name =
        button.dataset.name;

    const price =
        Number(
            button.dataset.price.replace(/,/g, "")
        );

    const image =
        button.dataset.image;


    if (!name || !price || !image) {

        alert("Product information missing.");

        return;

    }


    const existing =
        cart.find(
            item => item.name === name
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: Date.now(),

            name: name,

            price: price,

            image: image,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    openCart();

});


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    let total = 0;


    /* EMPTY CART */

    if (cart.length === 0) {

        if (emptyCart) {

            emptyCart.classList.add("show");

        }


        if (cartBottom) {

            cartBottom.style.display = "none";

        }


        if (cartTotal) {

            cartTotal.textContent = "Rs. 0";

        }


        return;

    }


    /* CART HAS PRODUCTS */

    if (emptyCart) {

        emptyCart.classList.remove("show");

    }


    if (cartBottom) {

        cartBottom.style.display = "block";

    }


    cart.forEach(function (item, index) {


        total +=
            item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.style.display='none'"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    Rs. ${item.price.toLocaleString("en-PK")}
                </div>


                <div class="cart-quantity">

                    <button
                        type="button"
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-cart-item"
                        onclick="removeCartItem(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(div);

    });


    if (cartTotal) {

        cartTotal.textContent =
            "Rs. " +
            total.toLocaleString("en-PK");

    }

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(index, amount) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    renderCart();

}


/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeCartItem(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    renderCart();

}


/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

if (checkoutWhatsApp) {

    checkoutWhatsApp.addEventListener(
        "click",
        function () {


            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;

            }


            let message =
                "🌸 *EMBRES — NEW ORDER*%0A%0A";


            let total = 0;


            cart.forEach(function (item, index) {


                const itemTotal =
                    item.price * item.quantity;


                total += itemTotal;


                message +=
                    `${index + 1}. ${item.name}%0A`;

                message +=
    `Size: ${item.size || "N/A"}%0A`;

message +=
    `Quantity: ${item.quantity}%0A`;

message +=
    `Price: Rs. ${item.price.toLocaleString("en-PK")}%0A`;
                

                message +=
                    `Subtotal: Rs. ${itemTotal.toLocaleString("en-PK")}%0A%0A`;

            });


            message +=
                `*TOTAL: Rs. ${total.toLocaleString("en-PK")}*%0A%0A`;

            message +=
                "Please confirm my order. Thank you!";


            const whatsappURL =
                "https://wa.me/923142199338?text=" +
                message;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =====================================================
   INITIAL CART LOAD
===================================================== */

renderCart();

/* =====================================================
   EMBRES — QUICK VIEW + SIZE + CART
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const productModal =
        document.getElementById("productModal");

    const productModalOverlay =
        document.getElementById("productModalOverlay");

    const productModalClose =
        document.getElementById("productModalClose");

    const modalProductImage =
        document.getElementById("modalProductImage");

    const modalProductName =
        document.getElementById("modalProductName");

    const modalProductCategory =
        document.getElementById("modalProductCategory");

    const modalProductPrice =
        document.getElementById("modalProductPrice");

    const modalOldPrice =
        document.getElementById("modalOldPrice");

    const modalProductDescription =
        document.getElementById("modalProductDescription");

    const modalFabric =
        document.getElementById("modalFabric");

    const modalColor =
        document.getElementById("modalColor");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalAddToBag =
        document.getElementById("modalAddToBag");


    /* CURRENT PRODUCT */

    let currentProduct = {
        name: "",
        price: 0,
        image: "",
        category: "",
        fabric: "",
        color: ""
    };


    /* ================= QUICK VIEW ================= */

    document.addEventListener("click", function (e) {

        const button =
            e.target.closest(".quick-view");

        if (!button) return;

        e.preventDefault();


        currentProduct = {

            name:
                button.dataset.name ||
                "EMBRES Collection",

            price:
                Number(button.dataset.price) || 0,

            image:
                button.dataset.image || "",

            category:
                button.dataset.category ||
                "STITCHED",

            fabric:
                button.dataset.fabric ||
                "Premium Fabric",

            color:
                button.dataset.color ||
                "As Shown"
        };


        /* IMAGE */

        if (modalProductImage) {
            modalProductImage.src =
                currentProduct.image;
        }


        /* NAME */

        if (modalProductName) {
            modalProductName.textContent =
                currentProduct.name;
        }


        /* CATEGORY */

        if (modalProductCategory) {
            modalProductCategory.textContent =
                currentProduct.category;
        }

        if (modalCategory) {
            modalCategory.textContent =
                currentProduct.category;
        }


        /* PRICE */

        if (modalProductPrice) {
            modalProductPrice.textContent =
                "PKR " +
                currentProduct.price
                    .toLocaleString("en-PK");
        }


        /* OLD PRICE */

        const oldPrice =
            button.dataset.oldprice || "";

        if (modalOldPrice) {

            modalOldPrice.textContent =
                oldPrice
                    ? "PKR " +
                      Number(oldPrice)
                        .toLocaleString("en-PK")
                    : "";
        }


        /* DESCRIPTION */

        if (modalProductDescription) {

            modalProductDescription.textContent =
                button.dataset.description ||
                "Beautifully crafted women's wear with premium fabric, elegant detailing and excellent finishing.";
        }


        /* FABRIC */

        if (modalFabric) {
            modalFabric.textContent =
                currentProduct.fabric;
        }


        /* COLOR */

        if (modalColor) {
            modalColor.textContent =
                currentProduct.color;
        }


        /* RESET SIZE */

        document
            .querySelectorAll(".modal-sizes button")
            .forEach(function (btn) {

                btn.classList.remove("active");

            });


        /* OPEN MODAL */

        if (productModal) {
            productModal.classList.add("active");
        }

        if (productModalOverlay) {
            productModalOverlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";

    });


    /* ================= SIZE SELECT ================= */

    document.addEventListener("click", function (e) {

        const sizeButton =
            e.target.closest(".modal-sizes button");

        if (!sizeButton) return;


        document
            .querySelectorAll(".modal-sizes button")
            .forEach(function (btn) {

                btn.classList.remove("active");

            });


        sizeButton.classList.add("active");

    });


    /* ================= ADD TO BAG ================= */

    if (modalAddToBag) {

        modalAddToBag.addEventListener(
            "click",
            function () {


                /* GET SELECTED SIZE */

                const selectedSize =
                    document.querySelector(
                        ".modal-sizes button.active"
                    );


                /* SIZE REQUIRED */

                if (!selectedSize) {

                    alert(
                        "Please select your size first."
                    );

                    return;
                }


                const size =
                    selectedSize.textContent.trim();


                /* CHECK PRODUCT */

                if (
                    !currentProduct.name ||
                    !currentProduct.price ||
                    !currentProduct.image
                ) {

                    alert(
                        "Product information missing."
                    );

                    return;
                }


                /* FIND SAME PRODUCT + SIZE */

                const existing =
                    cart.find(function (item) {

                        return (
                            item.name ===
                                currentProduct.name
                            &&
                            item.size === size
                        );

                    });


                /* ADD / INCREASE */

                if (existing) {

                    existing.quantity += 1;

                } else {

                    cart.push({

                        id: Date.now(),

                        name:
                            currentProduct.name,

                        price:
                            currentProduct.price,

                        image:
                            currentProduct.image,

                        size:
                            size,

                        quantity: 1

                    });

                }


                /* SAVE */

                saveCart();

                renderCart();


                /* CLOSE QUICK VIEW */

                if (productModal) {
                    productModal.classList.remove(
                        "active"
                    );
                }

                if (productModalOverlay) {
                    productModalOverlay.classList.remove(
                        "active"
                    );
                }

                document.body.style.overflow = "";


                /* OPEN CART */

                openCart();

            });

    }


    /* ================= CLOSE ================= */

    function closeQuickView() {

        if (productModal) {
            productModal.classList.remove(
                "active"
            );
        }

        if (productModalOverlay) {
            productModalOverlay.classList.remove(
                "active"
            );
        }

        document.body.style.overflow = "";

    }


    if (productModalClose) {

        productModalClose.addEventListener(
            "click",
            closeQuickView
        );

    }


    if (productModalOverlay) {

        productModalOverlay.addEventListener(
            "click",
            closeQuickView
        );

    }


    /* ================= ESC ================= */

    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Escape") {
                closeQuickView();
            }

        }
    );

});


/* =====================================================
   ADD TO BAG FROM QUICK VIEW
===================================================== */

if (modalAddToBag) {

    modalAddToBag.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();


            /* CHECK PRODUCT */

            if (!quickViewProduct) {

                alert("Product information missing.");

                return;

            }


            /* MAKE SURE CART EXISTS */

            if (!Array.isArray(cart)) {

                cart = [];

            }


            /* CREATE PRODUCT */

            const product = {

                id:
                    Date.now(),

                name:
                    quickViewProduct.name,

                price:
                    quickViewProduct.price,

                image:
                    quickViewProduct.image,

                quantity:
                    1,

                category:
                    quickViewProduct.category,

                fabric:
                    quickViewProduct.fabric,

                color:
                    quickViewProduct.color

            };


            /* CHECK EXISTING PRODUCT */

            const existing =
                cart.find(function(item) {

                    return item.name ===
                        product.name;

                });


            if (existing) {

                existing.quantity += 1;

            } else {

                cart.push(product);

            }


            /* SAVE */

            saveCart();


            /* CLOSE QUICK VIEW */

            closeQuickView();


            /* OPEN CART */

            if (
                typeof openCart ===
                "function"
            ) {

                openCart();

            }

        }
    );

}


/* =====================================================
   CLOSE BUTTON
===================================================== */

if (productModalClose) {

    productModalClose.addEventListener(
        "click",
        function() {

            closeQuickView();

        }
    );

}


/* =====================================================
   CLOSE OVERLAY
===================================================== */

if (productModalOverlay) {

    productModalOverlay.addEventListener(
        "click",
        function() {

            closeQuickView();

        }
    );

}


/* =====================================================
   CLOSE FUNCTION
===================================================== */

function closeQuickView() {

    if (productModal) {

        productModal.classList.remove("active");

    }


    if (productModalOverlay) {

        productModalOverlay.classList.remove("active");

    }


    document.body.style.overflow = "";

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeQuickView();

        }

    }
);


/* =====================================================
   SIZE BUTTONS
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".modal-sizes button"
            );

        if (!button) return;


        document
            .querySelectorAll(
                ".modal-sizes button"
            )
            .forEach(function(btn) {

                btn.classList.remove("active");

            });


        button.classList.add("active");

    }
);
/* =====================================================
   EMBRES — SALE COUNTDOWN TIMER
===================================================== */

(function () {

    const daysElement =
        document.getElementById("timerDays");

    const hoursElement =
        document.getElementById("timerHours");

    const minutesElement =
        document.getElementById("timerMinutes");

    const secondsElement =
        document.getElementById("timerSeconds");


    /* TIMER HTML NA HO TO STOP */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    /* =================================================
       SALE END — 12 HOURS
    ================================================= */

    let saleEnd =
        localStorage.getItem("embresSaleEnd");


    if (!saleEnd) {

        saleEnd =
            Date.now() +
            (12 * 60 * 60 * 1000);

        localStorage.setItem(
            "embresSaleEnd",
            saleEnd
        );

    }


    saleEnd = Number(saleEnd);


    /* =================================================
       UPDATE TIMER
    ================================================= */

    function updateTimer() {

        const now = Date.now();

        const difference =
            saleEnd - now;


        /* SALE FINISHED */

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            return;
        }

  /* DAYS */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        /* HOURS */

        const hours =
            Math.floor(
                (difference /
                (1000 * 60 * 60)) % 24
            );


        /* MINUTES */

        const minutes =
            Math.floor(
                (difference /
                (1000 * 60)) % 60
            );


        /* SECONDS */

        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateTimer();

    setInterval(
        updateTimer,
        1000
    );

})();



/* =====================================================
   EMBRES — LOADING ANIMATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loader =
            document.getElementById("embresLoader");

        const progressBar =
            document.getElementById(
                "loaderProgressBar"
            );

        const percentText =
            document.getElementById(
                "loaderPercent"
            );


        if (!loader) return;


        let progress = 0;


        const loadingInterval =
            setInterval(function () {

                progress +=
                    Math.floor(
                        Math.random() * 4
                    ) + 1;


                if (progress >= 100) {

                    progress = 100;

                    clearInterval(
                        loadingInterval
                    );

                }


                if (progressBar) {

                    progressBar.style.width =
                        progress + "%";

                }


                if (percentText) {

                    percentText.textContent =
                        progress + "%";

                }


                if (progress >= 100) {

                    setTimeout(function () {

                        loader.classList.add(
                            "loader-hidden"
                        );


                        setTimeout(function () {

                            loader.style.display =
                                "none";

                        }, 1000);

                    }, 500);

                }


            }, 60);

    });



/* =====================================================
   REMOVE ONLY ELEGANCE SECTION
   SALE TIMER KO REMOVE NAHI KARNA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document
            .querySelectorAll("section")
            .forEach(function (section) {

                const text =
                    section.innerText.toLowerCase();


                if (
                    text.includes("elegance made") &&
                    text.includes("beautiful")
                ) {

                    section.remove();

                }

            });

    });

