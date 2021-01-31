const user=JSON.parse(document.getElementById("user").textContent)
const second_user=JSON.parse(document.getElementById("second-user").textContent)

const video1=document.getElementById("video1")
const video2=document.getElementById("video2")

const microphone=document.getElementById("microphone")
const camera=document.getElementById("camera")

var isMicOpen=true
var isCamOpen=true


var side=window.location.search.substr(1).split("=")[1]


const peer = new Peer(user,{host:"localhost",port:9000,path:'/'})



navigator.mediaDevices.getUserMedia({audio:true,video:true})
    .then(function (stream){
        video1.srcObject=stream
        video1.play()
        video1.muted=true


        if(side==="caller"){
            var call=peer.call(second_user,stream)
            call.on('stream',function (remoteStream) {
                video2.srcObject=remoteStream
                video2.play()
            })

        }else{
            peer.on('call',function (call) {

                call.answer(stream)
                call.on('stream',function (remoteStream) {
                    video2.srcObject=remoteStream
                    video2.play()
                })


            })


        }

        camera.addEventListener('click',evt => {
            if(isCamOpen){
                stream.getVideoTracks()[0].enabled=false
                isCamOpen=false
                camera.className="btn btn-danger"


            }else{
                stream.getVideoTracks()[0].enabled=true
                isCamOpen=true
                camera.className="btn btn-info"
            }
        })


         microphone.addEventListener('click',evt => {
            if(isMicOpen){
                stream.getAudioTracks()[0].enabled=false
                isMicOpen=false
                microphone.className="btn btn-danger"


            }else{
                stream.getAudioTracks()[0].enabled=true
                isMicOpen=true
                microphone.className="btn btn-info"
            }
        })




    })
