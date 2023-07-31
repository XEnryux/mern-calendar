const express = require('express');
const Evento = require('./models/events-model')



const getEvents = async (req, res = express.response) => {

    const events = await Evento.find().populate('user', 'name');




    res.json({
        ok: true,
        events
    })

}

const createEvent = async (req, res = express.response) => {

    const event = new Evento(req.body);


    try {

        event.user = req.uid

        const eventDB = await event.save()

        res.json({
            ok: true,
            evento: eventDB

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "hable con el admin"
        })
    }



}

const refreshEvent = async(req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {

const event = await Evento.findById(eventId);

if(!event){
   return res.status(404).json({
        ok: false,
        msg: "el evento no existe "
    });
}

if(event.user.toString() !== uid){
return  res.status(401).json({
    ok: false,
    msg: "no esta autorizado para editar "
});

}

const newEvent ={
    ...req.body,
    user:uid
}

const eventUpdated = await Evento.findByIdAndUpdate(eventId,newEvent, { new: true } );

res.json({
    ok: true,
    event: eventUpdated
});


      

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con el admin"
        })

    }
}

const deleteEvent = async(req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {

const event = await Evento.findById(eventId);

if(!event){
   return res.status(404).json({
        ok: false,
        msg: "el evento no existe "
    });
}

if(event.user.toString() !== uid){
return  res.status(401).json({
    ok: false,
    msg: "no esta autorizado para editar "
});

}

await Evento.findByIdAndDelete(eventId );

res.json({
    ok: true,
    msg: "evento borrado"
});


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "hable con el admin"
        })

    }
}




module.exports = {
    getEvents,
    createEvent,
    refreshEvent,
    deleteEvent
}