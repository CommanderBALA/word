const elements = document.querySelectorAll('.btn')
const elements1 = document.querySelectorAll('.button')
const alertt = document.querySelector('.alert')
const popup = document.querySelector('.slider')
const saveclass = document.querySelector('.savetime')
var settings = document.getElementById('settings')
var csuszi = document.getElementById("myRange");
var csuszi2 = document.getElementById("myRange2");
var check = document.getElementById("check");
var color = document.getElementById("color");
var bcolor = document.getElementById("bcolor");
let content = document.querySelector('.content');
let main_content = document.getElementById('main-content');
let showcontent = document.getElementById('showcontent');
let sb = document.getElementById('sb');
let printMode = document.getElementById('printMode')
let printContent = document.getElementById('contentP')
let printMin = document.getElementById('min')
let lc = document.getElementById('lc')
let sc = document.getElementById('sc')
let ec = document.getElementById('ec')
let m = document.getElementById('m')
let a = document.getElementById('a')
let n = document.getElementById('n')
let fontF = document.getElementById('fontF')

let readLang;


let autosave = false

let w = document.getElementById('w')
let b = document.getElementById('b')
let c = document.getElementById('c')

var x = document.getElementById("snackbar");

var loader = document.querySelector(".preloader");

window.addEventListener("load", vanish)

function vanish() {
  loader.classList.add("disppear")
}

window.onload = function() {
	if(localStorage.getItem('content')) {
		content.innerHTML = localStorage.getItem('content');
    } 
    popup.style.display = 'none';
    color.style.display = 'none';
    bcolor.style.display = 'none';
    fontF.style.display = 'none';

    if(localStorage.getItem('width') > 500){
        main_content.style.width = `${localStorage.getItem('width')}px`
        csuszi2.value = localStorage.getItem('width') / 100 - 5 
    }

    if(localStorage.getItem('auto') == '1'){
        check.checked = true
        autosave = true
        AutoSave()
    }
    
    let body = document.body
    if(localStorage.getItem('color') == 'white' || !localStorage.getItem('color')) {
        w.style.border = 'green solid 3px'
    } else if(localStorage.getItem('color') == 'black') {
        body.style.background = 'black'
        b.style.border = 'green solid 3px'
        w.style.border = 'gray solid 3px'
    } else {
        body.style.background = localStorage.getItem('color')
        c.style.border = 'green solid 3px'
        w.style.border = 'gray solid 3px'
        c.value = localStorage.getItem('color')
    }

    if(localStorage.getItem('read_lang') == "de") {
        n.checked = true
        readLang = "Google Deutsch"
    } else if (localStorage.getItem('read_lang') == "en") {
        a.checked = true
        readLang = "Google US English"
    } else if (!localStorage.getItem('read_lang')) {
        m.checked = true
        readLang = "Microsoft Szabolcs - Hungarian (Hungary)"
    }
    setTimeout(() => {C()}, 500)
}


elements.forEach(element => {
    element.addEventListener('click', () => {
        let command = element.dataset['element'];

        if(command == 'insertImage') {
            let url = prompt('ad', 'http://')
            document.execCommand(command, false, url)
            Save()
        }        
        else if(command == 'fontSize') {

            if(popup.style.display == 'none'){
                popup.style.display = 'inline-block'
            }else {
                popup.style.display = 'none'
            }

            //let size = prompt('Adja meg a betűméretet', '3')
            //document.execCommand(command, false, size)
        } 
        else if(command == 'fontName') {
            //let type = prompt('Adja meg a betűtípust (https://learn.microsoft.com/en-us/typography/fonts/windows_10_font_list)', 'Arial')
            //document.execCommand(command, false, type)
            if(fontF.style.display == 'none'){
                fontF.style.display = 'block'
            }else {
                fontF.style.display = 'none'
            }
            Save()
        }
        else if(command == 'createLink') {
            let url = prompt('Írd be a linket amire szeretnél hivatkozni', 'http://')
            document.execCommand('createLink', false, url)
            Save()
        }
        else if(command == 'foreColor') {
           //let type = prompt('Adja meg a színt HEX formátumban (#ffffff / #a36gh8)', '#000000')
           //document.execCommand(command, false, type)
        
            if(color.style.display == 'none'){
                color.style.display = 'block'
            }else {
                color.style.display = 'none'
            }
        }
        else if(command == 'backColor') {
            //let type = prompt('Adja meg a színt HEX formátumban (#ffffff / #a36gh8)', '#000000')
            //document.execCommand(command, false, type)

            if(bcolor.style.display == 'none'){
                bcolor.style.display = 'block'
            }else {
                bcolor.style.display = 'none'
            }
        }
        else if(command == 'save') {
            Save()
            SaveAlert('#129b19', 'Sikeresen mentette a munkáját!')
        }
        else if (command) {
            document.execCommand(command, false, null);
            Save()
        }
    })
})

