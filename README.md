File Uploader App - Backend Implementation
Overview
This repository contains the backend implementation for a File Uploader app. The app is built using Express and includes functionalities for uploading images and videos, compressing images, and sending email notifications to users upon successful upload. The project uses several technologies and libraries to provide a robust and scalable solution.

Features
Image and Video Upload: Users can upload image and video files.
Image Compression: Uploaded images are resized to reduce file size before storage.
Email Notifications: Users receive an email notification for every successful upload.
Cloud Storage: Files are stored on Cloudinary for easy access and management.
Technologies Used
Express: Web framework for Node.js.
Nodemon: Utility to automatically restart the server during development.
Nodemailer: Module for sending emails from Node.js.
Mongoose: MongoDB object modeling tool.
Express File Upload: Middleware for handling file uploads.
Cloudinary: Cloud storage service for managing media.
dotenv: Module to load environment variables from a .env file.
Postman: API testing tool.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/file-uploader-app.git
cd file-uploader-app
Install dependencies:

bash
Copy code
npm install
Setup environment variables:
Create a .env file in the root directory and add your configuration:

plaintext
Copy code
PORT=3000
MONGODB_URL=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAIL_HOST=your_mail_host
MAIL_USER=your_email_user
MAIL_PASS=your_email_pass
Run the application:

bash
Copy code
npm start
API Endpoints
Upload Image
Endpoint: /api/v1/upload/imageUpload
Method: POST
Description: Upload an image file.
Body:
imageFile (file): The image file to upload.
name (string): Name of the file.
tags (string): Tags associated with the file.
email (string): User's email address.
Response:
200 OK: Image uploaded and email sent successfully.
400 Bad Request: Invalid file type or file size exceeds limit.
500 Internal Server Error: An error occurred during the upload.
Upload Video
Endpoint: /api/v1/upload/videoUpload
Method: POST
Description: Upload a video file.
Body:
videoFile (file): The video file to upload.
name (string): Name of the file.
tags (string): Tags associated with the file.
email (string): User's email address.
Response:
200 OK: Video uploaded and email sent successfully.
400 Bad Request: Invalid file type or file size exceeds limit.
500 Internal Server Error: An error occurred during the upload.
Reduce Image Size
Endpoint: /api/v1/upload/imageReducerUpload
Method: POST
Description: Upload and compress an image file.
Body:
imageFile (file): The image file to upload and compress.
name (string): Name of the file.
tags (string): Tags associated with the file.
email (string): User's email address.
Response:
200 OK: Image compressed, uploaded, and email sent successfully.
400 Bad Request: Invalid file type or file size exceeds limit.
500 Internal Server Error: An error occurred during the upload.
Usage
Development: The application uses Nodemon for automatic server restarts. Run npm run dev for development mode.
Testing: Use Postman to test the API endpoints.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License.

Author: Your Name

Feel free to reach out with any questions or suggestions!
