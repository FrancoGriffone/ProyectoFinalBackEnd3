import express from "express";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import config from "../../../connection.js";
import { webAuth } from "../../auth/index.js";
import { faker } from "@faker-js/faker";
import Producto from "./../../DAOs/Producto.dao.class.js";
import passport from "./../../config/passportConfig.js";
import { fork } from "child_process";
import os from "os";
import pino from "pino";
import cluster from 'node:cluster';
import userModel from "../../models/userSchema.js";
import Carrito from "../../DAOs/Carrito.dao.class.js";
import { createTransport } from 'nodemailer';
 
const carrito = new Carrito(); 
const numCpu = os.cpus().length;
const products = new Producto();
const router = express.Router();
const forked = fork("child.js");
const PORT = parseInt(process.argv[2]) || 8080

//PINO
const loggerError = pino("error.log")
const loggerWarn = pino("warning.log")
const loggerInfo = pino()
loggerError.level = "error"
loggerWarn.level = "warn"
loggerInfo.level = "info"

router.use(passport.initialize());

router.use(
  session({
    //store: MongoStore.create({ mongoUrl: config.mongoLocal.cxnStr }),
    secret: "TOP SECRET",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
      maxAge: 600000,
    },
  })
);

//PINO MIDDLEWEAR
router.use((req, res, next)=>{
	loggerInfo.info(`Peticion entrando ---> Ruta: ${req.url}, método: ${req.method}`)
	next()
})

//NO SE DONDE PONERLO
router.get("/mandarMail/:id", async (req, res) => {
  const carritoPorId = await carrito.listar(req.params.id);
  const transporter = createTransport({
      service: "gmail",
      port: 587, 
      auth: {
          user: process.env.TEST_MAIL, 
          pass: process.env.PASS_APP
      } 
  });
  
  const mailOptions = {
      from: 'Servidor Node.js',
      to: process.env.TEST_MAIL, //NO ME TOMA EL REQ.SESSION.PASSPORT.USER
      subject: 'Gracias por tu compra!',
      html: '<h1>Agradecemos que confies en nosotros!</h1>'
  }
  
  try {
      const info = await transporter.sendMail(mailOptions)
      console.log(info)
  } catch (error) {
      console.log(error)
  }
  res.send(carritoPorId);
});

//LO IDEAL SERIA QUE SE SE PIERDE LA SESSION VUELVA AL LOGIN
router.get("/usuario", (req, res)=>{
  let data = []
  async function buscarPersona (){
    const usuario = await userModel.findOne({
        username: req.session.passport.user
    })
    data.push({ usuario })
    res.status(200).json(data)
} buscarPersona()
})

/*router.get("/info", (req, res) => {
  const info = [
    {
      pid: process.pid,
      version: process.version,
      id: process.id,
      memoria: process.memoryUsage().rss,
      sistemaOperativo: process.platform,
      carpeta: process.cwd(),
      path: process.argv[0],
      cpus: numCpu,
      puerto: PORT,
    },
  ];
  console.log(process.argv);

  if(info) {
    //res.render(path.join(process.cwd(), "/views/info.ejs"), { info });
    res.status(200).json(info)
} else{
    res.status(404).send({message: "Not found"})
  }
});*/

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/api/randoms", (req, res) => {
  const random = req.query.cant || 100000000;
  forked.send(random);
  forked.on("message", (msg) => {
    res.end(msg);
  });
});

router.get("/home", (req, res) => {
  const username = req.session?.passport.user;
  console.log(req.session);
  res.render(path.join(process.cwd(), "/views/home.ejs"), { username });
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/partials/register.html"));
});

router.get("/userData", (req, res) => {
  console.log(req.session.passport.user)
  res.json({ message: "User logged in" });
});

router.get("/login", (req, res) => {
  const username = req.session?.username;
  if (username) {
    res.redirect("/home");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/partials/login.html"));
  }
});

router.get("/login-error", (req, res) => {
  loggerError.error("Error en el logueo");
  res.sendFile(path.join(process.cwd(), "/views/partials/login-error.html"));
});

router.get("/register-error", (req, res) => {
  loggerError.error("Error en el registro");
  res.sendFile(path.join(process.cwd(), "/views/partials/register-error.html"));
});

router.get("/logout", (req, res) => {
  const username = req.session?.passport.user;
  if (username) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/logout.ejs"), { username });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

router.post("/home", (req, res) => {
  const product = req.body;
  products.put(product);
  res.redirect("/home");
});

router.post(
  //ok
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/register-error",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login-error",
  }),
  function (req, res) {
    res.render("home", { username: req.body.username });
  }
  //req.session.username = req.body.username

  //res.redirect('/home')
);

router.get("/api/productos-test", (req, res) => {
  let response = [];
  for (let index = 0; index <= 5; index++) {
    response.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image(),
    });
  }

  res.render("test.ejs", { response: response });
});

export default router;
