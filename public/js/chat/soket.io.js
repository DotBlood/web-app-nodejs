const socet = io(),
    message = document.querySelector('.message'),
    form = document.querySelector('.form'),
    input = document.querySelector('.input')





form.addEventListener('submit', (e) => {
    e.preventDefault()

    const value = input.value.trim()

    if (!value) {
        console.log('error')
    } else {

        socet.emit('chatmessage', { msg: input.value })
    }
    input.value = ''
})


socet.on('chatmessage', (data) => {
    const item = document.createElement('li')
    item.innerHTML = `${data.msg}`
    message.appendChild(item)

    window.scrollTo(0, document.body.scrollHeight)

})