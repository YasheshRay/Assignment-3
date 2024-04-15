// Combined JavaScript file

// Server-side code
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch('http://ergast.com/api/f1/current.json');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});

// Client-side code
const apiKey = 'ff6d54dab8b334e2ad30edd454852d9a';

async function fetchRaceSchedule() {
    try {
        const response = await fetch(`http://ergast.com/api/f1/current.json`);
        const data = await response.json();
        return data.MRData.RaceTable.Races;
    } catch (error) {
        console.error('Error fetching race schedule:', error);
    }
}

async function displayRaceSchedule() {
    const raceScheduleElement = document.getElementById('raceSchedule');
    raceScheduleElement.innerHTML = '<h2>Race Schedule</h2>';

    const races = await fetchRaceSchedule();
    races.forEach(race => {
        const raceElement = document.createElement('div');
        raceElement.innerHTML = `
            <p>Race: ${race.raceName}</p>
            <p>Date: ${race.date}</p>
            <p>Time: ${race.time}</p>
            <hr>
        `;
        raceScheduleElement.appendChild(raceElement);
    });
}

// Client-side code execution
displayRaceSchedule();
