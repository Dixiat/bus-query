/* import modules */
import axios from 'axios';

/* api instance */
const busQueryInstance = axios.create({
    timeout: 1000,
});

/* bus query api */

// get bus line list
export const getBusLineList = query => {
    const key = encodeURIComponent(query),
          timestamp = Date.now();
    return busQueryInstance.post('/real_time/bus_line_list', { key })
            .then(response => {
                return { data: response.data, error: null };
            })
            .catch(error => {
                return { data: null, error };
            });
    };