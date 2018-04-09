export const getFileURL = (file, progressBar) => {
  return new Promise((resolve, reject) => {
    if (file.size < 0) reject()

    const reader = new FileReader()
    reader.onload = function (event) {
      resolve(event.target.result)
    }
    reader.onprogress = function(data) {
      if (data.lengthComputable && progressBar) {
        const progress = parseInt( ((data.loaded / data.total) * 100), 10 )
        console.log(progress)
        progressBar.style.width = `${progress}%`
      }
    }
    reader.readAsDataURL(file)
  })
}

export const kilobyteToMegabyte = (kilobyte, round = 4) => {
  return ((kilobyte/1024)/1024).toFixed(round)
}
