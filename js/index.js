// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты. Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.
// Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате XX:XX:XX:XX. Количество дней может состоять из более чем двух цифр.

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

// Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.
/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));
// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

// Вариант без класса

// const setTimer = function (targetDate) {
//   const dayValue = document.querySelector('[data-value=days]');
//   const hoursValue = document.querySelector('[data-value=hours]');
//   const minsValue = document.querySelector('[data-value=mins]');
//   const secsValue = document.querySelector('[data-value=secs]');

//   const updateTime = function (time) {
//     const days = Math.floor(time / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//     const secs = Math.floor((time % (1000 * 60)) / 1000);

//     dayValue.textContent = String(days).padStart(2, '0');
//     hoursValue.textContent = String(hours).padStart(2, '0');
//     minsValue.textContent = String(mins).padStart(2, '0');
//     secsValue.textContent = String(secs).padStart(2, '0');
//   };

//   setInterval(() => {
//     let time = targetDate - Date.now();
//     updateTime(time);
//   }, 1000);
// };

// setTimer(new Date('Oct 26, 2069'));

// Вариант с классом

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this._refs = this._getRefs(selector);
    this.targetDate = targetDate;
  }

  _getRefs(root) {
    const refs = {};
    refs.dayValue = document.querySelector(`${root} [data-value="days"]`);
    refs.hoursValue = document.querySelector(`${root} [data-value=hours]`);
    refs.minsValue = document.querySelector(`${root} [data-value=mins]`);
    refs.secsValue = document.querySelector(`${root} [data-value=secs]`);
    return refs;
  }

  _updateTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this._refs.dayValue.textContent = String(days).padStart(2, '0');
    this._refs.hoursValue.textContent = String(hours).padStart(2, '0');
    this._refs.minsValue.textContent = String(mins).padStart(2, '0');
    this._refs.secsValue.textContent = String(secs).padStart(2, '0');
  }

  setTimer() {
    setInterval(() => {
      let time = this.targetDate - Date.now();
      this._updateTime(time);
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 22, 2020'),
});

timer.setTimer();
