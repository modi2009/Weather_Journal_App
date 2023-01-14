
/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=67cc778ec67966c1215d7a04d5adab1f&units=metric";



let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);
// Create a new date instance dynamically with JS
// function of event listener
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getData(baseURL, zip, apiKey)
        .then(function (data) {
            console.log(data);
            postData('/add', { temp: data.main.temp, content: feelings, date: d })
            updateUI();

        })

};
// create function to get weather data 
const getData = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data;
        console.log(data);
    } catch (error) {
        console.log('error', error)
    }

};

// create Async postData
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
        console.log(newData);
    } catch (error) {
        console.log("error", error);
    };
};


const updateUI = async () => {
    const req = await fetch('/all')
    try {
        const allData = await req.json()
        console.log(allData);
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log(error);
    }
};