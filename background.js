'use strict';

const l = console.log;

const DEFAULT_DETECTION_INTERVAL = 60; // seconds

let idleStartMoment;

chrome.idle.onStateChanged.addListener(function(newState) {
  l('idle.onStateChanged()', Date(), newState);

  switch(newState) {
    case chrome.idle.IdleState.IDLE:
      idleStartMoment = Date.now() - DEFAULT_DETECTION_INTERVAL * 1_000;
    break;

    case chrome.idle.IdleState.LOCKED:
      idleStartMoment = Date.now();
    break;

    case chrome.idle.IdleState.ACTIVE:
      const idleTime = Date.now() - idleStartMoment;
      const idleTimeFormatted = new Date(idleTime).toJSON().slice(11, -5);
      l(idleTime, idleTimeFormatted);

      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'time 48.png',
        title: 'Idle time',
        message: idleTimeFormatted,
      });
    break;
  };
});
