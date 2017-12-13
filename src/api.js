/* import modules */
import axios from 'axios';

/* api instance */
const busQueryInstance = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 1000,
});

/* bus query api */

// get bus line list
export const getBusLineList = query => {
    const key = encodeURIComponent(query),
          url = '/real_time/bus_line_list';

    return busQueryInstance.post(url, { key })
            .then(response => {
                if (response.data && !response.data.error)
                return response.data;
            })
            .catch(error => {
                console.error(`Request ${url} error:`, error);
            });
    };