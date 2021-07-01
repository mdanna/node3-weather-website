console.log('Client side javascript file is loaded.')

const weatherForm = document.querySelector('form');
const inputField = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const getForecast = (address) => {
    let promise = new Promise((resolve, reject) => {
        var url = "http://localhost:3000/weather?address=" + address;
        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    reject(data);
                } else {
                    resolve(data);
                }
            })
        });
    })
    return promise;
};

weatherForm.addEventListener('submit', (e) => {
    //avoid refreshing the page when clicking submit button
    e.preventDefault();
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    getForecast(inputField.value).then((data) => {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
    }).catch((data) => {
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
    });
});
