import { randomInt } from "crypto";
import { Metric } from "./dataService";

let listeners: Array<Listener> = [];

const subscribe = (receiver: Listener) => {
    listeners.push(receiver);
    let interval = setInterval(() => {
        let download = randomInt(1000);
        receiver.receive({download: randomInt(1000), upload: randomInt(1000), experience: download > 600 ? 'good' : 'bad'});
    }, 1000);

    return () => {
        clearInterval(interval);
        listeners = listeners.filter(l => l != receiver);
    }
}



export interface Listener {
    receive: (metric: Metric) => void;
}

export const metricsEventSource = {
    subscribe
}