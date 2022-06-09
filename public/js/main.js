// const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(thumbText).forEach(element => {
    element.addEventListener('click', addLike)
})

async function addLike(){
    const mTitle = this.parentNode.childNodes[1].innerHTML
    const mGenre = this.parentNode.childNodes[3].innerHTML
    const mLikes = Number(this.parentNode.childNodes[5].innerHTML)

    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'mTitleS':mTitle,
                'mGenreS':mGenre,
                'mLikesS':mLikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


