<template>
    <v-layout column>
        <v-flex xs-12>
            <v-subheader>搜索</v-subheader>
        </v-flex>
        <v-container class="section-container">
            <v-layout row>
                <v-flex class="query-input-container" xs-8>
                    <v-text-field
                        class="query-input"
                        label="路线"
                        prepend-icon="search"
                        v-model="query"
                        @input="getQueryResult_"
                        @focus="getQueryResult_"
                    >
                    </v-text-field>
                    <transition name="slide-fade" mode="in-out">
                        <v-list
                            v-if="showQueryResult"
                            class="query-input-result-list elevation-1"
                        >
                            <template
                                v-for="(result, index) in queryResults"
                            >
                                <v-list-tile
                                    ripple
                                    class="query-input-result"
                                    :key="result.id"
                                    @click="onQueryResultClicked_"
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ result.number }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ result.direction }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider v-if="index + 1 < queryResults.length"></v-divider>
                            </template>
                        </v-list>
                    </transition>
                    <div class="mask" v-if="showQueryResult" @click="onMaskClicked_"></div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-flex xs-12>
            <v-subheader>历史记录</v-subheader>
        </v-flex>
        <v-container>
            <v-list class="query-history-list">
                <v-list-tile
                    class="query-history-list-item"
                    v-for="item in historyItems"
                    :key="item.id"
                    @click="onHistoryItemClicked_"
                >
                    <v-list-tile-action>
                        <v-icon>directions_bus</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.number }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.direction }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-container>
    </v-layout>
</template>

<script>
    import router from '../router';
    import { getBusLineList } from '../api';

    export default {
        data: () => ({
            query: '',
            showQueryResult: false,
            queryResults: [
                { number: '1路', direction: '拱北 <-> 吉大' },
            ],
            historyItems: [
                { number: '1路', direction: '拱北 <-> 吉大' },
                { number: '1路', direction: '拱北 <-> 吉大' },
                { number: '1路', direction: '拱北 <-> 吉大' },
                { number: '1路', direction: '拱北 <-> 吉大' },
                { number: '1路', direction: '拱北 <-> 吉大' },
            ]
        }),
        created: function() {
            
        },
        methods: {
            onHistoryItemClicked_: function() {

            },
            onQueryResultClicked_: function() {
                router.push('/real_time/status');
            },
            onMaskClicked_: function() {
                this.showQueryResult = false;
            },
            getQueryResult_: async function(event) {
                if (!this.query) {
                    this.showQueryResult = false;
                    return;
                }
                const queryResult = await getBusLineList(this.query);
                if (queryResult && !queryResult.error) {
                    const { data, flag } = queryResult.data;
                    if (data && flag !== 1004) {
                        this.queryResults = data.map(line => {
                            return { id: line.Id, number: line.LineNumber, direction: `${line.FromStation} -> ${line.ToStation}` }
                        });
                    } else {
                        this.queryResults = [];
                    }
                } else {
                    this.queryResults = [];
                }
                this.showQueryResult = !!this.queryResults.length;
            }
        }
    }
</script>

<style scoped>
    .section-container {
        padding-top: 0;
        padding-bottom: 0;
    }

    .query-input {
        /* padding-left: 8px;
        padding-right: 8px; */
    }

    .query-input-container {
        position: relative;
    }

    .query-input-result-list {
        width: 100%;
        position: absolute;
        bottom: -90px;
        z-index: 3;
    }

    .query-input-result {
        
    }

    .mask {
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
    }
</style>

