<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Electron File Open/Save Prototype
        </span>
        <router-link to="/file-open">Go to the Open Dialog Prototype</router-link>
        <router-link to="/">Go to back to the landing page</router-link>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Use this page to do file save operation</div>
          <p>
            This is where we open a file and display it.
          </p>
          <button @click="save()">Save File</button>
        </div>
        <br>
        <br>

        <div>
          <h3 class="title alt">File will contain data from the following form:</h3>
            <form id="demo">
              <input type="hidden" name="templateId" value="5afdf3f6-ffc4-11e7-ba89-0ed5f89f718b" v-model="templateId">
              <!-- text -->
              <p>Name: <input type="text" v-model="name"></p><br>
              <!-- checkbox -->
              <p>Checkbox 1: <input type="checkbox" v-model="checkbox1"></p><br>
              <!-- radio buttons -->
              <p>Choice 1: <br>
                One: <input type="radio" name="picked" value="one" v-model="choice1">
                Two: <input type="radio" name="picked" value="two" v-model="choice1">
              </p><br>
              <!-- select -->
              <p>
                Choice 2:
                <select v-model="choice2">
                  <option>one</option>
                  <option>two</option>
                </select>
              </p><br>
              <!-- multiple select -->
              <p>
                Multi-Choice 3:
                <select v-model="choice3" multiple>
                  <option>one</option>
                  <option>two</option>
                  <option>three</option>
                </select>
              </p><br>
              <p><pre>data: {{$data}}</pre></p>
            </form>
        </div>    
      </div>
    </main>
  </div>
</template>

<script>
  const {dialog} = require('electron').remote
  const fs = require('fs')

  function saveToFile (fileLocation, fileData, self) {
    fs.writeFile(fileLocation, fileData, 'utf-8', (err) => {
      if (err) {
        alert('An error ocurred reading the file :' + err.message)
        return
      }

      console.log('File saved!  Location: ' + fileLocation)
    })
  }

  export default {
    name: 'file-save-page',
    data () {
      return {
        templateId: '5afdf3f6-ffc4-11e7-ba89-0ed5f89f718b',
        name: '',
        checkbox1: null,
        choice1: null,
        choice2: null,
        choice3: [],
        author: 'Ali Satter'
      }
    },
    methods: {
      save () {
        dialog.showSaveDialog({filters: [
          {name: 'Structile', extensions: ['txt']}
        ]}, fileName => {
          if (fileName === undefined) {
            console.log('No file location selected')
            return
          }
          // Save the form content
          saveToFile(fileName, JSON.stringify(this.$data), this)
        })
      }
    }
  }
</script>

<style>
  .filecontent {
      background-color: azure;
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
