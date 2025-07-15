import { Router } from 'express';

const infoRouter = Router();

infoRouter.get('/', (_req, res) => {
    res.json({
        hotelName: "Hotel Miranda",
        availableEndpoints: 
        [
            { path: "/api/rooms", methods: [ "GET", "UPDATE", "POST", "DELETE" ] },
            { path: "/api/bookings", methods: [ "GET", "UPDATE", "POST", "DELETE" ] },
            { path: "/api/employees", methods: [ "GET", "UPDATE", "POST", "DELETE" ] },
            { path: "/api/guests", methods: [ "GET", "UPDATE", "POST", "DELETE" ] }
        ]
    });
});

export default infoRouter;