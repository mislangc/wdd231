const currentUrl = window.location.href;

const everything = currentUrl.split('?');
let formData = everything[1].split('&');


function show(data) {
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split('=')[1].replace("%40", "@");
            result = result.replaceAll("%2F", "/");
            result = result.replaceAll("+", " ");
        }
    })
    return result;
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
    <p>Name: ${show("fname")} ${show("lname")}</p>
    <p>Mobile Number: ${show("phonenum")}</p>
     <p>Email: ${show("email")}</p>
      <p>Business Name: ${show("orgname")}</p>
    <p>Application Date: ${show("timestamp")}</p>
`;

