const chatId = document.getElementById('chatId').value
const sendBtn = document.getElementById('sendBtn')
const message = document.getElementById('message')
const messageContent = document.getElementById('messageContainer')
const messagespan = document.getElementById('message-span')

socket.on('connect', () => {

    socket.emit('joinChat', chatId)


})

sendBtn.onclick = () => {
    let msg = message.value
    socket.emit('sendMsg', {
        chat: chatId,
        content: msg,
        sender: id
    }, () => {
        message.value = ''


    }
    )
}
socket.on('messageContent', (content, sender) => {

    console.log(content)
    messageContent.innerHTML += content

})


