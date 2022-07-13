function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function send() {
    let form_firstname = document.getElementById("form_firstname").value;
    let form_lastname = document.getElementById("form_lastname").value;
    let form_email = document.getElementById("form_email").value;
    let form_message = document.getElementById("form_message").value;
    console.log('Firstname : ' + form_firstname);
    console.log('Lastname : ' + form_lastname);
    console.log('Email : ' + form_email);
    console.log('Message : ' + form_message);
    closeModal();
}

