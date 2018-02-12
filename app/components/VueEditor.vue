<template>
  <div>
    <div id="editor">
      {{html}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['html'],
    methods: {
      initQuill () {
        var editor = new Quill('#editor', {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['image'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              [{'header': [1, 2, 3, 4, false]}],
              [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
              ['clean']
            ]
          },
          placeholder: '',
          theme: 'snow'
        })
        editor.on('text-change', function(delta, oldDelta, source) {
          // console.log(document.querySelector(".ql-editor").innerHTML)
        })
        if (this.html) {
          editor.setContent(this.html)
        }
      }
    },
    mounted () {
      this.initQuill()
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/css/index';
  #editor {
    border-bottom-left-radius: @border-radius;
    border-bottom-right-radius: @border-radius;
    font-size: @font-size-medium;
    font-weight: @font-weight-medium;
    margin-bottom: 4px;
    height: 380px;
  }
</style>
