let searchinput;
let part3;
let part4;
let part5;
let part6;
let part7;
let part8;
let part9;

let byalph;
let bypart;

let AllStands;

let StandsToDisplay;

let nbdisplayed;

class stand{
    constructor(standname,standpart){ //link for stand datas and link to stand image and stand part
        this.standname = standname;
        this.standpart = standpart;
    }
}

document.addEventListener('keydown', function(key){
    if(key.key == 'Enter'){
        key.preventDefault();
        Sort();
    }
})

function Start(){
    document.getElementById('Parts').style.visibility = 'hidden';
    searchinput = '';
    part3 = false;
    part4 = false;
    part5 = false;
    part6 = false;
    part7 = false;
    part8 = false;
    part9 = false;

    bypart = true;
    byalph = false;
    document.getElementById("SearchInput").value = '';
    document.getElementById('FilterByPart').style.color = '#008000';
    document.getElementById('FilterByAlph').style.color = '#000000';

    AllStands = [];
    StandsToDisplay = [];
    nbdisplayed = 0;

    CreateStands();
    
    Sort();
}

function Sort(){
    let searchInput = document.getElementById("SearchInput").value;
    StandsToDisplay = [];
    let allparts = !(part3 || part4 || part5 || part6 || part7 || part8 || part9);
    if(byalph){
        SortByName(allparts,searchInput);
    }
    else if(bypart){
        SortByPart(allparts,searchInput);
    }
    DisplaySortedStandList();
}

function SortByName(allparts,searchInput){
    for(let i = 0;i < AllStands.length;i++){
        let s = AllStands[i];
        let p = s.standpart;
        let n = s.standname;
        if((allparts || getPart(p)) && (searchInput == '' || Contain(n,searchInput))){
            done = false;
            for(let j = 0;j < StandsToDisplay.length && !done;j++){
                let name = StandsToDisplay[j].standname;
                if(n < name){
                    StandsToDisplay.splice(j,0,s);
                    done = true;
                }
            }
            if(!done) StandsToDisplay.splice(StandsToDisplay.length,0,s);
        }
    }
}

function SortByPart(allparts,searchInput){
    for(let i = 0;i < AllStands.length;i++){
        let s = AllStands[i];
        let p = s.standpart;
        let n = s.standname;
        if((allparts || getPart(p)) && (searchInput == '' || Contain(n,searchInput))){
            let done = false;
            for(let j = 0;j < StandsToDisplay.length && !done;j++){
                let part = StandsToDisplay[j].standpart;
                let name = StandsToDisplay[j].standname;
                if(p < part){
                    StandsToDisplay.splice(j,0,s);
                    done = true;
                }
                if(p == part && n < name){
                    StandsToDisplay.splice(j,0,s);
                    done = true;
                }
            }
            if(!done) StandsToDisplay.splice(StandsToDisplay.length,0,s);
        }
    }
}

function DisplaySortedStandList(){
    for(let i = 0;i < nbdisplayed;i++){
        let stando = document.getElementById(`standnb${i}`);
        stando.remove();
    }
    let container = document.getElementById("DisplayZone");
    for(let i = 0; i < StandsToDisplay.length;i++){
        let s = StandsToDisplay[i];
        let n = s.standname;
        let p = s.standpart;
        let stando = document.createElement("div");
        stando.setAttribute("id",`standnb${i}`);
        let img = document.createElement("img");
        img.setAttribute("class","standimage");
        img.setAttribute("src",`StandsImages/Part${p}/${n}.png`);
        stando.appendChild(img);
        let br = document.createElement("br");
        stando.appendChild(br);
        let name = document.createElement("a");
        name.setAttribute("class","standname");
        name.append(`${s.standname}`);
        stando.appendChild(name);
        container.appendChild(stando);
    }
    nbdisplayed = StandsToDisplay.length;
}

function getPart(part){
    switch(part){
        case 3:
            return part3;
        case 4:
            return part4;
        case 5:
            return part5;
        case 6:
            return part6;
        case 7:
            return part7;
        case 8:
            return part8;
        case 9:
            return part9;
    }
}

function Contain(name,str){
    let n = ToLowerCase(name);
    let s = ToLowerCase(str);
    let j = 0;
    for(let i = 0; i < n.length;i++){
        if(n[i] == s[j]){
            j++;
            if(j == s.length) return true;
        }
    }
    return false;
}