elements1.forEach(element => {
    element.addEventListener('click', () => {
        let command = element.dataset['element'];

        if(command == 'no'){
            document.getElementById('id01').style.display='none'
            Save()
        }
        else if(command == 'yes'){
            document.getElementById('content').innerHTML = '';
            localStorage.removeItem('content');
            document.getElementById('id01').style.display='none'
            SaveAlert('rgb(177, 13, 13)', 'Munkalap törölve!')
        } 
    })
})

function SaveAlert(back, text) {
    alertt.style.background = back;
    alertt.innerHTML = text
    alertt.style.opacity = 1;
    alertt.style.visibility = "visible";
    setTimeout(() => {
        alertt.style.opacity = 0;
        alertt.style.visibility = "hidden";
    }, "1500")
}

csuszi.oninput = function() {
    let sizee = 3
    sizee = this.value
    let size = sizee / 10
    document.execCommand('fontSize', false, size)
    Save()
}

color.oninput = function() {
    let colorValue = color.value;
    document.execCommand('foreColor', false, colorValue)
    Save()
}

bcolor.oninput = function() {
    let colorValue = bcolor.value;
    document.execCommand('backColor', false, colorValue)
    Save()
}

m.oninput = function() {
    M(false)
}

a.oninput = function() {
    A(false)
}

n.oninput = function() {
    N(false)
}

function M(text) {
    let checked = m.checked
    if (checked || text == true) {
        localStorage.removeItem('read_lang')
        readLang = "Microsoft Szabolcs - Hungarian (Hungary)"
        m.checked = true
    }
}

function A(text) {
    let checked = a.checked
    if (checked || text == true) {
        localStorage.setItem('read_lang', "en")
        readLang = "Google US English"
        a.checked = true
    }
}

function N(text) {
    let checked = n.checked
    if (checked || text == true) {
        localStorage.setItem('read_lang', "de")
        readLang = "Google Deutsch"
        n.checked = true
    }
}


let hour = 0
let min = 0



//var time = today.getHours() + ":" + today.getMinutes();// + ":" + today.getSeconds();

function Save() {

    localStorage.setItem('content', content.innerHTML);

    saveclass.innerHTML = ''

    let today = new Date();
        hour = today.getHours()
        min = today.getMinutes()

    if (hour   < 10) {hour = `0${hour}`;}
    if (min < 10) {min = `0${min}`;}

    return saveclass.innerHTML = `Legutolsó mentés: ${hour + ":" + min}`;
}




function Delete(num) {
    localStorage.removeItem(`save${num}`)


    x.innerHTML = `Mentés #${num} törölve!`
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}

function Show(num) {
    if(localStorage.getItem(`save${num}`)) {
        showcontent.innerHTML = localStorage.getItem(`save${num}`);
        sb.style.display = "block";
        x.innerHTML = `Mentés #${num} betöltve!`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    } else {
        x.innerHTML = `Mentés #${num} nem lehet betölteni!`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
        return
    }
}

function Open(num) {
    if(localStorage.getItem(`save${num}`)) {
		content.innerHTML = localStorage.getItem(`save${num}`);
        x.innerHTML = `Mentés #${num} betöltve!`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    } else {
        x.innerHTML = `Mentés #${num} nem lehet betölteni!`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }
}

function SaveM(num) {
    localStorage.setItem(`save${num}`, content.innerHTML);

    x.innerHTML = `Mentés #${num} mentve!`
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}

function Settings() {
    settings.style.display='block'
}

