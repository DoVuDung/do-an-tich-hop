

 //set up camera
exports.init = async () => {
  console.log('init...')
  await setupCamera()
  console.log('set up camera success')
  console.log('setup done')
  initNotifications({ cooldown: 3000 })

}

exports.setupCamera = () => {
  return new Promise((resolve, reject) => {
    //xin quyen truy cap vao camera
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        //day luong stream vao video 
        stream => {
          video.current.srcObject = stream
          video.current.addEventListener('getStream', resolve)
        },
        error => reject(error)
      )
    } else {
      reject()
    }
  })
}