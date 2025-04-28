import EventModel from "../models/events.models.js";

export const EventCreation = async (req, res) => {
    try {
        const { eventData } = req.body;
        const { title, date, time, location, description, image, category, organizer , generateImage , generatedDescription  } = eventData;
        if (!title || !date || !time || !location  || !category || !organizer) {
            return res.status(409).json({
                success: false,
                message: "please fill all credentials"
            })
        };

        const existingevent = await EventModel.findOne({ title });
        if (existingevent) {
            return res.status(409).json({
                success: false,
                message: "event already exists"
            })
        }

        const newEvent = await EventModel.create({
            title,
            description : description || generatedDescription ,
            organizer,
            category,
            date,
            time,
            location,
            imageUrl: image || generateImage
        });

        return res.status(201).json({
            success: true,
            message: "new event created",
            newEvent
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const FetchEvents = async (req, res) => {
    try {
        const events = await EventModel.find(); // Renamed to 'events' instead of 'res'
        if (!events || events.length === 0) { // Check if no events were fetched
            return res.status(409).json({
                success: false,
                message: "No events exist"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events: events // Updated to 'events'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const EventDetails = async(req , res)=>{
    try{
      const {_id } = req.body ;
      const fetchEvent = await EventModel.findById(_id);
      if(!fetchEvent){
        return res.status(409).json({
            success : false ,
            message : "event not found"
        })
      };

      return res.status(201).json({
        success : true ,
        message : "event fetches successfully" ,
        event : fetchEvent
      })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const EventPoll = async(req , res)=>{
    try{
     const { userid , eventid } = req.body ;
     if(!eventid || !userid){
        return res.status(409).json({
            success : false ,
            message : "credentials not found"
        })
     };
     const event = await EventModel.findById({_id : eventid});
     if(event.polls.includes(userid)){
        return res.status(409).json({
            success : false ,
            message : "you poll is already submitted"
        })
     };

     const updatevent = await  EventModel.findByIdAndUpdate({_id : eventid } , { $push : {polls : userid}});
    //  const eventupdate = await EventModel.findByIdAndUpdate({_id : eventid} , {$push : {polls : userid}} , {new : true }) ;

     return res.status(201).json({
        success : true ,
        message : "event updated" ,
        event : updatevent
     })
    }
    catch(error){
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}