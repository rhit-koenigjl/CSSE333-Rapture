function main() {
    let imageThemes = ['blank', 'rainbow', 'lightning', 'fire'];
    let themeIndex = Math.floor(Math.random() * imageThemes.length);
    let selected = imageThemes[themeIndex];

    console.log(1);

    document.querySelector("#titleImage").setAttribute("src", "images/logo_" + selected + ".png");

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
main();