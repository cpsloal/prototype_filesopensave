<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Electron File Open/Save Prototype
        </span>
        <router-link to="/file-save">Go to the Save Dialog Prototype</router-link>
        <router-link to="/">Go to back to the landing page</router-link>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Use this page to do file open operation</div>
          <p>
            This is where we open a file and display it.
          </p>
          <button @click="open()">Open File</button>
        </div>
        <br>
        <br>
        <div class="filecontent">
          <pre><b>{{ fileName }}</b></pre>
          <pre>{{ fileContent }}</pre>
        </div>        
      </div>
    </main>
  </div>
</template>

<script>
  const {dialog} = require('electron').remote
  const fs = require('fs')

  function openSelectedFile (fileLocation, self) {
    fs.readFile(fileLocation, 'utf-8', (err, data) => {
      if (err) {
        alert('An error ocurred reading the file :' + err.message)
        return
      }

      // Change how to handle the file content
      // console.log('The file content is : ' + data)
      self.fileContent = data
    })
  }

  export default {
    name: 'file-open-page',
    data () {
      return {
        fileContent: 'This is where the file contents will be displayed!',
        fileName: 'No files selected'
      }
    },
    methods: {
      open () {
        dialog.showOpenDialog({properties: ['openFile'],
          filters: [
            {name: 'Structile', extensions: ['txt']}
          ]}, fileNames => {
          if (fileNames === undefined) {
            console.log('No file selected')
            return
          }

          this.fileName = fileNames[0]
          openSelectedFile(fileNames[0], this)
        })
      }
    }
  }
</script>

<style>
  .filecontent {
      background-color: azure;
  }

  pre {
    white-space: pre-wrap;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
