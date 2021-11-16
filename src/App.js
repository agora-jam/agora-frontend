import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Web3Storage, getFilesFromPath } from 'web3.storage/dist/bundle.esm.min.js';
import { useState } from 'react';
var Readable = require('stream').Readable

//model: https://github.com/livepeer/livepeer-jwplayer-demo/blob/main/pages/api/stream/index.ts

function App() {

  const [videoURL, setVideoURL] = useState('');





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


    const Retreieve = () => {
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




  //create new LivePeer stream. need streamKey, playbackId in response. 

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



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FileSelection />
        <Retreieve />
        <button onClick={postStream}> POST STREAM (Creates New) </button>    
      </header>
    </div>
  );
}

export default App;
