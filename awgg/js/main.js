import "../style.css"

const gamerecord = []

function reverse(word){
    let split = word.split("")
    let reversed = split.reverse()
    let rword = reversed.join("")
    let final = rword.toUpperCase()
    return final
}

async function genword(){
    try{
        let call = await fetch("https://random-word-api.herokuapp.com/word?length=5&lang=en");
        let word = await call.json();
        let ans = String(word[0])
        game(reverse(ans),ans)
    }
    catch{console.log("fix your code")}
}

function setstage(){
    document.querySelector("#app").innerHTML=""
    for(let i = 1; i < 7; i++){
        document.querySelector("#app").insertAdjacentHTML(
            "beforeend",
            `<div id="column${i}"></div>`)
        for(let j = 0; j < 5; j++){
            document.querySelector(`#column${i}`).insertAdjacentHTML(
                "afterbegin",
                `<div id="box"></div>`)
        }
    }
    document.querySelector("#app").insertAdjacentHTML(
        "beforeend",
        `<input type="text" id="input" placeholder="Type a word">`
    )
}

function game(answer,answered){
    let tries = 1
    setstage()
    document.querySelector("#input").addEventListener("keypress",(event)=>{
        if(event.key==="Enter"){
            let guess = reverse(document.querySelector("#input").value)
            if (guess.length === 5){
                document.querySelector(`#column${tries}`).innerHTML=""
                document.querySelector("#input").value=""
                if(guess===answer){
                    checkletter(guess,answer,tries)
                    status(answered, tries, "lost")
                }else if(tries===6){
                    checkletter(guess,answer,tries)
                    status(answered, tries, "lost")
                }else{checkletter(guess,answer,tries)}
                  tries++
            }else{}
            document.querySelector("#again").addEventListener("click", function(){genword()})
        }
    })
}

function checkletter(guess,answer,tries){
    for (let i = 0; i < answer.length; i++) {
        if(guess[i]===answer[i]){
            document.querySelector(`#column${tries}`).insertAdjacentHTML(
                "afterbegin",
                `<div id="boxyes">${guess[i]}</div>`)
        }else if(answer.includes(guess[i])===true){
            document.querySelector(`#column${tries}`).insertAdjacentHTML(
                "afterbegin",
                `<div id="boxmaybe">${guess[i]}</div>`)
        }else if(answer.includes(guess[i])===false){
            document.querySelector(`#column${tries}`).insertAdjacentHTML(
                "afterbegin",
                `<div id="boxno">${guess[i]}</div>`)
        }
    }
}

function status(answered, tries, status){
    document.querySelector("#input").remove()
    document.querySelector(`#app`).insertAdjacentHTML(
        "beforeend",
        `<p>you ${status} the word was ${answered}</p>
        <button id="again">play again</button>`)
        gamerecord.push(answered, tries, status)
        record()
}

function record(){
    const index=gamerecord.length
    const text=(gamerecord[index-1]+" "+gamerecord[index-3]+" "+"in"+" "+gamerecord[index-2]+" "+"tries")
    document.querySelector("#record").insertAdjacentHTML(
        "afterbegin",
        `<p>${text}<p>`)
}

genword();