const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')

const router = new express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.use(passport.initialize());
router.use(cors());

router.use(bodyParser.json());


let User = require('../models/user')

router.post('/note/:id', (req, res) => {
    const beerId = req.params.id;
    const entityId = req.user._id;
    const string = `data.${beerId}`;
    User.findByIdAndUpdate(entityId, {$set: {[string]: Object.keys(req.body)}}, function(err, user) {
        if (err) console.log(err);
    })
})

router.get('/note/:id', (req, res) => {
    const beerId = req.params.id;
    const entityId = req.user._id;
        User.findById(entityId, function(err, user) {
            if (err) console.log(err);
                res.status(200).json({
                    note: user.data[beerId]
                })
    // res.status(200).json({
    //   note: user.data[beerId]
    // })
        })
});

router.delete('/deleteNotes', (req, res) => {
    const beerId = req.params.id;
    const entityId = req.user._id;
    const note = req.body[0];
    User.findByIdAndUpdate(entityId,
        { $set: { data: {} }}, function (err, user) {
      if (err) return handleError(err);
      console.log('delete notes ran');
    });
    // res.status(200).json({
    //     note: 'Add your notes here.'
    // })
})

    // User.remove({ beerId : note}, function(err, user) {
    //     if (err) console.log(err);
    //     console.log(user);
    // })


// router.put('/stars/:id', function(req, res) {
//   const beerId = req.params.id;
//   const entityId = req.user._id;
//   const string = `rating.${beerId}`;
//   User.findByIdAndUpdate(entityId, {$set: {[string]: Object.keys(req.body)}}, function(err, user) {
//         if (err) console.log(err);
//     })
// })
//
// router.get('/stars/:id', function(req, res) {
//     const beerId = req.params.id;
//     User.findOne({'email': req.user.email}, function(err, user) {
//       if (err) console.log(err);
//       res.status(200).json({
//         rating: parseInt(user.rating[beerId])
//       })
//     })
// })




module.exports = router;
