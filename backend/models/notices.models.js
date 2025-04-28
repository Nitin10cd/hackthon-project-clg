import mongoose from "mongoose";


const NoticeSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true ,
        trim : true 
    },
    description : {
        type : String ,
        required : true ,
        trim : true 

    },
    author : {
        type : String ,
        required : true ,
        trim : true 
    },
    attachments : [
        {
            type : String
        }
    ],
    targetAudience : {
        type : [String] ,
        default : ['All']
    },

} , {timestamps : true })

const NoticesModel = mongoose.model("Notices" , NoticeSchema);
export default NoticesModel ;