const apiURL = "http://localhost:3000/api/";
const loginURL = "http://localhost:8080/static/login/";
const homeURL = "http://localhost:8080/static/";
let isLoggedIn = false;



function addDisaster(name, description, range) {
    // var query = `EXEC addDisaster @name = ${name}, @description = ${description}, @range = ${range}`;
    let data = {"name": name,
                "description": description,
                "range": range};
    
    let entry = fetch(apiURL + "disaster/", {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(data),
    })
    .catch((err) => {
        console.log(err);
    })
    //sqlQueryFunc(query);
}

function addItem(name, description) {
    let data = {"name": name,
                "description": description
               };

let entry = fetch(apiURL + "item/", {
method: "POST",
headers: { "Content-Type": 'application/json' },
body: JSON.stringify(data),
})
.catch((err) => {
console.log(err);
})
}

function  addSkill(name, description) {
    let data = {"name": name,
                "description": description
               };

let entry = fetch(apiURL + "skill/", {
method: "POST",
headers: { "Content-Type": 'application/json' },
body: JSON.stringify(data),
})
.catch((err) => {
console.log(err);
})
}

function login(name, password){
    let data = {"name": name,
                "password": password,
                };

    let entry = fetch(apiURL + "login/", {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data),
    })
    .catch((err) => {
        console.log(err);
    })
 isLoggedIn = true;
}

function register(uname, password, name, location){
    let data = {"name": name,
    "password": password,
    "username": uname,
    "location": location,
    };

    let entry = fetch(apiURL + "register/", {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data),
    })
    .catch((err) => {
        console.log(err);
})
isLoggedIn = true;
}

function loginPage() {
    document.getElementById("loginBtn").onclick = (event) => {
        console.log("CLicked");
        var name = document.getElementById("loginUser");
        var pass = document.getElementById("loginPass");
        login("[" + name.value + "]", "[" +pass.value + "]");
        name.value = "";
        pass.value = "";
    }

    document.getElementById("registerBtn").onclick = (event) => {
        console.log("CLicked");
        var uname = document.getElementById("registerUser");
        var name = document.getElementById("registerName");
        var pass = document.getElementById("registerPass");
        var loc = document.getElementById("registerLocation");
        register("[" +uname.value + "]", "[" +pass.value + "]", "[" + name.value + "]", "[" +loc.value + "]");
        uname.value = "";
        name.value = "";
        pass.value = "";
        loc.value = "";
    }

}

function homePage(){
    document.querySelector("#addDisaster").onclick = (event) => {
        console.log("CLICKED");
        var name = document.getElementById("DisasterName");
        var range = document.getElementById("DisasterRange");
        var desc = document.getElementById("DisasterDescription");
        console.log(`${name, range, desc}`);
        console.log(`${name.value}, ${range.value}, ${desc.value}`)
        addDisaster("[" + name.value + "]", "[" +desc.value + "]", "[" +range.value + "]"); 
        name.value = "";
        range.value = "";
        desc.value = "";
       }
    
    document.querySelector("#addItem").onclick = (event) => {
        console.log("CLICKED");
        var name = document.getElementById("ItemName");
        var desc = document.getElementById("ItemDescription");
        console.log(`${name, desc}`);
        console.log(`${name.value}, ${desc.value}`)
        addItem("[" + name.value + "]", "[" +desc.value + "]"); 
        name.value = "";
        desc.value = "";
    }

    document.querySelector("#addSkill").onclick = (event) => {
        console.log("CLICKED");
        var name = document.getElementById("SkillName");
        var desc = document.getElementById("SkillDescription");
        console.log(`${name, desc}`);
        console.log(`${name.value}, ${desc.value}`)
        addSkill("[" + name.value + "]", "[" +desc.value + "]"); 
        name.value = "";
        desc.value = "";
    }

    // replace this standard data with some kind of API call that calls the storedProc getDisasters
    let disasterData = [
        {
            name: 'Test Disaster 1',
            location: 'Percopo',
            dangerLevel: 'A'
        },
        {
            name: 'Test Disaster 2',
            location: 'BSB',
            dangerLevel: 'C'
        },
        {
            name: 'Test Disaster 3',
            location: 'MEES',
            dangerLevel: 'D'
        },
        {
            name: 'Test Disaster 4',
            location: 'Blumburg',
            dangerLevel: 'X'
        },
        {
            name: 'Test Disaster 5',
            location: 'Speed',
            dangerLevel: 'P'
        },
    ];

    const disasterContainer = document.querySelector("#disastersList");
    disasterContainer.innerHTML = "";
    disasterData.forEach(data => {
        console.log(data);

        let a = document.createElement('div');
        a.innerHTML = '<div class="disaster-bubble"><p>' + data.name +
        '</p><p>Location: ' + data.location +
        '</p><p>Danger Level: ' + data.dangerLevel +
        '</p></div>';
        disasterContainer.appendChild(a);
    });
}

function main() {
    console.log("in main");
    if(!isLoggedIn && window.location.href != loginURL){
        window.location.href = loginURL;
        //login();
    }else if(isLoggedIn && window.location.href != homeURL){
        window.location.href = homeURL;
    }

    if(isLoggedIn){
        homePage();
    }else{
        loginPage();
    }

    
    let imageThemes = ['blank', 'rainbow', 'lightning', 'fire'];
    let themeIndex = Math.floor(Math.random() * imageThemes.length);
    let selected = imageThemes[themeIndex];

    console.log(1);

    document.querySelector("#titleImage").setAttribute("src", "images/logo_" + selected + ".png");

    
}
main();