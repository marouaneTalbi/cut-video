import { Timeline, TimelineEffect, TimelineRow } from '@xzdarcy/react-timeline-editor';
import './App.css';
import myVideo from './videos/vi.mp4';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';


function App() {
  const [start, setStart] = useState();
  const [urk, seturk] = useState();
  const [duration, setDuration] = useState();
  const [video, setVideo] = useState({
    src: myVideo,
    start: 0,
    end: duration != undefined ? duration : 10,
    currentTime: 0,
    duration: duration,
    type: 'video/mp4'
  });

  const videoRef = React.useRef(null);

  const mockData = [
    {
      id: '0',
      actions: [
        {
          id: 'action00',
          start: video.start,
          end: video.end,
          effectId: 'effect0',
          src: video.src,
          type: video.type
        }
      ]
    }
  ];
  const mockEffect = {
    effect0: {
      id: 'effect0',
      name: '00'
    }
  };

  // const ffmpeg = FFmpeg.createWorker();
  

  useEffect(() => {
    setStart(`${video.src}#t=${video.start},${video.end}`)
  }, [video])


  const handleEditorDataChange = (editorData) => {
    const newVideo = { ...video };
    newVideo.start = editorData[0].actions[0].start;
    newVideo.end = editorData[0].actions[0].end;
    newVideo.currentTime = newVideo.start;
    newVideo.duration = newVideo.end - newVideo.start;
    setVideo(newVideo);
    setStart(`${newVideo.src}#t=${newVideo.start},${newVideo.end}`);
    seturk(`${newVideo.src}#t=${newVideo.start},${newVideo.end}`);
    
  };

  const copier = async () => {

    console.log(videoRef.current.props)
 
  }

  useEffect(() => {
    if(duration) {
      setVideo(prevVideo => ({ 
        ...prevVideo, 
        end: prevVideo.start + duration,
        duration: duration 
      }))
    }
  }, [duration])

  const onDuration = (duration) => {
    setDuration(duration)
  }

  return (
    <div className="App">
      <header className="App-header">
        <ReactPlayer
          key={`${video.src}-${video.start}-${video.end}`}
          url={start}
          controls
          onDuration={onDuration}
          ref={videoRef}
        />
        <Timeline
          style={{ height: '100px', width: '60%' }}
          editorData={mockData}
          effects={mockEffect}
          handleEditorDataChange={(e) => console.log(e)}
          onChange={handleEditorDataChange}
          rowHeight={40}
          scaleWidth={40}
          scale={10}
        />
        {/* {
          false && 
            <video ref={videoRef} controls>
              <source src={urk} type="video/mp4" />
            </video>
        } */}

        <button onClick={copier} >copier</button>
      </header>
    </div>
  );
}

export default App;
