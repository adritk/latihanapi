const express = require('express') // untuk membuat rest api
const cors = require('cors') // agar api bisa diakses dari frondend
const bodyParser = require('body-parser') // agar api bisa menerima parameter body
const port = 4000
const connection = require('./database/index')

const app = express()
var arrProducts =  [
    {   id:4,
        nama: 'Popok Hokage',
        description: 'Siapkah anda menjadi hokage',
        harga: 50000
    },
    {
        id:7,
        nama: 'Popok Naruto',
        description: 'Naruto menggunakannya dari kecil',
        harga: 100000
    }
]

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req,res) => {
    res.status(500).send('<h1>Selamat Datang API latihan</h1>')
})

app.get('/categories/:nama', (req,res) => {
    console.log(req.params.nama)
    const query = `SELECT *
                    FROM 
                    categories
                    WHERE category = ${connection.escape(req.params.nama)}` //mencegah sql injecttion

    connection.query(query,  (err, results) => {
        if (err) {
           return res.status(500).send(err) //jika err tidak ada isi masuk ke send
        }
        console.log('error : ' ,err)
        // console.log('results : ' ,results)

        res.status(200).send(results)
      });
})

app.post('/categories', (req,res) => {
    console.log(req.query)
    // ?contoh=kacrut&name=adri

    console.log(req.body)

    // `INSERT INTO categories (category, parentId) VALUES
    // (${connection.escape(req.body.category)}, ${connection.escape(req.body.parentId)})` cara insert data yang ribet
    const query = `INSERT INTO categories SET ? `
    console.log(query)
    connection.query(query, req.body, (err,results) => {
        if(err) {
            return res.status(500).status(err)
        }

        console.log(results)
        res.status(200).send(results)
    })
})

app.put('/categories/:id', (req,res) => {
    console.log(req.params)
    console.log(req.body)

    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    // console.log(query)
    connection.query(query, req.body, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }

        res.status(200).send(results)
    })
})

app.delete('/categories/:id', (req,res) => {
    console.log(req.params.id)

    const query = `DELETE FROM categories WHERE id = ${connection.escape(req.params.id)}`
    connection.query(query, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }

        console.log(results)
        res.status(200).send(results)
    })
})

app.get('/products', (req,res) => {
    res.status(200).send(arrProducts)
})

app.get('/products/:id', (req,res) => {
    var hasil = arrProducts.filter((item) => {
        return item.id === parseInt(req.params.id)
    })
    if (hasil.length === 0) {
        return res.status(500).send({status: 'Not Found', message: 'product'})
    }

    res.status(200).send(hasil[0])
})

app.post('/products', (req,res) => {
    console.log(req.body)
    arrProducts.push(req.body)
    console.log(arrProducts)
    
    res.status(200).send({
        status: "Success",
        message: "Add Product Success"
    })
})

app.listen(port, () => console.log(`API berhasil aktif di port ${port}` )) //untuk menjalankan res api