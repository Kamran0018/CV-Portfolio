fetch('https://formsubmit.co/ajax/mdkamran7506@gmail.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({ name: 'Test', email: 'test@example.com', message: 'test' })
}).then(r => r.text()).then(console.log).catch(console.error);
