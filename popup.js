/*
=================================================
LOGIC LINK
popup.js

Purpose:
Controls all popup functionality.

Current Features:

1. Save Participant ID
2. Display Participant ID
3. Start Session
4. Increment Session Number
5. Save Session Timestamp
6. Submit Independent Attempt
7. View Latest Saved Attempt

=================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    =================================================
    HTML ELEMENT REFERENCES
    =================================================

    Get elements from popup.html so we can
    interact with them using JavaScript.
    */

    const startButton =
        document.getElementById("startBtn");

    const saveParticipantBtn =
        document.getElementById("saveParticipantBtn");

    const participantInput =
        document.getElementById("participantInput");

    const participantDisplay =
        document.getElementById("participantDisplay");

    const studyStatus =
        document.getElementById("studyStatus");

    const sessionDisplay =
        document.getElementById("sessionDisplay");

    const timestampDisplay =
        document.getElementById("timestampDisplay");

    const attemptInput =
        document.getElementById("attemptInput");

    const submitAttemptBtn =
        document.getElementById("submitAttemptBtn");

    const viewAttemptBtn =
        document.getElementById("viewAttemptBtn");



    /*
    =================================================
    LOAD SAVED PARTICIPANT ID
    =================================================

    If participant id was saved previously,
    display it when popup opens.
    */

    const savedID =
        localStorage.getItem("participantID");

    if (savedID) {

        participantDisplay.textContent =
            savedID;

    }



    /*
    =================================================
    LOAD SAVED SESSION NUMBER
    =================================================

    If session number was previously saved,
    display it when popup opens.
    */

    const savedSession =
        localStorage.getItem("sessionNumber");

    if (savedSession) {

        sessionDisplay.textContent =
            savedSession;

    }



    /*
    =================================================
    LOAD SAVED TIMESTAMP
    =================================================

    If timestamp exists,
    display it when popup opens.
    */

    const savedTimestamp =
        localStorage.getItem("sessionTimestamp");

    if (savedTimestamp) {

        timestampDisplay.textContent =
            savedTimestamp;

    }



    /*
    =================================================
    SAVE PARTICIPANT ID BUTTON
    =================================================

    Saves participant ID such as:

    P001
    P002
    P003
    */

    saveParticipantBtn.addEventListener("click", () => {

        const participantID =
            participantInput.value.trim();

        /*
        Ignore blank values.
        */

        if (participantID === "") {

            alert(
                "Please enter a Participant ID."
            );

            return;

        }

        /*
        Save participant ID.
        */

        localStorage.setItem(
            "participantID",
            participantID
        );

        /*
        Update popup display.
        */

        participantDisplay.textContent =
            participantID;

        alert(
            "Participant ID saved."
        );

    });



    /*
    =================================================
    START SESSION BUTTON
    =================================================

    Each time participant clicks:

    Start Session

    We:

    1. Increase session count
    2. Save session count
    3. Create timestamp
    4. Save timestamp
    5. Update popup
    */

    startButton.addEventListener("click", () => {

        let sessionNumber =
            localStorage.getItem("sessionNumber");

        /*
        First session.
        */

        if (!sessionNumber) {

            sessionNumber = 1;

        }

        /*
        Returning user.
        */

        else {

            sessionNumber =
                parseInt(sessionNumber) + 1;

        }

        /*
        Save session.
        */

        localStorage.setItem(
            "sessionNumber",
            sessionNumber
        );

        /*
        Update display.
        */

        sessionDisplay.textContent =
            sessionNumber;

        /*
        Create timestamp.
        */

        const sessionTimestamp =
            new Date().toLocaleString();

        /*
        Save timestamp.
        */

        localStorage.setItem(
            "sessionTimestamp",
            sessionTimestamp
        );

        /*
        Update display.
        */

        timestampDisplay.textContent =
            sessionTimestamp;

        /*
        Update status.
        */

        studyStatus.textContent =
            "Session Started";

    });



    /*
    =================================================
    SUBMIT ATTEMPT BUTTON
    =================================================

    Save:

    - Participant ID
    - Session Number
    - Timestamp
    - Attempt Text
    - Attempt Length
    */

    submitAttemptBtn.addEventListener("click", () => {

        const userAttempt =
            attemptInput.value.trim();

        /*
        Prevent empty attempts.
        */

        if (userAttempt === "") {

            alert(
                "Please describe your approach before continuing."
            );

            return;

        }

        /*
        Retrieve study information.
        */

        const participantID =
            localStorage.getItem("participantID");

        const sessionNumber =
            localStorage.getItem("sessionNumber");

        const submissionTimestamp =
            new Date().toLocaleString();

        const attemptLength =
            userAttempt.length;

        /*
        Create attempt record.
        */

        const attemptRecord = {

            participantID: participantID,

            sessionNumber: sessionNumber,

            timestamp: submissionTimestamp,

            attemptText: userAttempt,

            attemptLength: attemptLength

        };

        /*
        Save attempt.
        */

        localStorage.setItem(
            "latestAttempt",
            JSON.stringify(attemptRecord)
        );

        console.log(
            "Attempt Saved:",
            attemptRecord
        );

        alert(
            "Attempt submitted successfully."
        );

    });



    /*
    =================================================
    VIEW LATEST ATTEMPT
    =================================================

    Temporary testing tool.

    Allows us to verify that
    attempt data is being saved.
    */

    viewAttemptBtn.addEventListener("click", () => {

        const latestAttempt =
            localStorage.getItem("latestAttempt");

        /*
        No attempt exists.
        */

        if (!latestAttempt) {

            alert(
                "No saved attempts found."
            );

            return;

        }

        /*
        Convert JSON string
        into JavaScript object.
        */

        const parsedAttempt =
            JSON.parse(latestAttempt);

        console.log(
            "Latest Attempt:",
            parsedAttempt
        );

        alert(
            "Latest attempt printed to console."
        );

    });

});