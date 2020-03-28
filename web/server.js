//Configurando o servidor//
const express = require("express")
const server = express()

//Configurando o servidor para ultilizar arquivos estáticos//
server.use(express.static('public'))

//Habilitar body do formulário//

server.use(express.urlencoded({extended: true}))

//Configurando a conexão com o banco de dados//

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'Ycl,,,98',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})



//Configurando a template engine//
const nunjucks = require('nunjucks')
nunjucks.configure("./", {
    express: server,
    noCache: true,
//Boolean ou booleano aceita duas coisas true e false//
})



server.post("/", function(req, res) {
    //Para pegar dados dos formulários//
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //IF significa Se (estrutura de condição)//
    //Se o nome for igual a vazio//
    //Ou o email for igual a vazio//
    //Ou o sangue for igual a vazio/
    if (name == "" || email == "" || blood =="") {
        return res.send("Todos os campos são obrigatórios.")
    }

    //Colocando valores/informações dentro do banco de dados//
    const query = 
    
    `INSERT INTO donors("name", "email", "blood")
     VALUES($1, $2, $3)`

     const values = [name, email, blood]



    db.query(query, values, function() {
        //Fluxo de erro//
        if(err) return res.send("erro no banco de dados.") 
        
        //Fluxo ideal//
        return res.redirect("/")
    })

})

//Configurando a apresentação da página// 
server.get("/", function(req, res) {
    db.query("SELECT * FROM donors", function(err, result){
        if (err) return res.send("Erro de banco de dados.")

        const donors = result.rows
        return res.render("index.html", { donors })
    })

})

//Para ligar o servidor e permitir o acesso na porta 3000//
server.listen(7000, function() {
    console.log("Você acabou de iniciar o servidor!")
})