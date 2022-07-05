
let sended = 0

const post = (content) => {
    fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(content)
    }).then(res => {
        sended += 1
    });
}

// All numbers clickable
let imgs = document.querySelectorAll('.antibotlinks')
for (let img of imgs) {
    let data = img.querySelector('img').src.slice(22)
    let content = {name: "responses", imgData: data};
    post(content)
}

setTimeout(() => {
    let data = document.querySelector('form').querySelector('img').src.slice(22)
    let content = {name: 'questions', imgData: data}
    post(content)
}, 2000)

setInterval(() => {
    if (sended == 4) {
        location.reload()
    }
}, 4000)
