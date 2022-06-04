

const addBtn = document.getElementById('addBtn')

const myId = document.getElementById('myId').value
const myName = document.getElementById('myName').value
const myImage = document.getElementById('myImage').value
const friendID = document.getElementById('friendID').value
const friendName = document.getElementById('friendName').value
const friendImage = document.getElementById('friendImage').value

addBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit('sendFriendRequest', {
        myId,
        myName,
        myImage,
        friendID,
        friendName,
        friendImage
    });
}

socket.on('requestSent', () => {

    addBtn.remove();
    canelBtn = document.getElementById('friend-form').innerHTML += ` <input id="cancelBtn" class="btn btn-danger" type="submit" value="Cancel Request"
formaction="/friend/cancel">
`
    canelBtn.add();
})