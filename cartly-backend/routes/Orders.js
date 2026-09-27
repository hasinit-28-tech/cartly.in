const express = require("express");

const router = express.Router();

const Order = require("../entities/Order");


// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            customer,
            items,
            paymentMethod,
            subtotal,
            shipping,
            total
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (
            !customer ||
            !customer.name ||
            !customer.email
        ) {

            return res.status(400).json({
                success: false,
                message: "Customer details are required"
            });

        }


        if (
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            });

        }


        if (!paymentMethod) {

            return res.status(400).json({
                success: false,
                message: "Payment method is required"
            });

        }


        // ==========================================
        // GENERATE CARTLY ORDER ID
        // ==========================================

        const orderId =
            "CRT" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // ==========================================
        // CREATE ORDER
        // ==========================================

        const newOrder = new Order({

            orderId,

            customer: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone || ""
            },

            items: items.map(item => ({

                productId:
                    item.productId || "",

                name: item.name,

                image:
                    item.image || "",

                price:
                    Number(item.price),

                quantity:
                    Number(item.quantity) || 1

            })),

            paymentMethod,

            subtotal:
                Number(subtotal) || 0,

            shipping:
                Number(shipping) || 0,

            total:
                Number(total) || 0,

            status: "Confirmed"

        });


        // ==========================================
        // SAVE TO MONGODB
        // ==========================================

        const savedOrder =
            await newOrder.save();


        console.log(
            "✅ Order saved:",
            savedOrder.orderId
        );


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(201).json({

            success: true,

            message:
                "Order placed successfully",

            order: savedOrder

        });


    } catch (error) {

        console.error(
            "❌ Order creation error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to place order",

            error:
                error.message

        });

    }

});


// ==========================================
// GET ALL ORDERS
// GET /api/orders
// ==========================================

router.get("/", async (req, res) => {

    try {

        const orders =
            await Order
                .find()
                .sort({
                    createdAt: -1
                });


        res.json({

            success: true,

            orders

        });


    } catch (error) {

        console.error(
            "❌ Fetch orders error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch orders"

        });

    }

});


// ==========================================
// GET SINGLE ORDER
// GET /api/orders/:orderId
// ==========================================

router.get("/:orderId", async (req, res) => {

    try {

        const order =
            await Order.findOne({

                orderId:
                    req.params.orderId

            });


        if (!order) {

            return res.status(404).json({

                success: false,

                message:
                    "Order not found"

            });

        }


        res.json({

            success: true,

            order

        });


    } catch (error) {

        console.error(
            "❌ Fetch single order error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch order"

        });

    }

});


// ==========================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:orderId/status
// ==========================================

router.patch(
    "/:orderId/status",
    async (req, res) => {

        try {

            const { status } =
                req.body;


            if (!status) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Status is required"

                });

            }


            const order =
                await Order.findOneAndUpdate(

                    {
                        orderId:
                            req.params.orderId
                    },

                    {
                        status
                    },

                    {
                        new: true
                    }

                );


            if (!order) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found"

                });

            }


            res.json({

                success: true,

                message:
                    "Order status updated",

                order

            });


        } catch (error) {

            console.error(
                "❌ Status update error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to update order status"

            });

        }

    }
);


module.exports = router;