<template>
    <v-card class="info-container">
        <v-card-title class="info-container-title">
            <v-icon>location_on</v-icon>
            <span class="title" id="bus-station-name">{{stationName}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout column>
                <v-flex class="bus-info-container" xs-12 row>
                    <p class="text">停靠：</p>
                    <template v-for="(bus, index) in busListAtStation">
                        <v-chip :key="index" text-color="white" color="green" @click="bus.showLicensePlate = !bus.showLicensePlate">
                            <v-icon>directions_bus</v-icon>
                            <span v-show="bus.showLicensePlate" class="label license-plate">{{bus.licensePlate}}</span>
                        </v-chip>
                    </template>
                    <p v-if="!busListAtStation.length" class="text tip">暂无</p>
                </v-flex>
                <v-flex class="bus-info-container" xs-12 row>
                    <p class="text">即将到站：</p>
                    <template v-for="(bus, index) in busListBeforeStation">
                        <v-chip :key="index" text-color="white" color="light-blue" @click="bus.showLicensePlate = !bus.showLicensePlate">
                            <v-icon>directions_bus</v-icon>
                            <span v-show="bus.showLicensePlate" class="label license-plate">{{bus.licensePlate}}</span>
                        </v-chip>
                    </template>
                    <p v-if="!busListBeforeStation.length" class="text tip">暂无</p>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'bus-station-info',
        props: ['stationName', 'busListAtStation', 'busListBeforeStation'],
    }
</script>

<style scoped>
    .info-container {
        margin: 10px 20px;
    }

    .info-container-title {
        padding: 8px;
    }

    .bus-info-container:not(:first-child) {
        margin-top: 4px;
    }

    p.text {
        margin: 0;
    }

    p.text.tip {
        text-align: center;
    }
</style>

