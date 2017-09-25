function onClick(content){
    try{
        console.log("asked:" + content);
        if(content == "newDealDone"){
            let data = extractPageData();
            sendPost('loading', () => sendPostFull(content, data));
        }else{
            sendPost(content);
        }
    }catch(err){
        console.error(err);
    }
}

function extractPageData(){
    let data = {};
    let mForm = document.getElementById("mForm");
    let deal = document.getElementById("deal");
    if(mForm)
        data = extractForm(mForm);
    if(deal)
        data.dealData = deal.getAttribute("data-deal");
    return data;
}

function sendPost(content, callback){
    sendPostFull(content, extractPageData(), callback);
}

function sendPostFull(content, data, callback){
    $.ajax({
        url: document.location.origin + "/"  + content,
        type: 'POST',
        data: JSON.stringify(data),
        processData: false,
        contentType: "application/json; charset=utf-8",
        error: function(err){
            console.log("error:");
            console.log(err);
        },
        success: function (data) {
            $("#content").html(data);
            initialSwitch();
            if(callback)
                callback();
        }
    });
}

function extractForm(form) {
    var data = {};
    //console.log(form.elements.length)
    for (var x=0; x < form.elements.length; x++) {
        var field = form.elements[x];
        if (field.name && field.type !== "submit") {
            data[field.name] = (field.type == "radio" || field.type == "checkbox") ? (field.checked == "checked") : field.value;
        }
    }
    return data;
}
