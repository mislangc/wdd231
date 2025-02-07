const currentUrl = window.location.href;

const everything = currentUrl.split('?');
let formData = everything[1].split('&');


function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1].replace("%40", "@");
            result = result.replaceAll("+", " ");
        }
    })
    return result;
}

const showInfo = document.querySelector('#thank-you');
showInfo.innerHTML = `
    <p><strong>Name:</strong> ${show("name")}</p>
     <p><strong>Email</strong>: ${show("email")}</p>
      <p><strong>Message</strong>: ${show("message")}</p>
`;

