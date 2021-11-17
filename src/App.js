import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { useState } from 'react';
var ffmpeg = require('ffmpeg');

//model: https://github.com/livepeer/livepeer-jwplayer-demo/blob/main/pages/api/stream/index.ts

function App() {

  const [videoURL, setVideoURL] = useState('');
  const [cid, setCID] = useState('');





function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2NTM5NDVkMjQ2NWJENjFmQTI4MTFCQ0VhNjI3NTVFMzg0NjFlRTMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzcwNzg2NzgwNDYsIm5hbWUiOiJBZ29yYUZpbG0ifQ.VMS1G4oYxPpI6JiBcPxn4588bLrIiByG2JbJdPMuxdQ"

  // In a real app, it's better to read an access token from an 
  // environement variable or other configuration that's kept outside of 
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}
function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}



//select file for upload, right now only allowing mp4s
const FileSelection = () => {

  const [files, setFiles] = useState('');
    console.log(typeof(files), "files");
    //***bug here with input --> Typeerror: e.stream is not a function
    async function storeFiles() {
      const client = makeStorageClient()
      const cid = await client.put(files)
      console.log('stored files with cid:', cid)
      return cid
      //this cid are the IDs for the retrieval function down below
    }
    return (
      <div>
        <div>

          <input 
          type="file"
          accept="video/mp4" 
          value={files}
          onChange={e => setFiles(e.target.value)}
          />

   
        </div>
        <button onClick={storeFiles}> UPLOAD TO IPFS</button>

      </div>
      )
    }

    //retrieve from web3.storage
    const Retrieve = () => {
      var cid = "bafybeihc27llnpaoxqbk4m653wqtxcp5b63hxpxtkvtpusmn3iznyad7ii";
      
      async function retrieve() {
        const client = makeStorageClient()
        const res = await client.get(cid)
        console.log(`Got a response! [${res.status}] ${res.statusText}`)
        console.log(res.url, "response object")
        setVideoURL(res.url)
        if (!res.ok) {
          throw new Error(`failed to get ${cid}`)
        }

        const files = await res.files()
        console.log(files, "res.files")
        for (const file of files) {
          console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
        }
        setCID(cid);
        // request succeeded! do something with the response object here...
      }
        return (
          <div>
            <div>   
             <button onClick={retrieve}>check console for retreival status</button>      
            </div>
    
          </div>
          )
        }




  //create new LivePeer stream. need streamKey, playbackId in response to get stream for recorded plays.

  async function postStream() {
    const postedVid = await axios({
      method : "post",
      url : 'https://livepeer.com/api/stream',
           
        headers: {
        'content-type' : 'application/json',
        authorization : 'Bearer 2182c2fc-34f8-4390-af4e-2972372c1246',
        },
    
      data: {
        "name": "test_stream_from_ether",
        "record" : true,
        "profiles": [
          {
            "name": "720p",
            "bitrate": 2000000,
            "fps": 30,
            "width": 1280,
            "height": 720
          },
          {
            "name": "480p",
            "bitrate": 1000000,
            "fps": 30,
            "width": 854,
            "height": 480
          },
          {
            "name": "360p",
            "bitrate": 500000,
            "fps": 30,
            "width": 640,
            "height": 360
          }
        ]
      }
    })
    .catch((response) => 
      console.log(JSON.stringify(response.data), 'postStream response')
    )
    
    
    console.log(postedVid, "Posted Video")
    return postedVid;
  }
  console.log(videoURL, "videoURL")
  //ipfs sample url : https://ipfs.io/ipfs/bafybeiaq6uauj3cglqn6z2oty6jndtvbxgj4m6re56qbak6n6x2ydgmzce?filename=parscale%27d%202.mp4
  //web3 url response: "https://api.web3.storage/car/bafybeihc27llnpaoxqbk4m653wqtxcp5b63hxpxtkvtpusmn3iznyad7ii"
  const FfmpegTest = () => {
    async function test() {
  try {
    var process = new ffmpeg("/Users/peter/Desktop/Frankenstein.mp4");
    console.log(process, "process")
    process.then(function (video) {
        // Video metadata
        console.log(video.metadata, "video.metadata");
        // FFmpeg configuration
        console.log(video.info_configuration, "video.info_configuration");
        video.setVideoFormat('rtmp')
    }, function (err) {
        console.log('Error: ' + err);
    });
} catch (e) {
    console.log(e);
    console.log(e.code);
    console.log(e.msg);
}
    }
 return (
    <button onClick={test}> FFMPEG TEST</button>
 )
  }

  //download video from ipfs. might be better to construct an ipfs url with {cid} than use web3.storage api retrieve
  const DownloadTest = () => {

    function downloadImage() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://ipfs.io/ipfs/bafybeiaq6uauj3cglqn6z2oty6jndtvbxgj4m6re56qbak6n6x2ydgmzce', true);
      xhr.responseType = 'blob';
      xhr.onload = function() {
        var urlCreator = window.URL || window.webkitURL;
        var src = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = src;
        tag.target = '_blank';
        tag.download = 'video/mp4';
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      };
      xhr.onerror = err => {
        alert('Failed to download picture');
      };
      xhr.send();
      console.log(xhr,"xhr")
    }
    
      return (
        <button onClick={downloadImage}> Download Video</button>
     )
    }
      
  
    
  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileSelection />
        <Retrieve />  
        <button onClick={postStream}> POST STREAM (Creates New) </button>   
        <FfmpegTest /> 
        <DownloadTest />
      </header>
    </div>
  );
}

export default App;
