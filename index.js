const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.onTick = onTick;
    };

    start() {
        const targetDate = this.targetDate;
        const timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetDate - currentTime;
            if (deltaTime <= 0) {
                clearInterval(timerId);
            };
            
            const time = this.getTimeComponent(deltaTime);
            this.onTick(time);
        }, 1000)
    };

    getTimeComponent(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),);
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        
        return { days, hours, mins, secs };
    };

    pad(value) {
    return String(value).padStart(2, '0');
  }
};

function updateClock({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
};


const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Dec 17, 2022'),
    onTick: updateClock,
});

timer.start();