function ToLowerCase(str){
    let res = '';
    for(let i = 0;i < str.length;i++){
        let l = str[i];
        if(l >= 'A' && l <= 'Z'){
            res += l.toLowerCase();
        }
        else{
            res += l;
        }
    }
    return res;
}

function OpenFilters(){
    let DisplayParts = document.getElementById('Parts');
    if(DisplayParts.style.visibility != 'hidden'){
        DisplayParts.style.visibility = 'hidden'
    }
    else{
        DisplayParts.style.visibility = 'visible'
    }
}

function ByOrder(){
    if(!byalph){
        document.getElementById('FilterByAlph').style.color = '#008000';
        document.getElementById('FilterByPart').style.color = '#000000';
        byalph = true;
        bypart = false;
        Sort();
    }
}

function ByPart(){
    if(!bypart){
        document.getElementById('FilterByPart').style.color = '#008000';
        document.getElementById('FilterByAlph').style.color = '#000000';
        byalph = false;
        bypart = true;
        Sort();
    }
}

function PartFilter(Part){
    let nb = Part[Part.length -1];
    switch(nb){
        case '3':
            if(part3){
                document.getElementById('Part3').style.color = '#000000';
                part3 = false;
            }
            else{
                document.getElementById('Part3').style.color = '#008000';
                part3 = true;
            }
            break;
        case '4':
            if(part4){
                document.getElementById('Part4').style.color = '#000000';
                part4 = false;
            }
            else{
                document.getElementById('Part4').style.color = '#008000';
                part4 = true;
            }
            break;
        case '5':
            if(part5){
                document.getElementById('Part5').style.color = '#000000';
                part5 = false;
            }
            else{
                document.getElementById('Part5').style.color = '#008000';
                part5 = true;
            }
            break;
        case '6':
            if(part6){
                document.getElementById('Part6').style.color = '#000000';
                part6 = false;
            }
            else{
                document.getElementById('Part6').style.color = '#008000';
                part6 = true;
            }
            break;
        case '7':
            if(part7){
                document.getElementById('Part7').style.color = '#000000';
                part7 = false;
            }
            else{
                document.getElementById('Part7').style.color = '#008000';
                part7 = true;
            }
            break;
        case '8':
            if(part8){
                document.getElementById('Part8').style.color = '#000000';
                part8 = false;
            }
            else{
                document.getElementById('Part8').style.color = '#008000';
                part8 = true;
            }
            break;
        case '9':
            if(part9){
                document.getElementById('Part9').style.color = '#000000';
                part9 = false;
            }
            else{
                document.getElementById('Part9').style.color = '#008000';
                part9 = true;
            }
            break;
    }
    Sort();
}

function GetMyStand(){
    for(let i = 0;i < nbdisplayed;i++){
        let stando = document.getElementById(`standnb${i}`);
        stando.remove();
    }

    let i = Random();

    let container = document.getElementById("DisplayZone");
    let s = AllStands[i];
    let n = s.standname;
    let p = s.standpart;
    let stando = document.createElement("div");
    stando.setAttribute("id",`standnb0`);
    let img = document.createElement("img");
    img.setAttribute("class","standimage");
    img.setAttribute("src",`StandsImages/Part${p}/${n}.png`);
    stando.appendChild(img);
    let br = document.createElement("br");
    stando.appendChild(br);
    let name = document.createElement("a");
    name.setAttribute("class","standname");
    name.append(`${s.standname}`);
    stando.appendChild(name);
    container.appendChild(stando);

    nbdisplayed = 1;
}

function Random() {
  return Math.floor(Math.random() * AllStands.length);
}

