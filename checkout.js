/* =====================================================
   CARTLY.IN — CHECKOUT
   FRONTEND → BACKEND → MONGODB
   ===================================================== */


/* ================= CART ================= */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


/* ================= BACKEND ================= */

const API_URL = "http://localhost:5000/api/orders";


/* ================= ELEMENTS ================= */

const productsContainer =
    document.getElementById("checkoutProducts");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");

const itemCountElement =
    document.getElementById("itemCount");

const placeOrderBtn =
    document.getElementById("placeOrderBtn");

const successModal =
    document.getElementById("successModal");

const orderNumberElement =
    document.getElementById("orderNumber");


/* ================= PRODUCT DATABASE ================= */

const productDatabase = {

    "Oversized Graphic Tee": {
        price: 899,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500"
    },

    "Relaxed Street Shirt": {
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500"
    },

    "Essential Oversized Tee": {
        price: 799,
        image:
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=500"
    },

    "Luxury Satin Dress": {
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500"
    },

    "Streetwear Fit": {
        price: 1799,
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=500"
    },

    "Royal Regency Outfit": {
        price: 2999,
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500"
    },

    "Pearl Earrings": {
        price: 699,
        image:
            "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=500"
    },

    "Luxury Handbag": {
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500"
    },

    "Neutral Heels": {
        price: 1599,
        image:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500"
    },

    "Chunky Sneakers": {
        price: 2299,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500"
    },

    "Signature Everyday Top": {
        price: 999,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500"
    },

    "Classic Statement Shirt": {
        price: 1299,
        image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500"
    },

    "Straight Fit Jeans": {
        price: 1499,
        image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500"
    }

};


/* ================= GET PRODUCT ================= */

function getProduct(name) {

    return productDatabase[name] || {

        price: 999,

        image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500"

    };

}


/* ================= NORMALIZE CART ITEM ================= */

function normalizeCartItem(item) {

    /*
       Supports both:

       1. Old cart format:
          ["Luxury Satin Dress", "Pearl Earrings"]

       2. Object format:
          [
             {
                name: "Luxury Satin Dress",
                quantity: 2
             }
          ]
    */

    if (typeof item === "string") {

        const product = getProduct(item);

        return {
            productId: "",
            name: item,
            image: product.image,
            price: Number(product.price),
            quantity: 1
        };

    }


    const name =
        item.name ||
        item.title ||
        "Cartly Product";

    const product =
        getProduct(name);

    return {

        productId:
            item.productId ||
            item.id ||
            "",

        name: name,

        image:
            item.image ||
            product.image,

        price:
            Number(
                item.price ||
                product.price
            ),

        quantity:
            Number(
                item.quantity ||
                item.qty ||
                1
            )

    };

}


/* ================= GET ORDER ITEMS ================= */

function getOrderItems() {

    return cart.map(
        item => normalizeCartItem(item)
    );

}


/* ================= DISPLAY CART ================= */

function displayCart() {

    productsContainer.innerHTML = "";

    if (cart.length === 0) {

        productsContainer.innerHTML = `

            <div class="empty-cart">

                <strong>
                    Your bag is empty
                </strong>

                <span>
                    Looks like you haven't added
                    anything yet. 🛍️
                </span>

            </div>

        `;

        itemCountElement.textContent =
            "0 items";

        updateTotals(0);

        return;

    }


    const orderItems =
        getOrderItems();


    let subtotal = 0;

    let totalQuantity = 0;


    orderItems.forEach(
        (item) => {

            subtotal +=
                item.price *
                item.quantity;

            totalQuantity +=
                item.quantity;


            productsContainer.innerHTML += `

                <div class="checkout-product">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="checkout-product-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            Quantity: ${item.quantity}
                        </p>

                    </div>

                    <div class="checkout-product-price">

                        ₹${(
                            item.price *
                            item.quantity
                        ).toLocaleString("en-IN")}

                    </div>

                </div>

            `;

        }
    );


    itemCountElement.textContent =
        `${totalQuantity} ${
            totalQuantity === 1
                ? "item"
                : "items"
        }`;


    updateTotals(subtotal);

}


/* ================= TOTALS ================= */

let discount = 0;


function calculateSubtotal() {

    const orderItems =
        getOrderItems();

    return orderItems.reduce(
        (sum, item) => {

            return sum +
                (
                    item.price *
                    item.quantity
                );

        },
        0
    );

}


function calculateDelivery(subtotal) {

    if (
        subtotal > 0 &&
        subtotal < 1999
    ) {

        return 99;

    }

    return 0;

}


function calculateTotal(
    subtotal
) {

    const delivery =
        calculateDelivery(
            subtotal
        );

    return (
        subtotal +
        delivery -
        discount
    );

}


