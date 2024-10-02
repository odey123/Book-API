const Book = require('../models/book');
express = require('express')
const router = express.Router()

router.post(`/`, async (req, res) => {
    let book = new Book ({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
    })

    book = await book.save();

    if(!book) {
        return res.status(404).json({
            success:false,
            message:"This book cannot be created! "
        });

    } 


    res.status(200).json({
        success: true,
        message: "Book succefully created",
        data: book,
    })
})

router.get('/', async (req, res) => {
   const booklist = await Book.find()

   if(!booklist) {
    res.status(500).send('booklist not found')
   }
   res.status(200).json({success: true, data:booklist})
});

router.get('/:id', async(req, res)=> {
    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(400).send('Book not found')
    }
       res.status(200).json({success: true, data:book})
})


router.patch('/:id', async(req, res)=> {
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        },
        { new: true}
    )

if(!book) {
return res.status(400).json({success: false, message: 'This book does not exist'})
    }
    return res.status(201).json({success:true, message:"book successfully updated"})
    }
)

router.delete('/:id', async(req, res)=> {
        Book.findByIdAndDelete(req.params.id).then(book => {
            if(book) {
                return res.status(200).json({success: true, message: 'The book has been deleted'})
            } else {
                return res.staus(404).json({success: false, message: 'product not found'})
            }   
        })
    

})

module.exports = router