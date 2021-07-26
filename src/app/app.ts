import { initServer } from "../server";
import cors from 'cors';
import { handlers } from "./handlers";
import { metricsEventSource } from "./data-service/eventSource";
import { dataService, Metric } from "./data-service/dataService";

const app = initServer(handlers());
app.use(cors());

const eventListener = () => {
    let count = 0;
    let metrics = [];
    const receive = (metric: Metric) => {
        metrics.push(metric);
        count++;
        if(count === 5) {
            dataService.storeDataPoints([...metrics]);
            metrics = [];
            count = 0;
        }
    }
    return {
        receive
    };
}

metricsEventSource.subscribe(eventListener());
