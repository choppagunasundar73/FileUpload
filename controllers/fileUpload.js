const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
// localFileUpload -> handler function
exports.localFileUpload = async (req, res) => {
  try {
    // Fetch file
    const file = req.files.file;
    console.log("FILE RECEIVED →> ", file);

    // Define the path to save the file
    let path = __dirname + "/files/" + Date.now() + "_" + file.name;

    // Move the file to the specified path
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'File upload failed',
        });
      }

      // Respond with success
      res.json({
        success: true,
        message: 'Local File Uploaded Successfully',
        filePath: path,
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during file upload',
    });
  }
};



/**
 * Checks if a file type is supported.
 * @param {string} type - The file type to check.
 * @param {Array} supportedTypes - An array of supported file types.
 * @returns {boolean} - True if the file type is supported, false otherwise.
 */
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}


/**
 * Uploads a file to Cloudinary.
 * @param {Object} file - The file to upload.
 * @param {string} folder - The folder in which to upload the file.
 * @returns {Promise<Object>} - A promise resolving to the Cloudinary upload response.
 */
async function uploadFileToCloudinary(file, folder,quality) {
    try {
        // Upload file to Cloudinary
        const options = { folder };
        options.resource_type = "auto";
        if(quality){
            options.quality = quality;
        }
        return await cloudinary.uploader.upload(file.tempFilePath, options);

    } catch (error) {
        // Handle any errors that occur during the upload process
        console.error("Error uploading file to Cloudinary:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

/**
 * Handles image upload.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

exports.imageUpload = async (req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;
        console.log(file);
        
        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ success: false, message: "Unsupported file type" });
        }

        const response = await uploadFileToCloudinary(file,"fileUpload",30)
       
        console.log(response)

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message : 'Image saved successfully'
        })
        
        res.json({ success: true, message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Internal server error" });
    }
};


/**
 * Handles video upload.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.videoUpload = async (req, res) => {
    try {
        // Data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > MAX_SIZE) {
            return res.status(400).json({ success: false, message: "File size exceeds the 5MB limit" });
        }
        // Validation
        const supportedTypes = ["mp4", "avi", "mov"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ success: false, message: "Unsupported file type" });
        }

        const response = await uploadFileToCloudinary(file, "videoUpload");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        });

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'Video saved successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};