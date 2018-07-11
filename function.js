var count = 0;
var array = [];

let check = event => {
    if (event.keyCode == 13) {
        show_ops_result();
    }

}

function show(element) {
    document.getElementById('showdiv').value += element;
    count = 0;
    console.log('count', count);
}

function show_ops(ops) {
    if (!count) {
        document.getElementById('showdiv').value += ops;
        count++;
    } else {
        var inputValue = document.getElementById('showdiv').value;
        value = inputValue.slice(0, -1);
        value = value + ops;
        document.getElementById('showdiv').value = value;
    }
}
function clearme() {
    document.getElementById('showdiv').value = '';
}
var newarray = [];

function show_ops_result() {
    var stringInput = document.getElementById('showdiv').value;

    //convert string to unicode
    function toUnicode(theString) {
        var unicodeString = '';
        for (var i = 0; i < theString.length; i++) {
            var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
            while (theUnicode.length < 4) {
                theUnicode = '0' + theUnicode;
            }
            theUnicode = '\\u' + theUnicode;
            unicodeString += theUnicode;
        }
        return unicodeString;
    }

    var unicodeString = toUnicode(stringInput)

    //replacing divide and times symbol
    unicodeString = unicodeString.replace(/00F7/g, '002F');
    unicodeString = unicodeString.replace(/00D7/g, '002A');

    //converting unicode to string
    function unicodeToChar(text) {
        return text.replace(/\\u[\dA-F]{4}/gi,
            function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            });
    }
    var stringResult = unicodeToChar(unicodeString);
    var result = eval(stringResult).toFixed(2);
    var newstringInput = `${stringInput} = ${result}`;
    newstringInput = newstringInput.toString();
    newarray.push(newstringInput);
    document.getElementById('showdiv').value = '';
    document.getElementById('result').innerHTML = result;
}

function show_total() {
    var ul = document.getElementById('dynamic-list');
    ul.innerHTML = '';
    console.log(newarray);
    // var unorderedList = document.createElement('ul');
    newarray.slice(0).reverse().map((item, index) => {
        if (index < 5) {
            if (item == undefined) {
                return
            }
            var ul = document.getElementById("dynamic-list");
            var li = document.createElement("li");
            li.setAttribute('id', item);
            li.classList.add("list");
            li.appendChild(document.createTextNode(item));
            ul.appendChild(li);

            console.log(item);

        }
    })
}
