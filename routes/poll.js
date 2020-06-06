const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '1014101',
    key: '4d663d463bfd69bb5f70',
    secret: '5cadee502af2ea3ce346',
    cluster: 'us2',
    encrypted: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true, votes: votes}))
});

router.post('/', (req, res) => {
    const newVote = {
        pl: req.body.pl,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('pl-poll', 'pl-vote', {
            points: parseInt(vote.points),
            pl: vote.pl
        });
    
        return res.json({success: true, message: 'Thank you for voting'})
    })
});

module.exports = router;
