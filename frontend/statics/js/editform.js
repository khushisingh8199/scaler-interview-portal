var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;

const dateid = document.getElementById('date')
dateid.setAttribute("min", today)

const id = localStorage['interviewID'];

const fillAdminSelect = (data) => {
    let adminSelect = document.getElementById('admins');
    data.forEach((item) => {
        option = document.createElement('option');
        option.text = item.name;
        option.value = item._id;
        adminSelect.appendChild(option);
    });
}

const getAdmins = async () => {
    try {
        const url = 'http://localhost:5000/api/user/admins';
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
        const data = await res.json();
        console.log(data);
        fillAdminSelect(data);
    } catch (e) {
        console.log(e);
        window.location = './index.html';
    }
}

const fillParticipantsSelect = (data) =>{
    let participantSelect = document.getElementById('participants');
    data.forEach((item) =>{
        option = document.createElement('option')
        option.text = item.name;
        option.value = item._id;
        participantSelect.appendChild(option)
    });

}

const getParticipants = async () =>{
    try {
        const url = 'http://localhost:5000/api/user/participants';
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
        const data = await res.json();
        console.log(data);
        fillParticipantsSelect(data);
    } catch (e) {
        console.log(e);
        window.location = './index.html'
    }
}

const getInterview = async () => {
    try {
        const url = `http://localhost:5000/api/interview/${id}`;
        const res = await fetch (url, {
            method: 'get',
            mode: 'cors'
        });
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
        window.location = './index.html';
    }
}

const prefillForm = async () => {
    try {
        const data = await getInterview();
        console.log(data);
        document.getElementById('date').value = data.date.slice(0, 10);
        document.getElementById('starttime').value = data.starttime.slice(11, 16);
        document.getElementById('endtime').value = data.endtime.slice(11, 16);
        for (let option of document.getElementById('admins').options) {
            if (data.admins.includes(option.value))
                option.selected = true;
        }
        for (let option of document.getElementById('participants').options) {
            if (data.participants.includes(option.value))
                option.selected = true;
        }
    } catch (e) {
        console.log(e);
        window.location = './index.html'
    }
}

const getSelectedValues = (el) => {
    let selected = [];
    for (let option of el.options)
        if (option.selected) selected.push(option.value);
    return selected;
}

const handleSubmit = async () => {
    const date = document.getElementById('date').value;
    
    const starttimeinput = document.getElementById('starttime').value;
    let hrs = starttimeinput.slice(0, 2);
    let mins = starttimeinput.slice(3);
    const starttime = new Date(date).setHours(hrs, mins);

    const endtimeinput = document.getElementById('endtime').value;
    hrs = endtimeinput.slice(0, 2);
    mins = endtimeinput.slice(3);
    const endtime = new Date(date).setHours(hrs, mins);


    const admins = getSelectedValues(document.getElementById('admins'));
    const participants = getSelectedValues(document.getElementById('participants'));

    const body = {
        date,
        starttime,
        endtime,
        admins,
        participants
    };

    try {
        const url = `http://localhost:5000/api/interview/${id}`
        const res = await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            crossDomain: true
        });
        const data = await res.json();
        console.log(data);
        if (data.message) alert(data.message);
        window.location = './index.html';
    } catch (e) {
        console.log(e);
        window.location = './index.html';
    }
}

const main = async () => {
    await getParticipants();
    await getAdmins();
    await prefillForm();
    document.getElementById('submit').onclick = async (e) => {
        e.preventDefault();
        await handleSubmit();
    }
}

main();