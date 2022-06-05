
socket.emit('isOnline', id)

socket.on('onlineFriends', friends => {

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
