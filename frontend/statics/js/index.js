const getInterview = async () => {
    const url = 'http://localhost:5000/api/interview';
    try {
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

const setInterviews = async () => {
    const data = await getInterview();
    const interviewsList = document.getElementById('interviews');
    for (let item of data) {
        const date = document.createElement('p');
        date.textContent = "Date: " + item.date.slice(0,9);
        const starttime = document.createElement('p');
        starttime.textContent = "Time: " + item.starttime.slice(11,16) + " to " + item.endtime.slice(11,16);
        // const endtime = document.createElement('p');
        // endtime.textContent = item.endtime.slice(11,16);

        const adminList = document.createElement('ul');
        const participantList = document.createElement('ul');

        const adminHeading = document.createElement('p');
        adminHeading.textContent = "Interviewer List"

        for (let admin of item.admins) {
            const adm = document.createElement('li');
            adm.textContent = admin.name;
            adminList.appendChild(adm);
        }

        const participantHeading = document.createElement('p');
        participantHeading.textContent = "Participant List"

        for (let participant of item.participants) {
            const part = document.createElement('li');
            part.textContent = participant.name;
            participantList.appendChild(part);
        }

        const breakline = document.createElement('br')

        const editBtn = document.createElement('a');
        editBtn.setAttribute("class", "create-button")
        editBtn.textContent = 'Edit';
        editBtn.href = './editform.html';
        editBtn.onclick = () => localStorage['interviewID'] = item._id;

        const interview = document.createElement('div');
        interview.setAttribute("class", "single-interview");

        interview.appendChild(date);
        interview.appendChild(starttime);
        interview.appendChild(adminHeading)
        interview.appendChild(adminList);
        interview.appendChild(participantHeading)
        interview.appendChild(participantList);
        interview.appendChild(breakline)
        interview.appendChild(editBtn);

        interviewsList.appendChild(interview);
    }
}

setInterviews();