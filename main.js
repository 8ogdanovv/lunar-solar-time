'use strict';

function getColorString(moonDay) {
  // Calculate the hue value based on the moon day
  const hue = moonDay * (360 / 30);

  // Calculate the transparency based on the moon day
  let transparency;
  if (moonDay <= 15) {
    transparency = 0.33 + (moonDay - 1) * (0.66 - 0.33) / 15;
  } else {
    transparency = 0.66 - (moonDay - 16) * (0.66 - 0.33) / 15;
  }

  // Create the HSL color string with the calculated values
  const colorString = `hsla(${hue}, 100%, 50%, ${transparency})`;

  return colorString;
}

const runWatch = () => {
  const seconds = '--seconds: -' + new Date().getSeconds() + 's';
  const minutes = '--minutes: -' + (
    new Date().getMinutes() * 60
    + new Date().getSeconds()
  ) + 's';
  const hours = '--hours: -' + (
    new Date().getHours() * 3600
    + new Date().getMinutes() * 60
    + new Date().getSeconds()
  ) + 's';
  document.querySelector('.watch__seconds-second').style = seconds;
  document.querySelector('.watch__minutes-minute').style = minutes;
  document.querySelector('.watch__hours-hour').style = hours;

  // Calculate the moon day and store it in a variable.
  const moonDay = getMoonDay();

  // Get the #lunar-day-angle element.
  const lunarDayAngle = document.querySelector('#lunar-day-angle');

  // Set the value of the custom property --moon-day.
  lunarDayAngle.style.setProperty('--moon-day', `${moonDay}`);

  // Apply the transform property directly based on moonDay.
  // lunarDayAngle.style.transform = `translate(50%, 0) rotate(calc(var(--moon-day) * 12deg))`;
}

const getMoonDay = () => {
  // Define the time of the new moon closest to 01.01.1970 in UTC time
  const newMoonTime = new Date('1970-01-07T20:35:50.73Z').getTime();
  // Define the length of a synodic month in milliseconds
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;
  // Define the current time in UTC time
  const now = new Date().getTime();
  // Calculate the time since the new moon closest to 01.01.1970
  const elapsedTime = now - newMoonTime;
  // Calculate the number of synodic months since the new moon closest to 01.01.1970
  const synodicMonths = elapsedTime / synodicMonth;
  // Calculate the number of days since the last new moon
  const daysSinceNewMoon = synodicMonths * 29.530588853;
  // Calculate the moon day
  const moonDay = Math.floor((daysSinceNewMoon % 29.530588853) + 1);

  return moonDay;
}

// const moonL_1_ABC = (X, Y) => {
//   return {
//     A: {
//       x: X / 2,
//       y: 0,
//     },
//     1: {
//       B: {
//         x: X * 0.99,
//         y: 0,
//       },
//       C: {
//         x: X * 0.96,
//         y: Y / 16,
//       }
//     },
//     2: {
//       B: {
//         x: X * 0.96,
//         y: Y / 16,
//       },
//       C: {
//         x: X * 0.929,
//         y: Y / 8,
//       }
//     },
//     3: {
//       B: {
//         x: X * 0.929,
//         y: Y / 8,
//       },
//       C: {
//         x: X * 0.899,
//         y: Y / 5.45,
//       }
//     },
//     4: {
//       B: {
//         x: X * 0.899,
//         y: Y / 5.45,
//       },
//       C: {
//         x: X * 0.865,
//         y: Y / 4,
//       }
//     },
//     5: {
//       B: {
//         x: X * 0.865,
//         y: Y / 4,
//       },
//       C: {
//         x: X * 0.835,
//         y: Y * 0.31,
//       }
//     },
//   }
// }

window.onload = () => {
  runWatch();
  const moonDay = getMoonDay();
  // document.querySelector('.moonAndSun').dataset.moonAndSun = `${moonDay}`;
  // document.querySelector('#lunar-day-angle').style.setProperty('--moon-day', `${moonDay}`);
  // document.querySelector('.moonAndSun').dataset.moonRandomColor = `${getColorString(moonDay)}`;

  // const drawMoonDay = (moonDay) => {
  //   const landscape = window.matchMedia('(orientation: landscape)').matches;
  //   const moonX = 1171;
  //   const moonY = 759;

  //   if (landscape) {
  //     const moon = document.getElementById("moon");
  //     const moonCtx = moon.getContext("2d");

  //     moon.width = moonX;
  //     moon.height = moonY;
  //     // moonCtx.clearRect(0, 0, moonX, moonY);

  //     if (moonDay !== 8 && moonDay !== 23) {
  //       const pointA = moonL_1_ABC(moonX, moonY).A;
  //       const pointB = moonL_1_ABC(moonX, moonY)[moonDay].B;
  //       const pointC = moonL_1_ABC(moonX, moonY)[moonDay].C;
  //       moonCtx.beginPath();
  //       moonCtx.moveTo(pointA.x, pointA.y);
  //       moonCtx.lineTo(pointB.x, pointB.y);
  //       moonCtx.lineTo(pointC.x, pointC.y);
  //       moonCtx.closePath();
  //       const colorString = getColorString(moonDay);
  //       moonCtx.fillStyle = colorString;
  //       moonCtx.fill();
  //       moonCtx.stroke();
  //     }
  //   }

  //   if (landscape && moonDay === 8) {
  //     const pointA = calculatePointA_L1_7(moonX, moonY);
  //     const pointB = calculatePointB_L8(pointA, moonY);
  //     const pointC = { x: moonX, y: moonY };
  //     const pointD = calculatePointD_L8(pointA, pointC, moonX);

  //     // Draw Triangle ABC
  //     moonCtx.beginPath();
  //     // moonCtx.moveTo(pointA.x, pointA.y);
  //     moonCtx.moveTo(pointB.x, pointB.y);
  //     // moonCtx.lineTo(pointB.x, pointB.y);
  //     moonCtx.lineTo(pointC.x, pointC.y);
  //     moonCtx.lineTo(pointA.x, pointA.y);
  //     moonCtx.closePath();

  //     const colorString = getColorString(moonDay);
  //     moonCtx.fillStyle = colorString;
  //     moonCtx.fill();
  //     moonCtx.stroke();

  //     // Draw Triangle ACD
  //     moonCtx.beginPath();
  //     moonCtx.moveTo(pointA.x, pointA.y);
  //     moonCtx.lineTo(pointC.x, pointC.y);
  //     moonCtx.lineTo(pointD.x, pointD.y);
  //     moonCtx.closePath();

  //     moonCtx.fillStyle = colorString;
  //     moonCtx.fill();
  //     moonCtx.stroke();
  //   }

  // }

  const resizeHandler = () => {
    // drawMoonDay(moonDay);
    console.log('resized');
  };

  window.addEventListener('resize', resizeHandler);
  window.addEventListener('orientationchange', resizeHandler);

  // drawMoonDay(moonDay);
};
