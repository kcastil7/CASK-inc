const router = require('express').Router();
const { Appointments } = require('../../models/');

router.post('/', (req, res) => {
    //expect obj {profile_pic, name, address1, address2, city, state, zipcode, is_client, email, password}
    console.log("trying to create");
    Appointments.create({
        //get data from bodyy and assigning to to attributes
        client_id: req.body.client_id,
        handyman_id: req.body.handyman_id,
        date: req.body.date
    })
        .then(dbAppointmentsData => {
            res.json(dbAppointmentsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/', (req, res) => {
    console.log("trying to get");
    Appointments.findAll({
    })
        .then(dbAppointmentsData => res.json(dbAppointmentsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;