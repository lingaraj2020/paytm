const express = require("express");
const mainRouter=require("./routes/index");

const app=express();
const PORT=3000;

app.use("/api/v1",mainRouter);
app.use(mainRouter);

app.listen(PORT,function(err){
    if(err) console.log(err);
    console.log("server is running on port",PORT);
})




