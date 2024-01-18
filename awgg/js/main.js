import "../style.css"

async function genword(){
    try{
        let call = await fetch(`https://random-word-api.herokuapp.com/word?length=5&lang=en`);
        let word = await call.json();
        let ans = String(word[0])
        document.querySelector("#search").addEventListener("keyup",(event)=>{
            if(event.key==="Enter"){
                console.log(ans)
                for (let i = 0; i < ans.length; i++) {
                    console.log(ans[i])
                  }
            }
        }
        )
    }
    catch{
        console.log("caugh")
    }

}

genword();