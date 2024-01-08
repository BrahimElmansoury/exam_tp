const express = require("express")
const fs = require("fs")
const { verifyJoke, middlewareVerification } = require("./utils")
const PORT = 3000
const app = express()
app.use(express.static("./static"))
app.use(express.json()) 
app.listen(PORT,()=>console.log("server started at ", PORT))


app.get("/jokes",(req,res)=>{
    fs.readFile("./database/jokes.json",(err,data)=>{
        if(err)
            return res.status(500).send("error on the server")
        let jokes = JSON.parse(data.toString()).jokes
        res.status(200).json(jokes)
    });
})

app.post("/jokes", middlewareVerification,(req,res)=>{
    let {joke,author,jokeLike} = req.body
    fs.readFile("./database/jokes.json",(err,dataFile)=>{
        if(err)
            return res.status(500).send("error on the server")
        let data = JSON.parse(dataFile.toString())
        let jokeToSave = {
            id:data.lastId,
            joke,
            author,
            jokeLike
        }
        data.jokes.push(jokeToSave)
        data.lastId++
        fs.writeFile("./database/jokes.json",JSON.stringify(data,null,4),(err)=>{
            if(err)
                return res.status(500).send("error on the server")
            res.status(201).json(jokeToSave)
        })
    });
})

app.delete("/jokes/:id",(req,res)=>{
    let {id} = req.params
    fs.readFile("./database/jokes.json",(err,data)=>{
        if(err)
            return res.status(500).send("error on the server")
        let dataFile = JSON.parse(data.toString())
        let jokes = dataFile.jokes
        let jokeIndex = jokes.findIndex(ele=>ele.id==id)
        if(jokeIndex==-1)
            return res.status(404).send("joke not found")
        dataFile.jokes = jokes.filter(ele=>ele.id!=id)
        fs.writeFile("./database/jokes.json",JSON.stringify(dataFile,null,4),(err)=>{
            if(err)
                return res.status(500).send("error on the server")
            res.status(200).json("joke is deleted with success")
        })
    });
})

app.put("/jokes/:id", middlewareVerification,(req,res)=>{
    let {id} = req.params
    fs.readFile("./database/jokes.json",(err,data)=>{
        if(err)
            return res.status(500).send("error on the server")
        let dataFile = JSON.parse(data.toString())
        let jokes = dataFile.jokes
        let jokeData = jokes.find(ele=>ele.id==id)
        if(!jokeData)
            return res.status(404).send("joke not found")
       let {joke,author,jokeLike} = req.body
       jokeData.joke=joke
       jokeData.author=author
       jokeData.jokeLike=jokeLike
       fs.writeFile("./database/jokes.json",JSON.stringify(dataFile,null,4),(err)=>{
        if(err)
            return res.status(500).send("error on the server")
        res.status(200).json(jokeData)
    })
    });
})






