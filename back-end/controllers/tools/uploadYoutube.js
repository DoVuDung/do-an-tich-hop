const { google } = require('googleapis');
const service = google.youtube('v3');
const fs = require('fs');

const uploadVideo = (auth, cb) => {
    service.videos.insert(
        {
            auth: auth,
            part: 'snippet,contentDetails,status',
            resource: {
                // Video title and description
                snippet: {
                    title: 'My title',
                    description: 'My description'
                },
                // I set to private for tests
                status: {
                    privacyStatus: 'private'
                }
            },

            // Create the readable stream to upload the video
            media: {
                body: fs.createReadStream('video.flv') // Change here to your real video
            }
        },
        (error, data) => {
            if (error) {
                return cb(error);
            }
            console.log('https://www.youtube.com/watch?v=' + data.data.id);
            return cb(null, data.data.id);
        }
    );
};


module.exports = { uploadVideo };