const apiKey = 'ff6d54dab8b334e2ad30edd454852d9a';

async function fetchRaceSchedule() {
    try {
        const response = await fetch(`https://ergast.com/api/f1/current.json`);
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
    if (!races) {
        raceScheduleElement.innerHTML = '<p>Error fetching race schedule. Please try again later.</p>';
        return;
    }
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


displayRaceSchedule();
