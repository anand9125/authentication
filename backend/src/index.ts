import express from "express";
import cookieParser from "cookie-parser";   //Parse a very long cookie string and gets you an object
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";
//  What  cors do This allows your backend to handle requests from a different origin

const app = express();
app.use(cookieParser());  //cookie parser middelwares 
app.use(express.json());  //express json middleware
app.use(cors({    //if we are usign cors or allowing cross orignin request
    //and if we want to cooki to be set we need to be pass credentitial to be true//
    //and we need to give it ot origin ,,we are doing allow this origin with credentials allow to server to set cookie on this specific origin  
  //if we dont do this my cokie will not set and authentication doesnot happen
    credentials: true,
    origin: "http://localhost:5173"
}));

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token);//response header me jwt token ko tokan namak cookie ke roop me set karta hai
    //sets the JWT token in the response headers as a cookie named token.
    // This cookie can then be used by the client in future requests to prove that they are authenticated
    res.send("Logged in!");
});

//cookie will come every subsequnt request it will  come by default

app.get("/user", (req, res) => { 
    const token = req.cookies.token; // this is the way to get the cookie  this is given by coookie parser
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});


app.post("/logout", (req, res) => {
    res.cookie("token", " ");  //sent back a set cookie header with the empty header
    res.json({
        message: "Logged out!"
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"))
})

app.listen(3000);