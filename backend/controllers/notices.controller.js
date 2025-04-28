import NoticesModel from "../models/notices.models.js";

export const NoticeCreation = async(req , res)=>{
    try{
        const{notices} = req.body;
        console.log(notices)
       const {title , description , author , attachments , targetAudience} = notices ;
       console.log(title , description)
       if(!title || !description || !author){
        return res.status(409).json({
            success : false ,
            message : "Provide all credentials"
        })
       };

       const existingNotice = await NoticesModel.findOne({title});
       if(existingNotice){
        return res.status(409).json({
            success : false ,
            message : "notice already exists"
        })
       };

       const newNotice = await NoticesModel.create({
        title : title ,
        description : description ,
        author : author ,
        // attachments  : attachments ? attachments : [] ,
        targetAudience : targetAudience
       });

       return res.status(201).json({
        success : true ,
        message : "notice created successfully" ,
    
       })
    }
    catch(error){
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}


export const FetchNotices = async(req , res)=>{
    try{
      const notices = await NoticesModel.find();
      if(!notices){
        return res.status(409).json({
            success : false ,
            message : "Notices not found"
        })
      };

      return res.status(201).json({
        success : true ,
        message : "notices fetches successfully" ,
        notices
      })
    }
    catch(error){
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}


export const DeleteNotice = async(req , res)=>{
    try{
      const {_id} = req.body ;
      const notice = await NoticesModel.findByIdAndDelete(_id);
      if(!notice){
        return res.status(409).json({
            success : false ,
            message : "notice not found."
        })
      }


      return res.status(201).json({
         success : true ,
         message : "notice deleted successfully" ,
         notice
      })
      
    }
    catch(error){
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}