function updateTotals(subtotal) {

    const delivery =
        calculateDelivery(
            subtotal
        );


    const total =
        calculateTotal(
            subtotal
        );


    subtotalElement.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;


    deliveryElement.textContent =
        delivery === 0
            ? "FREE"
            : `₹${delivery}`;


    discountElement.textContent =
        `-₹${discount.toLocaleString("en-IN")}`;


    totalElement.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* ================= PAYMENT ================= */

const paymentOptions =
    document.querySelectorAll(
        ".payment-option"
    );


paymentOptions.forEach(
    option => {

        option.addEventListener(
            "click",
            () => {

                paymentOptions.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                option.classList.add(
                    "active"
                );


                const radio =
                    option.querySelector(
                        "input"
                    );


                if (radio) {

                    radio.checked = true;

                }

            }
        );

    }
);


/* ================= PROMO ================= */

const applyPromo =
    document.getElementById(
        "applyPromo"
    );


if (applyPromo) {

    applyPromo.addEventListener(
        "click",
        () => {

            const input =
                document.getElementById(
                    "promoInput"
                );

            const message =
                document.getElementById(
                    "promoMessage"
                );


            const code =
                input.value
                    .trim()
                    .toUpperCase();


            if (code === "CARTLY10") {

                const subtotal =
                    calculateSubtotal();


                discount =
                    Math.round(
                        subtotal * 0.10
                    );


                message.textContent =
                    "✨ 10% discount applied!";


                message.style.color =
                    "#5f936d";


                updateTotals(
                    subtotal
                );

            }

            else if (code === "") {

                message.textContent =
                    "Enter a promo code.";

                message.style.color =
                    "#b76b76";

            }

            else {

                message.textContent =
                    "Invalid promo code.";

                message.style.color =
                    "#b76b76";

            }

        }
    );

}


/* ================= VALIDATION ================= */

function validateForm() {

    const fullName =
        document.getElementById(
            "fullName"
        );


    const email =
        document.getElementById(
            "email"
        );


    const phone =
        document.getElementById(
            "phone"
        );


    /*
       ADDRESS IS NOT REQUIRED NOW.
       We removed address/city/state/pincode
       validation because checkout no longer
       uses delivery address fields.
    */


    if (
        !fullName ||
        !fullName.value.trim()
    ) {

        alert(
            "Please enter your full name."
        );

        if (fullName) {
            fullName.focus();
        }

        return false;

    }


    if (
        !email ||
        !email.value.trim()
    ) {

        alert(
            "Please enter your email address."
        );

        if (email) {
            email.focus();
        }

        return false;

    }


    if (
        !email.value.includes("@")
    ) {

        alert(
            "Please enter a valid email address."
        );

        email.focus();

        return false;

    }


    if (
        !phone ||
        !phone.value.trim()
    ) {

        alert(
            "Please enter your phone number."
        );

        if (phone) {
            phone.focus();
        }

        return false;

    }


    if (
        !cart ||
        cart.length === 0
    ) {

        alert(
            "Your cart is empty."
        );

        return false;

    }


    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selectedPayment) {

        alert(
            "Please select a payment method."
        );

        return false;

    }


    return true;

}


/* ================= PLACE ORDER ================= */

placeOrderBtn.addEventListener(
    "click",
    async () => {

        /* Prevent multiple clicks */

        if (
            placeOrderBtn.disabled
        ) {

            return;

        }


        /* Validate */

        if (
            !validateForm()
        ) {

            return;

        }


        /* Disable button */

        placeOrderBtn.disabled =
            true;


        placeOrderBtn.style.opacity =
            "0.7";


        placeOrderBtn.querySelector(
            "span"
        ).textContent =
            "Placing Order...";


        try {

            /* =========================
               CUSTOMER
               ========================= */

            const customer = {

                name:
                    document.getElementById(
                        "fullName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim()

            };


            /* =========================
               PAYMENT
               ========================= */

            const paymentMethod =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            /* =========================
               ITEMS
               ========================= */

            const items =
                getOrderItems();


            /* =========================
               TOTALS
               ========================= */

            const subtotal =
                calculateSubtotal();


            const shipping =
                calculateDelivery(
                    subtotal
                );


            const total =
                calculateTotal(
                    subtotal
                );


            /* =========================
               ORDER DATA
               ========================= */

            const orderData = {

                customer,

                items,

                paymentMethod,

                subtotal,

                shipping,

                total

            };


            console.log(
                "Sending order to Cartly backend:",
                orderData
            );


            /* =========================
               SEND TO BACKEND
               ========================= */

            const response =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                orderData
                            )

                    }
                );


            const data =
                await response.json();


            console.log(
                "Backend response:",
                data
            );


            /* =========================
               BACKEND ERROR
               ========================= */

            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to place order."
                );

            }


            /* =========================
               ORDER SUCCESS
               ========================= */

            const savedOrder =
                data.order;


            const orderId =
                savedOrder.orderId;


            /* Show order number */

            if (
                orderNumberElement
            ) {

                orderNumberElement.textContent =
                    orderId;

            }


            /* Save latest order */

            localStorage.setItem(
                "latestOrder",
                JSON.stringify(
                    savedOrder
                )
            );


            /* Clear cart */

            localStorage.removeItem(
                "cart"
            );


            /* Update local variable */

            cart = [];


            /* Show success modal */

            if (
                successModal
            ) {

                successModal.classList.add(
                    "show"
                );

            }


            console.log(
                "✅ Order successfully saved:",
                savedOrder
            );

        }

        catch (error) {

            console.error(
                "❌ Order placement failed:",
                error
            );


            alert(
                "Unable to place your order.\n\n" +
                "Please make sure the Cartly backend is running."
            );


            /* Re-enable button */

            placeOrderBtn.disabled =
                false;


            placeOrderBtn.style.opacity =
                "1";


            placeOrderBtn.querySelector(
                "span"
            ).textContent =
                "Place Order";

        }

    }
);


/* ================= CONTINUE SHOPPING ================= */

function continueShopping() {

    window.location.href =
        "index.html";

}


/* ================= DARK MODE ================= */

const darkModeBtn =
    document.getElementById(
        "darkModeBtn"
    );


if (darkModeBtn) {

    darkModeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "checkoutDark",
                isDark
                    ? "true"
                    : "false"
            );


            darkModeBtn.textContent =
                isDark
                    ? "☀️"
                    : "🌙";

        }
    );


    /* =========================
       RESTORE DARK MODE
       ========================= */

    if (
        localStorage.getItem(
            "checkoutDark"
        ) === "true"
    ) {

        document.body.classList.add(
            "dark"
        );


        darkModeBtn.textContent =
            "☀️";

    }

}


/* ================= INITIALIZE ================= */

displayCart();