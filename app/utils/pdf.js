import pdflib from 'pdfjs-dist'

exports.renderPDF = (pdfURL) => {
  pdflib.PDFJS.getDocument(pdfURL).then((pdf) => {
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const canvas = document.createElement('canvas')
      canvas.id = 'catalog'
      document.getElementById('catalog-container').appendChild(canvas)
      pdf.getPage(i).then((page) => {
        this.renderPage(page, canvas)
      })
    }
  })
}

exports.renderPage = (page, canvas) => {
  const viewport = page.getViewport(1.5)
  const canvasContext = canvas.getContext('2d')
  const renderContext = {
    canvasContext,
    viewport
  }
  canvas.height = viewport.height
  canvas.width = viewport.width
  canvas.style.width = '100%'
  canvas.style.marginBottom = '-2px'
  page.render(renderContext)
}
