document.querySelector("#contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.querySelector('.error-message').style.display = 'none';
    document.querySelector('.sent-message').style.display = 'none';
    document.querySelector('.loading').style.display = 'block';

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (!message.trim()) {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.error-message').innerText = "Message cannot be empty.";
        document.querySelector('.error-message').style.display = 'block';
        return;
    }

    const token = '7774757606:AAG5qHwkfi4pl01fsMy6rmIPwR_DWkZpadQ';
    const chat_id = '1068668998';

    const text = `
👤 Name: ${name}
📧 Email: ${email}
📌 Subject: ${subject}
💬 Message: ${message}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: text,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error sending');
            }
            return response.json();
        })
        .then(data => {
            document.querySelector('.loading').style.display = 'none';
            if (data.ok) {
                document.querySelector('.sent-message').style.display = 'block';
                document.querySelector("#contactForm").reset();
            } else {
                document.querySelector('.error-message').innerText = `Error sending: ${data.description}`;
                document.querySelector('.error-message').style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.error-message').innerText = "Connection error. Please try again later.";
            document.querySelector('.error-message').style.display = 'block';
        });
});