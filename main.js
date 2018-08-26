
function Stopwatch(){
    let minutes = 0; let seconds = 0; let milliseconds = 0; minCheck = 0;
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
        if(running) {
            this.stop();
        }
        startTime = null;
        stopTime = null;
        running = false;
        duration = 0;
        $('#min').html('00');
        $('#sec').html('00');
        $('#ms').html('00');
        $('.box').removeClass('box2');
        $('#msBox').css('width', 0 + '%'); 
        $('#start-stop').html('START');
    }

    function update(){
        let instantTime = new Date().getTime();
        let ms = (instantTime - startTime);
        duration += ms;
        startTime = instantTime;

        milliseconds = parseInt((duration % 1000)/10);
        seconds = parseInt(duration / 1000) % 60; 
        minutes = parseInt(duration / 1000 / 60);
        if(minCheck < minutes ) {
            $('.box').removeClass('box2');
        }
        minCheck = minutes

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

    Object.defineProperty(this, 'running', {
        get(){
            return running;
        }
    });
}

const stopwatch = new Stopwatch();
$('#start-stop').on('click', ()=>{
    if(!stopwatch.running){
        stopwatch.start();
        $('#start-stop').html('STOP');
    } else {
        stopwatch.stop();
        $('#start-stop').html('START');
    }
})

$('#reset').on('click', ()=>{
    stopwatch.reset();
})