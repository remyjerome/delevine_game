import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Button from '@material-ui/core/Button'

import data from './data'

let csv = [['name','image_1','image_2','image_3']]

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

class App extends Component {


  callApi(name) {
     let param1 = name.replace(' ','+')

      console.log(param1)
    axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDmUxRabugL1F_1phWIypbCm5dnDt1XOFk&cx=009040790381509708200:xe_tiv8xery&q=${param1}`)
        .then( (response) => {
            const items = response.data.items
            var i = 0
            let images = [name]

            items.map((item) => {
              if(item.pagemap.cse_image && item.pagemap.cse_image.length > 0 && i <3 ) {
                console.log(item.pagemap.cse_image[0].src)
                const image = item.pagemap.cse_image[0].src
                images.push(image)
                i = i+1
              }
            })
            console.log(images)

            csv.push(images)

            console.log(csv)

        })
        .catch(function (error) {
            console.log(error)
        })
  }

  generateCsv(csv) {
      let csvContent = "data:text/csv;charset=utf-8,"
      csv.forEach(function(rowArray){
          let row = rowArray.join(",")
          csvContent += row + "\r\n"
      })

      var encodedUri = encodeURI(csvContent)
      var link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "my_data.csv")
      document.body.appendChild(link)

      link.click()
  }

  render() {
    console.log(data)
    return (
      <div className="App">
          {
              data.map((name) => this.callApi(name))
          }
          <Button style={style} variant="contained" color="primary" onClick={() => this.generateCsv(csv)}>
              Download
          </Button>
      </div>
    )
  }
}

export default App
