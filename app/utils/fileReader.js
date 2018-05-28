export const getFileURL = (file, progressBar) => {
  return new Promise((resolve, reject) => {
    if (file.size < 0) reject()

    const reader = new FileReader()
    reader.onload = function(event) {
      resolve(event.target.result)
    }
    reader.onprogress = function(data) {
      if (data.lengthComputable && progressBar) {
        const progress = parseInt(data.loaded / data.total * 100, 10)
        console.log(progress)
        progressBar.style.width = `${progress}%`
      }
    }
    reader.readAsDataURL(file)
  })
}

export const kilobyteToMegabyte = (kilobyte, round = 4) => {
  return (kilobyte / 1024 / 1024).toFixed(round)
}

export const getVideoURL = givenURL => {
  // API list: https://developers.google.com/youtube/player_parameters
  if (!givenURL) return ''

  const videoUrl = givenURL
  let videoId = ''
  let url = ''

  // Youtube
  if (videoUrl.indexOf('youtube.com/watch?v=') > -1) {
    videoId = givenURL.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')

    // If video query exists
    if (ampersandPosition !== -1) videoId = videoId.substring(0, ampersandPosition)

    url = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=2&showinfo=0&autohide=1&modestbranding=1`

    // Youtube
  } else if (videoUrl.indexOf('youtu.be/') > -1) {
    videoId = givenURL.split('.be/')[1]
    url = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&controls=2&showinfo=0&autohide=1&modestbranding=1`

    // Vimeo
  } else if (videoUrl.indexOf('vimeo.com') > -1) {
    videoId = givenURL.split('.com/')[1]
    url = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`
  } else {
    url = ''
  }
  return url
}
