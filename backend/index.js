const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Note = require('./models/Note');


require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 8000;


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use((req,res,next)=>{
  console.log(`request received: ${req.method} to the url: ${req.url}`);
  next();
})
app.use(express.urlencoded({ extended: true }));
const rateLimit = require('express-rate-limit');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: "Rate limit exceeded. Please try again later." }
});

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
}));
app.use(limiter);

// Routes
const noteRoute = require('./rotues/noteRoute');

app.use("/api/notes", noteRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);  
});