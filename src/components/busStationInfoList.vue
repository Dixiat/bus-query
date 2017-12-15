<template>
    <v-layout column>
        <template v-for="(info, index) in stationInfos">
            <bus-station-info
                :key="index"
                v-bind="info"
            ></bus-station-info>
        </template>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import BusStationInfo from './busStationInfo';

    Vue.component(BusStationInfo.name, BusStationInfo);

    export default {
        name: 'bus-station-info-list',
        props: ['stationInfos']
        // data: () => ({
        //     stationInfos: [{ stationName: '吉大', busListAtStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ], busListBeforeStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ]}, { stationName: '吉大', busListAtStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ], busListBeforeStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ]}, { stationName: '吉大', busListAtStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ], busListBeforeStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ]}, { stationName: '吉大', busListAtStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ], busListBeforeStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ]}, { stationName: '吉大', busListAtStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ], busListBeforeStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ]}, { stationName: '吉大', busListAtStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ], busListBeforeStation: [
        //         { showLicensePlate: true, licensePlate: '粤23424', id: 1 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 2 },
        //         { showLicensePlate: false, licensePlate: '粤23424', id: 3 },
        //     ]}]
        // })
    }
</script>

<style scoped>

</style>