function ColorMode(color) {
    let body = document.body

    body.style.background = color
    localStorage.setItem('color', color)

    if (color == 'white') {
        w.style.border = 'green solid 3px'
        b.style.border = 'gray solid 3px'
        c.style.border = 'gray solid 3px'
    } else if (color == 'black') {
        w.style.border = 'gray solid 3px'
        b.style.border = 'green solid 3px'
        c.style.border = 'gray solid 3px'
    } else {
        w.style.border = 'gray solid 3px'
        b.style.border = 'gray solid 3px'
        c.style.border = 'green solid 3px'
    }
}

c.oninput = function() {
    let colorValue = c.value;
    ColorMode(colorValue)
}

csuszi2.oninput = function() {
    let size = this.value
    main_content.style.width = `${500 + (100 * size)}px`
    localStorage.setItem('width', 500 + (100 * size))
}

function DelData() {
    localStorage.removeItem('width')
    localStorage.removeItem('content')
    localStorage.removeItem('color')
    localStorage.removeItem('save1')
    localStorage.removeItem('save2')
    localStorage.removeItem('save3')
    localStorage.removeItem('save4')
    localStorage.removeItem('save5')
    localStorage.removeItem('auto')
    localStorage.removeItem('read_lang')

    x.innerHTML = `Adatbázis törölve!`
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    setTimeout(function(){ window.location = window.location.href }, 1000)
}

check.oninput = function() {
    let size = this.checked
    if (size == true) {
        localStorage.setItem('auto', '1')
        autosave = true
        AutoSave()
        x.innerHTML = `Automatikus mentés: BEKAPCSOLVA!`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    } else {
        localStorage.removeItem('auto')
        autosave = false
        x.innerHTML = `Automatikus mentés: KIKAPCSOLVA!`
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }

}

function AutoSave() {
    if(autosave == true) {
        Save()
        setTimeout(function() { AutoSave() }, 10000)
    }
}

function Print() {
    printMode.style.display = "block";
    printContent.innerHTML = content.innerHTML
    window.print()
    printMode.style.display = "none";
}

function Max() {
    printMode.style.display = "block";
    printMin.style.display = "block";
    printContent.innerHTML = content.innerHTML
}

function Min() {
    printMode.style.display = "none";
    printMin.style.display = "none";
}

function Download(element, filename) {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='https://www.w3.org/TR/html40/'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}

let synth = speechSynthesis,
isSpeaking = true;

function Read(){
    let utterance = new SpeechSynthesisUtterance(content.innerHTML);
    for(let voice of synth.getVoices()){
        if (voice.name == readLang) {
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

document.addEventListener("keydown", function(e) {
    if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      Save()
      SaveAlert('#129b19', 'Sikeresen mentette a munkáját!')
    }
}, false);
function test() {
    for(let voice of synth.getVoices()){
        console.log(voice)
    }
}

function C() {
    let c = content.textContent.length;
    let s = content.textContent.split(' ').length;
    //let e = +content.textContent.split(/\r |\r| /).length
    if (s == 1 && c == 0) {
        s = 0
    }
    lc.innerHTML = c
    sc.innerHTML = s
    //ec.innerHTML = e
    setTimeout(() => {C()}, 200)
}

fontF.oninput = function() {
    let name = fontF.value
    document.execCommand("fontName", false, name)
}


//speechBtn.addEventListener("click", e =>{
//    e.preventDefault();
//    if(content.value !== ""){
//        if(!synth.speaking){
//            textToSpeech(content.value);
//        }
//        if(content.value.length > 80){
//            setInterval(()=>{
//                if(!synth.speaking && !isSpeaking){
//                    isSpeaking = true;
//                    speechBtn.innerText = "Convert To Speech";
//                }else{
//                }
//            }, 500);
//            if(isSpeaking){
//                synth.resume();
//                isSpeaking = false;
//                speechBtn.innerText = "Pause Speech";
//            }else{
//                synth.pause();
//                isSpeaking = true;
//                speechBtn.innerText = "Resume Speech";
//            }
//        }else{
//            speechBtn.innerText = "Convert To Speech";
//        }
//    }
//});

/*
let off = false

function getSelectedTextOff() {
    off = true
    console.log(off)
}

function getSelectedText() {
    setTimeout(() => {
        if (!off) {
            var sel, range;
            if (window.getSelection()) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(document.createTextNode("ASDXD"));
                }
            }
        } else {
            off = false
            return;
        }
    }, 1000)
    
}*/