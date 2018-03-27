<template>
  <section>
    <form @submit.prevent="onEditButton" class="form-container">

      <div class="header-container">
        <h1 class="title">Documents</h1>
      </div>

      <div class="brochure-container each-section">
        <h2 class="title">Company Brochure</h2>

        <div class="dropzone-container" id="dropzone-wrapper">
          <div class="dropzone-wrapper">
            <span>Drag and drop you certifications here.</span>
            <div id="list">

            </div>
          </div>
        </div>

      </div>

      <div class="bisiness-registration-container each-section">
        <h2 class="title">Business Registration</h2>
        <img
          :src="url"
          alt=""
        >
        <div id="progress-bar"></div>
        <label for="certification-input">Select File</label>
        <input
          id="certification-input"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          @change="onImageChanged"
        >
      </div>

      <div class="certification-container each-section">
        <h2 class="title">Certifications</h2>
        <img
          id="image"
          :src="account.cover_image_url_1"
          alt="image">
      </div>

    </form>
  </section>
</template>

<script>
  import { getFileURL } from '~/utils/fileReader'
  export default {
    head () {
      return {
        title: 'Upload Documents',
        link: [
          { hid: 'canonical', rel: 'canonical', href: `https://www.factoryhunt.com/dashboard/company/documents` }
          // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.3.3/cropper.min.css' },
        ],
        script: [
          // { src: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.3.3/cropper.min.js'}
        ]
      }
    },
    props: {
      account: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        url: ''
      }
    },
    methods: {
      onEditButton () {
        console.log('Edited!')
      },
      async onImageChanged (event) {
        console.log('file changed')
        const progressBar = document.getElementById('progress-bar')
        const file = await getFileURL(event.target.files[0], progressBar)
        console.log(file)
        this.url = file
        console.log('file done')
      },
      initDropzone () {
        const filedrag = document.getElementById('dropzone-wrapper')
        // file drop
        filedrag.addEventListener("dragover", this.fileDragHover, false)
        // filedrag.addEventListener("dragleave", FileDragHover, false)
        filedrag.addEventListener("drop", this.fileSelectHandler, false)
      },
      fileDragHover (e) {
        e.stopPropagation()
        e.preventDefault()
        e.target.className = (e.type === "dragover" ? "dropzone-container hover" : "dropzone-container")
      },
      fileSelectHandler (e) {
        this.fileDragHover(e)

        const files = e.target.files || e.dataTransfer.files

        console.log('te')
        // this.addFileFromLastInput(files)

        // process all File objects
        for (let i = 0, f; f = files[i]; i++) {
          this.parseFile(f)
        }
      },
      addFileFromLastInput(file){

        var a = $('input#fileselect.addFile');
        a[a.length-1].files = file;

        try{
          let new_input = '<input id="fileselect" type="file" name="fileselect" multiple="multiple" class="addFile" />';
          $('.files').append(new_input)
        }catch(err){

        }

        return 0;
      },
      parseFile (file) {
        const fileName = file.name,
          fileType = file.type,
          fileSize = file.size + 'bytes'

        this.output(
          "<tr><td>" + fileName +
          "</td><td>" + fileType +
          "</td><td>" + fileSize +
          "</td> </tr>"
        )
      },
      output (msg) {
        const m = document.getElementById('list')
        m.innerHTML = msg + m.innerHTML
      }
    },
    mounted () {
      this.initDropzone()
      // const image = document.getElementById('image')
      // const cropper = new Cropper(image, {
      //   aspectRatio: 1,
      //   crop: function(event) {
      //     console.log(event.detail.x)
      //     console.log(event.detail.y)
      //     console.log(event.detail.width)
      //     console.log(event.detail.height)
      //     console.log(event.detail.rotate)
      //     console.log(event.detail.scaleX)
      //     console.log(event.detail.scaleY)
      //   }
      // })
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/index";
  @import "~assets/css/less/dashboard/index.less";

  img {
    max-width:100%;
  }

  .dropzone-container {
    display: block;
    position: relative;
    width: 100%;
    min-height: 300px;
    background-color: @color-light-gray;

    .dropzone-wrapper {
      display: block;
      align-items: center;
      justify-content: center;
    }
  }

  #progress-bar {
    background-color: @color-orange;
    width: 0;
    height: 12px;
    transition: width .5s ease .3s;
    border-radius: 10px;
  }
</style>
