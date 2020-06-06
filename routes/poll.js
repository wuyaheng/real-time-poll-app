const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '1014101',
    key: '4d663d463bfd69bb5f70',
    secret: '5cadee502af2ea3ce346',
    cluster: 'us2',
    encrypted: true
  });

router.get('/', (req, res) => {
    res.send('poll');
});

router.post('/', (req, res) => {
    pusher.trigger('pl-poll', 'pl-vote', {
        points: 1,
        pl: req.body.pl
    });

    return res.json({success: true, message: 'Thank you for voting'})
});

module.exports = router;
