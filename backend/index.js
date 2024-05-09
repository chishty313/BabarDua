//package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
//file imports
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { v4 as uuidv4 } from 'uuid';
import DonateModel from '../backend/models/donateModel.js'

//routes import
import allRoutes from "./routes/index.js";

// dotenv config //
// dotenv.config({ path: './config' })
dotenv.config();
//--- db connection ---//
connectDB();

//rest object//
const app = express();

// ---- Middlewares--- //
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  // origin: "*",
  credentials: true,
}));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(morgan("dev"));
app.use(cookieParser())

// ------ Routes ------ //
app.get("/", (req, res) => {
  res.status(200).json({ message: "/ get request working" });
});

app.use(allRoutes);


// validation middleware
app.use(errorMiddleware);


import SSLCommerzPayment from 'sslcommerz-lts'
import authMiddleware from "./middlewares/authMiddleware.js";
const store_id = 'towil662ab3aeae2da'
const store_passwd = 'towil662ab3aeae2da@ssl'
const is_live = false //true for live, false for sandbox

const port = 3030

//sslcommerz init
app.post('/init', authMiddleware, async (req, res) => {
  const userId = req.userid
  const amount = req.body.amount

  const tran_id = uuidv4();

  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:4000/validate?tran_id=${tran_id}`,
    fail_url: 'http://localhost:5173/booksearch',
    cancel_url: 'http://localhost:5173/cancel',
    ipn_url: 'http://localhost:5173/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment('jervi662bfeac21dab', 'jervi662bfeac21dab@ssl', false)
  const apiResponse = await sslcz.init(data)
  console.log({ apiResponse });
  // Redirect the user to payment gateway
  console.log(apiResponse.GatewayPageURL);
  let GatewayPageURL = apiResponse.GatewayPageURL

  // ! add to database
  const userDonation = await DonateModel.create({
    userId,
    amount,
    tran_id,
    success: 'PENDING',
  })
  // await userDonation.save();
  res.json({ GatewayPageURL })
  // console.log('Redirecting to: ', GatewayPageURL)
});

//sslcommerz validation 
// you also use this as internal method
app.post('/validate', async (req, res) => {
  const data = {
    tran_id: req.query.tran_id //that you go from sslcommerz response
  };
  const sslcommer = new SSLCommerzPayment('jervi662bfeac21dab', 'jervi662bfeac21dab@ssl', false) //true for live default false for sandbox
  await sslcommer.transactionQueryByTransactionId(data.tran_id)
  // console.log({ data });

  await DonateModel.findOneAndUpdate(
    { tran_id: req.query.tran_id },
    { success: 'SUCCESS' }
  )


  res.redirect('http://localhost:5173/booksearch')
  //process the response that got from sslcommerz 
  // https://developer.sslcommerz.com/doc/v4/#order-validation-api

}) 

//-------- Listen -------//
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server starting...".blue);
  console.log(
    `server running on ${process.env.DEV_MODE} mode on port http://localhost:${PORT}`
      .bgCyan
  );
});
