const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res, next) =>{

    var now = new Date().toString();
    var log = ''+now+':'+req.method+req.url;

    fs.appendFile('server.log',log +'\n', (err)=>{
        if(err){
            console.log('unable to append to server.log');
        }
    });

    next();
});

app.use(express.static(__dirname +'/public'));

// app.use((req,res,next) =>{

//     res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req,res)=>{

    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my site',
        
    });

});

app.get('/about',(req,res)=>{

    res.render('about.hbs',{
        pageTitle: 'About Page',
        
    });

});

app.get('/projects',(req,res)=>{

    res.render('projects.hbs',{
        pageTitle: 'Project Page',
        
    });

});

app.get('/bad',(req,res)=>{

    res.send({
        errorMessage: 'Unable to handle request'
    });
    
});


app.listen(port,() =>{
    console.log('Server is on port ' + port);
});