const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {

        // ==========================================
        // ORDER ID
        // ==========================================

        orderId: {
            type: String,
            required: true,
            unique: true
        },


        // ==========================================
        // CUSTOMER
        // ==========================================

        customer: {

            name: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                default: ""
            }

        },


        // ==========================================
        // ORDER ITEMS
        // ==========================================

        items: [

            {

                productId: {
                    type: String,
                    default: ""
                },

                name: {
                    type: String,
                    required: true
                },

                image: {
                    type: String,
                    default: ""
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }

            }

        ],


        // ==========================================
        // PAYMENT
        // ==========================================

        paymentMethod: {
            type: String,
            required: true
        },


        // ==========================================
        // PRICE DETAILS
        // ==========================================

        subtotal: {
            type: Number,
            required: true
        },

        shipping: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            required: true
        },


        // ==========================================
        // ORDER STATUS
        // ==========================================

        status: {
            type: String,
            default: "Confirmed"
        }

    },

    {
        timestamps: true
    }
);


module.exports = mongoose.model(
    "Order",
    orderSchema
);