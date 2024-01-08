let jokeText=document.getElementById("joke")
let authorName=document.getElementById("author")
let submitBtn=document.getElementById("submit")
let resetBtn=document.getElementById("reset")
let generateBtn=document.getElementById("generer")
let allJoke=document.getElementById("allJoke")
let numJok=document.getElementById("numJok")
let jokError=document.getElementById("jokeError")
let authorError=document.getElementById("authorError")
let url= "http://127.0.0.1:3000/jokes";

submitBtn.setAttribute("disabled", "");
let loadJoke = () => {
    console.log("salut");
    //questionsDiv.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.addEventListener("load", () => {
      if (xhr.status != 200) return alert("error" + xhr.response);
      let data = JSON.parse(xhr.response);
      data.forEach((ele) => ajoutejoke(ele));
      console.log(ele);
    });
    xhr.addEventListener("error", () => {
      alert("error");
    });
    xhr.send();
  };
  loadJoke();

{/* <li>
<div class="likes">
    12 likes
</div>


<div class="content">
    <h3>Mehdi Tmimi</h3>
    <p>Que demande un footballeur à son coiffeur ? La coupe du monde s'il vous plait</p>
</div>
<div class="btns">
    <button class="delete">delete</button>
    <button class="likeBtn">like</button>
</div>

</li> */}

jokeText.addEventListener("input",()=>{

    author=authorName.value
    joke=jokeText.value
    
    if(!author)
    {
        authorError.innerText="author is required"
        return submitBtn.setAttribute("disabled", "");

    }

if(joke.length<=5)
 {
    jokError.innerText="joke must contains at least 5 caracters"
    return submitBtn.setAttribute("disabled", "");

  }

})

let ajoutejoke=(data)=>{

    let liJoke=document.createElement("li")
    let likeDiv=document.createElement("div")
    let contentDiv=document.createElement("div")
    let authorTitre=document.createElement("h3")
    let jokeTitre=document.createElement("p")
    let jokeButton=document.createElement("div")
    let deleteBtn=document.createElement("button")
    let likeBtn=document.createElement("button")

    numJok.innerText = document.getElementsByClassName("likes").length+1;

    allJoke.appendChild(liJoke)

    contentDiv.appendChild(authorTitre)
    contentDiv.appendChild(jokeTitre)
    jokeButton.appendChild(deleteBtn)
    jokeButton.appendChild(likeBtn)

    liJoke.appendChild(likeDiv)
    liJoke.appendChild(contentDiv)
    liJoke.appendChild(jokeButton)

    likeDiv.classList.add("likes")
    contentDiv.classList.add("content")
    jokeButton.classList.add("btns")
    deleteBtn.classList.add("delete")
    likeBtn.classList.add("likeBtn")

    deleteBtn.innerText="delete"
    likeBtn.innerText="like"

    likeDiv.innerText=
    authorTitre.value=authorName.value
    jokeTitre.innerText=jokeText.value

    deleteBtn.addEventListener("click",()=>{
        console.log("salam");
        const xhr = new XMLHttpRequest();
        xhr.open("delete", url + "/" + data.id, true);
        xhr.addEventListener("load", () => {
          if (xhr.status != 200) return alert("error" + xhr.response);
          liJoke.remove()
        });
        xhr.addEventListener("error", () => {
          alert("error");
        });
        xhr.send()


    })
    likeBtn.addEventListener("click",()=>{
        const xhr = new XMLHttpRequest();
        xhr.open("put", url + "/" + data.id, true);
        xhr.setRequestHeader("Content-Type","application/json")
        xhr.addEventListener("load", () => {
          if (xhr.status != 200) return alert("error" + xhr.response);
           likeBtn.value=data.jokeLike++
        });
        xhr.addEventListener("error", () => {
          alert("error");
        });
        let dataPutToSend = {
            joke:data.joke,
            author:data.author,
            jokeLike:data.jokeLike++

        }
        xhr.send(JSON.stringify(dataPutToSend))
      });
}
submitBtn.addEventListener("click",()=>{

    let jokeValue = jokeText.value;
    let authorValue = authorName.value;
    let dataToSend = {
      joke: jokeValue,
      authorrValue: authorValue,
      jokeLike:0
    };
    dataToSend = JSON.stringify(dataToSend);
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      if (xhr.status == 201) {
        let data = JSON.parse(xhr.response);
        ajoutejoke(data);
        jokeText.value = "";
        authorName.value="";
      } else {
        alert(xhr.response);
      }
    });
    xhr.addEventListener("error", () => {
      alert("error");
    });
    xhr.send(dataToSend);
  });

