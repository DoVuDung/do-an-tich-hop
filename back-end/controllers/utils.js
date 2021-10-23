const { validationError, unlinkPath } = require('../util/helper');
const { getFileStream, uploadFile } = require('../util/s3');

exports.getFileFromStorage = (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const fileKey = req.params.key;

  //show file instead of download
  res.setHeader(
    'Content-Disposition',
    'inline'
    //'attachment; filename="' + //download instantly
  );

  try {
    //download image from s3 and return to client
    const readStream = getFileStream(fileKey);

    //error handling
    readStream.on('error', (error) => {
      res.status(404).json({
        message: 'Fail to get file from storage!',
        error,
        success: false,
      });
    });

    readStream.pipe(res);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.postFileToStorage = async (req, res, next) => {
  const file = req.file;

  try {
    if (!file) {
      const error = new Error('Please upload a file');
      error.statusCode = 400;

      throw error;
    }

    //upload new image file
    const uploadS3Result = await uploadFile(file);
    console.log(uploadS3Result);

    await unlinkPath(file.path);

    return res.status(200).json(uploadS3Result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
