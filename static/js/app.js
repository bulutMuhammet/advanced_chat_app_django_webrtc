const roomName=JSON.parse(document.getElementById("room-name").textContent)
const user=JSON.parse(document.getElementById("user").textContent)
const conversation=document.getElementById("conversation")

const sendButton=document.getElementById("send")
const inputField=document.getElementById("comment")

const chatSocket=new WebSocket("ws://"+window.location.host+"/ws/chat/"+roomName+"/")

document.getElementById("hiddeninput").addEventListener('change',handleFileSelect,false)

var isRecord=false

function handleFileSelect(event){
    var file=document.getElementById("hiddeninput").files[0];
    getBase64(file,file.type)
}
function getBase64(file,fileType){
    var type=fileType.split("/")[0]
    var reader=new FileReader()
    reader.readAsDataURL(file)

    reader.onload=function (){
        chatSocket.send(JSON.stringify({
            "what_is_it":type,
            "message":reader.result
        }))
    }


}


conversation.scrollTop=conversation.scrollHeight


const startStop=document.getElementById("record")

startStop.onclick=()=>{

    if(isRecord){
        stopRecord()
        startStop.style=""
        isRecord=false
    }else{
        startRecord()
        startStop.style="color:red"
        isRecord=true
    }

}

function startRecord(){
    navigator.mediaDevices.getUserMedia({audio:true})
        .then(stream=>{
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.start()
            dataArray=[]

            mediaRecorder.ondataavailable=function (e) {
                dataArray.push(e.data)
            }

            mediaRecorder.onstop=function (e) {
                audioData=new Blob(dataArray,{'type':'audio/mp3'})
                dataArray=[]
                getBase64(audioData,audioData.type)

                stream.getTracks().forEach(function (track) {
                    if(track.readyState=='live' && track.kind ==='audio'){
                        track.stop()
                    }
                })
            }


        })
}

function stopRecord() {
    mediaRecorder.stop()
}


















chatSocket.onmessage=function (e) {

    const data=JSON.parse(e.data)
    const message_type=data.what_is_it

    if (message_type==="text"){
        var message=data.message
    }else if(message_type==="image"){
        var message=`<img width="250" height="250" src="${data.message}">`
    }else if(message_type==="audio"){
        var message=`<audio style="width: 200px;" controls>
                      <source src="${data.message}">
                      
                    </audio>`
    }else if(message_type==="video"){
        var message=`<video width="250" height="250" controls>
                      <source src="${data.message}" >
                  
                    </video>`
    }


    if (user === data.user){
        var message=`<div class="row message-body">
          <div class="col-sm-12 message-main-sender">
            <div class="sender">
              <div class="message-text">
                ${message}
              </div>
              <span class="message-time pull-right">
                ${data.created_date}
              </span>
            </div>
          </div>
        </div>`
    }else{
        var message=`<div class="row message-body">
          <div class="col-sm-12 message-main-receiver">
            <div class="receiver">
              <div class="message-text">
                
                ${message}
              </div>
              <span class="message-time pull-right">
                ${data.created_date}
              </span>
            </div>
          </div>
        </div>`
    }




    conversation.innerHTML+=message
    conversation.scrollTop=conversation.scrollHeight

};

chatSocket.onclose=function (e) {
    console.error("Socket beklenmedik şekilde kapandı")

}

inputField.focus()
inputField.onkeyup=function (e) {
    if(e.keyCode===13){
        sendButton.click()
    }
}

sendButton.onclick=function (e) {
    const message=inputField.value
    chatSocket.send(JSON.stringify({
        "what_is_it":"text",
        "message":message
    }))
    inputField.value=''
}


