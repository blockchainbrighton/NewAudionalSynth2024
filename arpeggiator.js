// arpeggiator.js
        let isArpeggiatorOn = false;
        let arpNotes = [];
        
        let currentArpIndex = 0;
        let arpTimeout = null;
        let nudgeApplied = false;
        let isNudgeActive = false;

       

      // arpControl.js
        function startArpeggiator(){
            isArpeggiatorOn = true;
            playArpNotes();
        }
        function playArpeggiator(){
            startArpeggiator();
        }
        function stopArpeggiator(){
            isArpeggiatorOn = false;
            arpNotes.length = 0;
        }

  

        function applySpeedModifier(baseInterval) {
            let speed = document.getElementById("arpSpeed").value;

            switch(speed) {
                case 'normal':
                    return baseInterval;
                case 'double-time':
                    return baseInterval / 2;
                case 'half-time':
                    return baseInterval * 2;
                case 'quadruple-time':
                    return baseInterval / 4;
                case 'octuple-time':
                    return baseInterval / 8;
                default:
                    console.error("Unknown speed setting:", speed);
                    return baseInterval;
            }
        }


        function incrementArpIndex() {
            currentArpIndex = (currentArpIndex + 1) % arpNotes.length;  // Wrap around
        }

        function decrementArpIndex() {
            currentArpIndex = (currentArpIndex - 1 + arpNotes.length) % arpNotes.length;  // Wrap around, but in reverse
        }

        function randomizeArpIndex() {
            currentArpIndex = Math.floor(Math.random() * arpNotes.length);  // Random index
        }

        // Additional Pattern Functions
        let goingUp = true;

        function upDownArpIndex() {
            if (goingUp) {
                incrementArpIndex();
                if (currentArpIndex === arpNotes.length - 1) {
                    goingUp = false;
                }
            } else {
                decrementArpIndex();
                if (currentArpIndex === 0) {
                    goingUp = true;
                }
            }
        }

        function doubleStepArpIndex() {
            currentArpIndex = (currentArpIndex + 2) % arpNotes.length;
        }

        function randomWithRestsArpIndex() {
            if (Math.random() > 0.8) { // 20% chance of rest
                return;
            }
            randomizeArpIndex();
        }


        function pauseArpeggiator() {
            clearTimeout(arpTimeout);  // Clear the timeout to stop the arpeggiator
            isArpeggiatorOn = false;
        }

        function resetTimingAdjust() {
            document.getElementById("timingAdjust").value = 0;
        }


        

        // arpToggle.js
        function toggleArpeggiator(){
            const btn = document.getElementById("arpToggle");
            if(isArpeggiatorOn){
                btn.innerText = "Start Arpeggiator";
                stopArpeggiator();
            } else {
                btn.innerText = "Stop Arpeggiator";
                startArpeggiator();
            }
        }
       