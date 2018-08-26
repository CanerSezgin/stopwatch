
function Stopwatch(){
    let minutes = 0; let seconds = 0; let milliseconds = 0;
    let startTime, running, duration = 0;
    this.start = function(){
        if(running){
            throw new Error('It has already started');
        }
        running = true;
        startTime = new Date().getTime();
        updatedTime = setInterval(() => {
             update(); 
        }, 10);
    }

    this.stop = function(){
        if(!running){
            throw new Error('It has already stopped');
        }
        running = false;
        clearInterval(updatedTime);
    }

    this.reset = function(){
        startTime = null;
        stopTime = null;
        running = false;
        duration = 0;
    }

    function update(){
        let instantTime = new Date().getTime();
        let ms = (instantTime - startTime);
        duration += ms;
        startTime = instantTime;

        milliseconds = parseInt((duration % 1000)/10);
        seconds = parseInt(duration / 1000); 
        minutes = parseInt(seconds/60);
        $('#min').html(checkDigits(minutes));
        $('#sec').html(checkDigits(seconds));
        $('#ms').html(checkDigits(milliseconds));

        // Seconds Progress Bars
        $('.box').eq(60-seconds).addClass('box2');

        // Milliseconds Progress Bar
        $('#msBox').css('width', milliseconds + '%'); 
          
    }

    function checkDigits(number){
        if(number < 10){
            return '0' + number;
        } else {
            return number;
        }
    }

    Object.defineProperty(this, 'duration', {
        get(){
            return duration;
        }
    });
}

const stopwatch = new Stopwatch();
$('#start-stop').on('click', ()=>{
    stopwatch.start();
})