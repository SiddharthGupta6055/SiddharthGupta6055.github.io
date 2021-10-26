function init() {
    let timezoneSelector = document.querySelector('#tz-datalist');
    tzDatabase.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.innerText = element;
        timezoneSelector.appendChild(option);
    });
}

function handleTimeZoneSelectorChange(tzSelector) {
    let matchedTimeZone = tzDatabase.filter((timezone) => {
        if (timezone.toLowerCase().includes(tzSelector.value.toLowerCase())) {
            return timezone;
        }
    });
    console.log(matchedTimeZone);
}

function handleCheckOnclick() {
    let selectedDateTime = document.querySelector('input.date-holder').value;
    let selectedTz = document.querySelector('input.timezone-selector').value;
    console.log(fetchDesiredTime({
        selectedTz: selectedTz,
        selectedDateTime: selectedDateTime
    }));
}

function handleTimeSlotCheck() {
    const org = document.querySelector('input.org-selector').value;
    let targettz = '';
    switch (org) {
        case 'RWCS US':
            targettz = 'CST6CDT';
            break;
        case 'RWCS Canada':
            targettz = 'CST6CDT';
            break;
        case 'RWCS Portugal':
            targettz = 'Europe/Lisbon';
            break;
        case 'RWCS-SID Spain':
            targettz = 'Europe/Madrid';
            break;
        case 'RWCS UK':
            targettz = 'Europe/London';
            break;
        case 'Shred-It':
            targettz = 'CST6CDT';
            break;
        default:
            break;
    }
    console.log(targettz);
    let actualStartDateTime=`${document.querySelector('input.deploy-date-holder').value} 07:00 PM`;
    let actualEndDateTime=`${document.querySelector('input.deploy-date-holder').value} 07:00 AM`;
    console.log(fetchDesiredTime({selectedDateTime:actualStartDateTime,    selectedTz:targettz}),fetchDesiredTime({selectedDateTime:actualEndDateTime,    selectedTz:targettz}));
    let deploymentStartTime = fetchDesiredTime({selectedDateTime:fetchDesiredTime({selectedDateTime:actualStartDateTime,    selectedTz:targettz}),selectedTz:'Asia/Kolkata'});
    let deploymentEndTime = fetchDesiredTime({selectedDateTime:fetchDesiredTime({selectedDateTime:actualEndDateTime,    selectedTz:targettz}),selectedTz:'Asia/Kolkata'});

    console.log(`You can start deployment from ${deploymentStartTime} IST to ${deploymentEndTime} IST`);
    
}

function fetchDesiredTime(params) {
    console.log(params);
    return new Date(params.selectedDateTime).toLocaleString('en-US', {
        timeZone: params.selectedTz
    });
}