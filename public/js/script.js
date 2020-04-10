

const video = document.getElementById('video')

Promise.all([
  console.log(faceapi.nets),
 
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')



]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  //đưa cái dữ liệu đó thay cho cái label này
  const labels = ['Nguyễn Đức Đề','Nguyễn Đức Bảo Lâm']
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)



   ////////////////////////////////////////////
   

const labeledFaceDescriptors = await Promise.all(
  labels.map(async label => {
    // fetch image data from urls and convert blob to HTMLImage element
    //lấy cái dữ liệu ảnh thay thế co cái label ở đây nữa 
    const imgUrl = `imagesinhvien/${label}.jpg`
    const img = await faceapi.fetchImage(imgUrl)
    
    // detect the face with the highest score in the image and compute it's landmarks and face descriptor
    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    
    if (!fullFaceDescription) {
      throw new Error(`no faces detected for ${label}`)
    }
    
    const faceDescriptors = [fullFaceDescription.descriptor]
    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
  })
)
//////////////////////////////////////////////////////////////////
const maxDescriptorDistance = 0.6
const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

const results = detections.map(fd => faceMatcher.findBestMatch(fd.descriptor))
  ////////////////////////////////////////////////////
  
results.forEach((bestMatch, i) => {
  const box = detections[i].detection.box
  const text = bestMatch.toString()
  const drawBox = new faceapi.draw.DrawBox(box, { label: text })
  faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
  drawBox.draw(canvas)
}) 

  }, 1000)
})
//logic
//Cải thiện tốc độ bằng cách nào
//Khi đã nhận diện được khuôn mặt của người đó rùi thì hk cần nhận diện lại