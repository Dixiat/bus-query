<template>
    <v-layout column>
        <v-flex class="price-tag-container" xs-12>
            <h3 class="price-tag">￥{{selectedBusLineInfo.price}}</h3>
        </v-flex>
        <v-layout row>
            <v-flex id="from-station-name" class="station-name" d-flex xs-3>
                <h3>{{selectedBusLineInfo.fromStation}}</h3>
                <h4>STATION</h4>
            </v-flex>
            <v-flex id="to-station-name" class="icon-container" xs-6>
                <img class="icon" src="../images/bus.png" alt="bus">
            </v-flex>
            <v-flex class="station-name" d-flex xs-3>
                <h3>{{selectedBusLineInfo.toStation}}</h3>
                <h4>STATION</h4>
            </v-flex>
        </v-layout>
        <v-layout column>
            <v-layout row>
                <v-flex class="label-container" xs-3>
                    <span class="label">起始时间</span>
                </v-flex>
                <v-flex class="label-container" xs-3>
                    <span class="label">结束时间</span>
                </v-flex>
            </v-layout>
            <v-layout class="time-container" row>
                <v-flex class="time-label-container" xs-3>
                    <span class="time-label">{{selectedBusLineInfo.beginTime}}</span>
                </v-flex>
                <v-flex class="label-container" xs-1>
                    <span class="label">-></span>
                </v-flex>
                <v-flex class="time-label-container" xs-3>
                    <span class="time-label">{{selectedBusLineInfo.endTime}}</span>
                </v-flex>
            </v-layout>
        </v-layout>
        <bus-station-info-list :station-infos="realTimeStatus"></bus-station-info-list>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

    import BusStationInfoList from '../components/busStationInfoList';

    Vue.component(BusStationInfoList.name, BusStationInfoList);

    export default {
        computed: {
            ...mapState('realTimeQuery/', [
                'realTimeStatus'
            ]),
            ...mapGetters('realTimeQuery/', [
                'selectedBusLineInfo'
            ])
        }
    }
</script>

<style scoped>
    .price-tag-container {
        margin-top: 6px;
        text-align: center;
    }

    h2.price-tag {
        text-align: center;
    }

    .station-name {
        width: 30%;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .station-name > * {
        flex: 0 1 auto;
    }

    #from-station-name {
        align-items: flex-end;
    }

    #to-station-name {
        align-items: flex-start;
    }

    .icon-container {
        display: flex;
        justify-content: center;
    }

    img.icon {
        width: 80px;
        height: 80px;
        margin: 0 auto;
    }

    .time-container {
        border: 1px solid #000000;
        border-left: none;
        border-right: none;
        padding: 4px 0;
        margin-top: 4px;
    }

    .label-container, .time-label-container {
        text-align: center;
    }

    .time-container {
        position: relative;
    }

    .time-container .label-container {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
    }

    .time-label {
        font-weight: bold;
    }

</style>