function CreateStands(){

    AllStands.push(new stand("Star Platinum",3));
    AllStands.push(new stand("Silver Chariot",3));
    AllStands.push(new stand("Magician's Red",3));
    AllStands.push(new stand("Hermit Purple",3));
    AllStands.push(new stand("Hierophant Green",3));
    AllStands.push(new stand("The Fool",3));
    AllStands.push(new stand("The World",3));
    AllStands.push(new stand("Tower Of Gray",3));
    AllStands.push(new stand("Dark Blue Moon",3));
    AllStands.push(new stand("Strength",3));
    AllStands.push(new stand("Ebony Devil",3));
    AllStands.push(new stand("Yellow Temperance",3));
    AllStands.push(new stand("Hanged Man",3));
    AllStands.push(new stand("Emperor",3));
    AllStands.push(new stand("Empress",3));
    AllStands.push(new stand("Wheel Of Fortune",3));
    AllStands.push(new stand("Justice",3));
    AllStands.push(new stand("Lovers",3));
    AllStands.push(new stand("Sun",3));
    AllStands.push(new stand("Death Thirteen",3));
    AllStands.push(new stand("Judgement",3));
    AllStands.push(new stand("High Priestess",3));
    AllStands.push(new stand("Geb",3));
    AllStands.push(new stand("Khnum",3));
    AllStands.push(new stand("Tohth",3));
    AllStands.push(new stand("Anubis",3));
    AllStands.push(new stand("Bastet",3));
    AllStands.push(new stand("Sethan",3));
    AllStands.push(new stand("Osiris",3));
    AllStands.push(new stand("Horus",3));
    AllStands.push(new stand("Atum",3));
    AllStands.push(new stand("Tenore Sax",3));
    AllStands.push(new stand("Cream",3));
    AllStands.push(new stand("Holy Stand",3));
    AllStands.push(new stand("Jonathan Stand",3));
    

    AllStands.push(new stand("Crazy Diamond",4));
    AllStands.push(new stand("The Hand",4));
    AllStands.push(new stand("Echoes",4));
    AllStands.push(new stand("Heaven's Door",4));
    AllStands.push(new stand("Killer Queen",4));
    AllStands.push(new stand("Aqua Necklace",4));
    AllStands.push(new stand("Bad Company",4));
    AllStands.push(new stand("The Lock",4));
    AllStands.push(new stand("Surface",4));
    AllStands.push(new stand("Love Deluxe",4));
    AllStands.push(new stand("Red Hot Chili Pepper",4));
    AllStands.push(new stand("Ratt",4));
    AllStands.push(new stand("Harvest",4));
    AllStands.push(new stand("Atom Heart Father",4));
    AllStands.push(new stand("Boy II Man",4));
    AllStands.push(new stand("Highway Star",4));
    AllStands.push(new stand("Super Fly",4));
    AllStands.push(new stand("Enigma",4));
    AllStands.push(new stand("Cheap Trick",4));
    AllStands.push(new stand("Pearl Jam",4));
    AllStands.push(new stand("Achtung Baby",4));
    AllStands.push(new stand("Earth Wind And Fire",4));
    AllStands.push(new stand("Cinderella",4));
    AllStands.push(new stand("Stray Cat",4));

    AllStands.push(new stand("Golden Experience",5));
    AllStands.push(new stand("Sticky Fingers",5));
    AllStands.push(new stand("Moody Blues",5));
    AllStands.push(new stand("Sex Pistols",5));
    AllStands.push(new stand("Aerosmith",5));
    AllStands.push(new stand("Purple Haze",5));
    AllStands.push(new stand("Spice Girl",5));
    AllStands.push(new stand("Mr. President",5));
    AllStands.push(new stand("King Crimson",5));
    AllStands.push(new stand("Black Sabbath",5));
    AllStands.push(new stand("Soft Machine",5));
    AllStands.push(new stand("Kraft Work",5));
    AllStands.push(new stand("Metallica",5));
    AllStands.push(new stand("Little Feet",5));
    AllStands.push(new stand("Man In The Mirror",5));
    AllStands.push(new stand("Beach Boy",5));
    AllStands.push(new stand("The Grateful Dead",5));
    AllStands.push(new stand("Baby Face",5));
    AllStands.push(new stand("White Album",5));
    AllStands.push(new stand("Clash",5));
    AllStands.push(new stand("Talking Head",5));
    AllStands.push(new stand("Notorious B.I.G",5));
    AllStands.push(new stand("Green Day",5));
    AllStands.push(new stand("Oasis",5));
    AllStands.push(new stand("Rolling Stones",5));


    AllStands.push(new stand("Stone Free",6));
    AllStands.push(new stand("Burning Down The House",6));
    AllStands.push(new stand("Kiss",6));
    AllStands.push(new stand("Foo Fighters",6));
    AllStands.push(new stand("Weather Report",6));
    AllStands.push(new stand("Diver Down",6));
    AllStands.push(new stand("Whitesnake",6));
    AllStands.push(new stand("C-MOON",6));
    AllStands.push(new stand("Made In Heaven",6));
    AllStands.push(new stand("Goo Goo Dolls",6));
    AllStands.push(new stand("Manhattan Transfer",6));
    AllStands.push(new stand("Highway To Hell",6));
    AllStands.push(new stand("Marilyn Manson",6));
    AllStands.push(new stand("Jumpin' Jack Flash",6));
    AllStands.push(new stand("Limp Bizkit",6));
    AllStands.push(new stand("Survivor",6));
    AllStands.push(new stand("Planet Waves",6));
    AllStands.push(new stand("Dragon's Dream",6));
    AllStands.push(new stand("Yo-Yo Ma",6));
    AllStands.push(new stand("Green Green Grass Of Home",6));
    AllStands.push(new stand("Jail House Lock",6));
    AllStands.push(new stand("Bohemian Rhapsody",6));
    AllStands.push(new stand("Sky High",6));
    AllStands.push(new stand("Under World",6));


    AllStands.push(new stand("Tusk",7));
    AllStands.push(new stand("Ball Breaker",7));
    AllStands.push(new stand("Ticket To Ride",7));
    AllStands.push(new stand("Scary Monsters",7));
    AllStands.push(new stand("Cream Starter",7));
    AllStands.push(new stand("Dirty Deeds Done Dirt Cheap",7));
    AllStands.push(new stand("In A Silent Way",7));
    AllStands.push(new stand("Tomb Of The Boom 1 2 3",7));
    AllStands.push(new stand("Boku No Rhythm Wo Kiitekure",7));
    AllStands.push(new stand("Wired",7));
    AllStands.push(new stand("Mandom",7));
    AllStands.push(new stand("Catch The Rainbow",7));
    AllStands.push(new stand("Sugar Mountain",7));
    AllStands.push(new stand("Tattoo You",7));
    AllStands.push(new stand("Tubular Bells",7));
    AllStands.push(new stand("20th Century Boy",7));
    AllStands.push(new stand("Civil War",7));
    AllStands.push(new stand("Chocolate Disco",7));
    AllStands.push(new stand("The World Alternate Universe",7));
    AllStands.push(new stand("Oh! Lonesome Me",7));
    AllStands.push(new stand("Hey Ya",7));



    AllStands.push(new stand("Soft & Wet",8));
    AllStands.push(new stand("Paisley Park",8));
    AllStands.push(new stand("King Nothing",8));
    AllStands.push(new stand("Doggy Style",8));
    AllStands.push(new stand("Nut King Call",8));
    AllStands.push(new stand("Paper Moon King",8));
    AllStands.push(new stand("California King Bed",8));
    AllStands.push(new stand("Walking Heart",8));
    AllStands.push(new stand("Speed King",8));
    AllStands.push(new stand("Awaking III Leaves",8));
    AllStands.push(new stand("Space Trucking",8));
    AllStands.push(new stand("Wonder Of U",8));
    AllStands.push(new stand("Fun Fun Fun",8));
    AllStands.push(new stand("Born This Way",8));
    AllStands.push(new stand("I Am A Rock",8));
    AllStands.push(new stand("Doobie Wah",8));
    AllStands.push(new stand("Schott Key No.1",8));
    AllStands.push(new stand("Schott Key No.2",8));
    AllStands.push(new stand("Vitamin C",8));
    AllStands.push(new stand("Blue Hawaii",8));
    AllStands.push(new stand("Brain Storm",8));
    AllStands.push(new stand("Ozon Baby",8));
    AllStands.push(new stand("Doctor Wu",8));
    AllStands.push(new stand("Love Love Deluxe",8));
    AllStands.push(new stand("Les Feuilles",8));
    AllStands.push(new stand("Milagroman",8));
    AllStands.push(new stand("Killer Queen Alternate Universe",8));
    AllStands.push(new stand("Joseph Stand",8));


    AllStands.push(new stand("November Rain",9));
    AllStands.push(new stand("Smooth Operators",9));
    AllStands.push(new stand("The Hustle",9));
    AllStands.push(new stand("The Matte Kudasai",9));
    AllStands.push(new stand("Big Mouth Strikes Again",9));
    AllStands.push(new stand("Heaven's Door",9));
    AllStands.push(new stand("Eclipse Eight",9));
    AllStands.push(new stand("Cat Size",9));
    AllStands.push(new stand("Bags' Groove",9));
    AllStands.push(new stand("Glory Days",9));
    AllStands.push(new stand("Lyin' Eyes",9));
    AllStands.push(new stand("200 Balloons",9));
    AllStands.push(new stand("West End Girl",9));
    AllStands.push(new stand("Look Back Stand",9));
}