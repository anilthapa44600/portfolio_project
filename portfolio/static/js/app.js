

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
    event.preventDefault();
    console.log('in subscribe-form')

    let data = {'email': this.elements[0].value}
    callAjax(this, data);
});

document.getElementById('message-form').addEventListener("submit", function(event){
    event.preventDefault();
    console.log('in message-form')
    let data = {'name': this.elements[0].value,
                'email': this.elements[1].value,
                'phone': this.elements[2].value,
                'message': this.elements[3].value
    }
    callAjax(this, data);

});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


//ajax code for submitting form data to server
function callAjax(formObject, data){
    let url_pattern = formObject.getAttribute('data-action')

    fetch(url_pattern, {
        method: 'POST',
        headers:{
            'Accept': 'application/json', //datatype expected from server
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json', //type of data sent to server
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) =>{
        parameterList = getToastParameter(data);
        showToast(parameterList[0], parameterList[1]);
    })
    .catch((err) => {
        console.log(err)
         showToast("<p style:'font-size:24px;'>An error occurred.</p>", "error");
        })

    formObject.reset()
}

function getToastParameter(data){
    toastMessage = "<p style:'font-size:24px;'>"+ data['message']+"</p>";
    toastIcon = "success";
    if (data['success'] === 'false'){
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
        loader: false,  // Whether to show loader or not. True by default
    });
}
