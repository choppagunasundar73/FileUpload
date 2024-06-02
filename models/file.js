const mongoose = require("mongoose");
const nodemailer = require("nodemailer")


const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  tags: {
    type: String
  },
  email: {
    type: String
  }
});

//post middleware

fileSchema.post("save",async function(doc){
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        let info = await transporter.sendMail({
            from : `File Upload proj`,
            to : doc.email,
            subject : "New File uploaded on Cloudinary",
            html :`<h2>Hello!!</h2> <p>View Here :</p> <a href="${doc.imageUrl}">THIS IMAGE</a>`,
        })
    }catch(error)
    {

    }
})

module.exports = mongoose.model("File", fileSchema);
