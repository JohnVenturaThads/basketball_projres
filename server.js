const express = require ('express');
const app = express (); 
const resvRoutes = require('./routes/api/reserve_tb.js');
const authRoutes = require ('./routes/api/auth.js');
const ownRoutes = require ('./routes/api/ownerconfirm.js');
const payRoutes = require ('./routes/api/payment_tb.js');
const careRoutes = require ('./routes/api/caretaker.js');

app.get('/',(req, res)=>res.send('API Running, No Error'));
app.use(express.json({extend: false}));
app.use('/reserve', resvRoutes);
app.use('/auth', authRoutes);
app.use('/owner', ownRoutes);
app.use('/payment', payRoutes);
app.use('/caretaker', careRoutes);

const PORT = 6000;

app.listen(PORT,() => console.log (`Server Started on port ${PORT}`));
