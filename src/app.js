const path = require('path')
const express = require('express')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is raining',
        location: 'Delhi'
    })
})

// app.com 
// app.com/help
// app.com/about

app.listen(5000, () => {
    console.log('Server started at port 5000');
})