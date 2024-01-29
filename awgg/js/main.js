import "../style.css"

function reverse(word){
    let split = word.split("");
    let reversed = split.reverse();
    let rword = reversed.join("");
    return rword
}

async function genword(){
    try{
        let call = await fetch(`https://random-word-api.herokuapp.com/word?length=5&lang=en`);
        let word = await call.json();
        let ans = String(word[0])
        game(reverse(ans))
    }
    catch{
        console.log("caugh")
    }

}

function game(answer){
    let tries = 1
    document.querySelector("#input").addEventListener("keyup",(event)=>{
        if(event.key==="Enter"){
            let guess = reverse(document.querySelector("#input").value)
            if (guess.length === 5){
                console.log(tries)
                console.log(answer)
                document.querySelector(`#column${tries}`).innerHTML=""
                document.querySelector("#input").value=""
                    if(guess===answer){
                        for (let i = 0; i < answer.length; i++) {
                            document.querySelector(`#column${tries}`).insertAdjacentHTML(
                                "afterbegin",
                                `<div id="boxyes">${guess[i]}</div>`
                            )
                        }
                        alert("you winned")
                    }else{
                        for (let i = 0; i < answer.length; i++) {
                            if(guess[i]===answer[i]){
                                document.querySelector(`#column${tries}`).insertAdjacentHTML(
                                    "afterbegin",
                                    `<div id="boxyes">${guess[i]}</div>`
                                )
                            }else if(answer.includes(guess[i])===true){
                                document.querySelector(`#column${tries}`).insertAdjacentHTML(
                                    "afterbegin",
                                    `<div id="boxmaybe">${guess[i]}</div>`
                                )
                            }else if(answer.includes(guess[i])===false){
                                document.querySelector(`#column${tries}`).insertAdjacentHTML(
                                    "afterbegin",
                                    `<div id="boxno">${guess[i]}</div>`
                                )
                            }
                    }
                    }
                    if(tries===6){
                        alert("yousuck")
                    }
                  tries++
            }else{
                alert("5 letters")
            }
        }
        
    }
    
    )
}

genword();

