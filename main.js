$(document).ready(function(){
var input = $(`<input id="whyNot" type="text" class="validate">`);
var label = $(`<label for="whyNot">Have At It Hoss</label>`)
var btn = $(`<button class="btn btn-floating btn-large pulse" type="submit" name="action">Lookup
  </button>`);
var btn2 = $(`<button class="btn waves-effect waves-light" type="submit" name="action">Mute
    <i class="material-icons right">volume_off</i>
  </button>`);
$("#first").append(input);
$("#first").append(label);
$("#second").append(btn);
$("#third").append(btn2);



$(btn).click(function(){
var value = input.val()
  $.get(`http://words.bighugelabs.com/api/2/1e21b3abd7e53dfb7b17414af1edc945/${value}/xml`, function(json){
        let data = xmlToJson(json);
        
        $("#para").html(value)
        $("#para2").html(data.words.w[0])
        $("#para3").html(data.words.w[1])
        $("#para4").html(data.words.w[2])
        $("#para5").html(data.words.w[3])
        var sound = new Howl({
                    src: ['sounds/bubbles.mp3']
                  }).play();
        // for (let i = 0;i<data.words.w.length;i++){
        //   console.log(data.words.w)
        // }

    })

    $("#myCanvas").click(function(){
      var value = $("#para").html();
      $.get(`http://words.bighugelabs.com/api/2/1e21b3abd7e53dfb7b17414af1edc945/${value}/xml`, function(json){
            let data = xmlToJson(json);

            let arr = []

          for (let i = 0;i<data.words.w.length;i++){
             arr.push(i)
             if (arr.length === data.words.w.length){
                     for (let i = arr.length - 1; i > 0; i--) {
                 let j = Math.floor(Math.random() * (i + 1));
                 let temp  = arr[i];
                 arr[i] = arr[j];
                 arr[j] = temp;
                  }

              }
            }
            $("#para2").html(data.words.w[arr[0]])
            $("#para3").html(data.words.w[arr[1]])
            $("#para4").html(data.words.w[arr[2]])
            $("#para5").html(data.words.w[arr[3]])

        })

   });


})

$(btn2).click(function(){
  Howler.volume(0.0);
})


})

// Changes XML to JSON
// Modified version from here: http://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	// If just one text node inside
	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}
