const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static('public'))


// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});





//GET REQUEST

app.get("/", (req, res) => {
  // result ==> array of objects
  console.log("-----------------------------------------------------------")
  User.find()
    .then((result) => {
      res.render("index", { arr: result });
    }).catch(() => {
      console.log(err);
    })

});


app.get("/user/", (req, res) => {
  // result ==> object
  User.findById("66827d3fe9d9b9de50e399f4")
    .then((result) => { console.log(result)}).catch(() => {
      console.log(err)
    })

  res.render("user/view")


});

app.get("/user/add.html", (req, res) => {
  res.render("user/add")
});


app.get("/user/edit.html", (req, res) => {
  res.render("user/edit")
});


//POST REQUEST


app.post("/user/add.html", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});





mongoose
  .connect(
    "mongodb+srv://osamatalal744:o123@cluster0.d2wvcro.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


