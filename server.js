const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('http');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 9000;
require('dotenv').config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'moviesapi'

MongoClient.connect(dbConnectionStr, (err, client) => {
    if(err) return console.log(err)
    console.log('Saddle up Database is connected')
    db = client.db(dbName)

})

app.use(cors());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Port is running on ${PORT} go catch it`)
});

//Handlers create(post) read(get) update(put) delete(delete) 
app.get('/', (req, res) => {
    db.collection('movies').find().toArray()
    .then(data => {
        res.render('moviesapi', { movies: data })
        console.log(data)
    })
    .catch(error => console.error(error))
})

app.post('/addMovie',(req, res) => {
    db.collection('movies').insertOne({
        title: req.body.title,
        genre: req.body.genre,
        likes: 0
    })
    .then(result =>{
        console.log('Movie Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (req, res) => {
    db.collection('movies').updateOne({title: req.body.mTitleS, genre: req.body.mGenreS}, {
        $set: {
            likes:req.body.mLikesS + 1
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Added One Like')
        res.json('Like added')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteMovie', (req, res) => {
    db.collection('movies').deleteOne({ title: req.body.mTitleS })
    .then(result => {
        console.log('Movie deleted')
        res.json('Movie deleted')
    })
    .catch(error => console.error(error))
    })