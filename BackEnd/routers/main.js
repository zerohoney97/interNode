const router = require("express").Router();
const path = require('path');

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..','FrontEnd','mainpage','mainpage.html'));
});

router.get('/seats/:id',(req,res)=>{
  res.sendFile(path.join(__dirname, '..', '..','FrontEnd','seat','seat.html'));

})

module.exports=router