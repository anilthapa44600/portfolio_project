

let active_link = "home-link";
function showMenu() {
    let x = document.getElementById("fixed-nav");
    if (x.className === "top-nav") {
        x.className += " responsive";
    } else {
        x.className = "top-nav";
    }
}

function scrollToView(pressed_link, view_id){
    let x = document.getElementById("fixed-nav");
    x.className = "top-nav";

    //change color of pressed link
    document.getElementById(active_link).classList.remove("active");
    document.getElementById(pressed_link).classList.add("active");
    active_link = pressed_link;
    document.getElementById(view_id).scrollIntoView()
}

 //jquery for carousel
$(document).ready(function(){
    $('.autoplay').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 750,
        arrows: false,
        pauseOnFocus: false,
        accessibility:false,
        draggable: false,
        pauseOnHover: false,
        responsive:[
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 2,
                draggable: false,
            }
        }
        ],
    });
 });


document.getElementById('subscribe-form').addEventListener("submit", function(event){
    console.log("submitting form data");
    event.preventDefault();
    callAjax("#subscribe-form");
});

document.getElementById('message-form').addEventListener("submit", function(event){
    console.log("submitting form data");
    event.preventDefault();
    callAjax("#message-form");
});
//ajax code for submitting form data to server
function callAjax(id){

    let form_element = $(id);
    let url_pattern = "";
    if (id === "#subscribe-form"){
        url_pattern = "subscribe";
    }
    else if (id === "#message-form"){
        url_pattern = "message";
    }

    $.ajax({
        url: url_pattern,
        type: 'POST',
        data: form_element.serialize(),
        dataType: 'json',
        header: { 'X-CSRFToken': '{% csrf_token %}' },
        success: function(data){

            if( id === "#subscribe-form"){
                clearInputField(['#subscribe-email']);
            }else if(id === "#message-form"){
               clearInputField(['#name', '#email', '#phone', '#message']);
            }
            parameterList = getToastParameter(data);
            console.log(parameterList[0]);

            showToast(parameterList[0], parameterList[1]);

        },
        failure: function(err){
            console.log("An error occurred.");
            showToast("<p style:'font-size:24px;'>An error occurred.</p>", "error");
        }
    });
}

function getToastParameter(data){
    toastMessage = "<p style:'font-size:24px;'>"+ data['message']+"</p>";
    toastIcon = "success";
    if (data['success'] === 'false'){
//        toastMessage = "<p style:'font-size:24px;'>"+ data['message']+"</p>";
        toastIcon = "error";
    }
    return [toastMessage, toastIcon];
}

function clearInputField(id_list){
    for( let id of id_list){
        $(id).val("");
    }
}


function showToast(toastMessage, toastIcon){
    $.toast({
        text: toastMessage, // Text that is to be shown in the toast
        icon: toastIcon, // Type of toast icon
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'bottom-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
        //textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: false,  // Whether to show loader or not. True by default
        //loaderBg: '#9EC600',  // Background color of the toast loader`
    });
}