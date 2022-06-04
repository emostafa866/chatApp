
const socket = io();

let id = document.getElementById('myId').value;

const btn = document.getElementById('dropdownMenuButton');

socket.on('connect', () => {

    socket.emit('notificationRoom', id)

    socket.emit('isOnline', id)
})

socket.on('onlineFriends', friends => {
    // console.log(friends)

    let div = document.getElementById('onlineFriends')

    if (friends.length === 0) {
        div.innerHTML = `
        <p class="alert alert-danger">
        No Online Friends
        </p>
        `
    } else {
        let html = `
              <div class='row'>
        `
        for (let friend of friends) {

            html += `
                <div class= " card" style="width:18rem;">
                <img class="card-img-top" src = "/${friend.image}">
                <div class="card-body">
                <h3 "card-title">
                <a href="/profile/${friend.id}"> ${friend.name} </a>
                </h3>
                <a type="button" class="btn btn-secondary" href="/chat/${friend.chatId}"> Chat </a>
                </div>
                </div>
            
            `
        }
        html += ` </div> `
        div.innerHTML = html

    }
})






/* friend request term  */

socket.on('newFriendRequest', data => {
    let friendRequestList = document.getElementById('friendRequestList')
    friendRequestList.innerHTML += `
    <a class="dropdown-item" href="/profile/${data.id}">
    ${data.name}
</a>
    `

    btn.classList.remove('btn-primary')
    btn.classList.add('btn-danger');
    console.log(data)
})

document.getElementById('dropdownMenuButton').onclick = () => {
    btn.classList.remove('btn-danger')
    btn.classList.add('btn-primary');
}