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
                                v-for="(line, index) in busLines"
                            >
                                <v-list-tile
                                    ripple
                                    class="query-input-result"
                                    source="Query"
                                    :key="line.id"
                                    @click.stop="getRealTimeStatus_(line.id, $event)"
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ line.number }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{ line.direction }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider :key="index" v-if="index + 1 < busLines.length"></v-divider>
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
        <v-container class="query-history-container">
            <span v-if="queryHistoryList.length < 1" class="label">记录为空</span>
            <v-list v-else class="query-history-list elevation-1">
                <template
                    v-for="(item, index) in queryHistoryList"
                >
                    <v-list-tile
                        ripple
                        class="query-history-list-item"
                        source="History"
                        :key="item.id"
                        @click="getRealTimeStatus_(item.id, $event)"
                    >
                        <v-list-tile-action>
                            <v-icon>directions_bus</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.number }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.direction }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="index" v-if="index + 1 < queryHistoryList.length"></v-divider>
                </template>
            </v-list>
        </v-container>
    </v-layout>
</template>

<script>
    import router from '../router';

    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
    import { CLEAR_QUERY_RESULT, SELECT_BUS_LINE, GOTO_SUB_PAGE, ADD_QUERY_HISTORY_ITEM } from '../store/mutationTypes';

    export default {
        data: () => ({
            query: '',
        }),
        created: function() {
            
        },
        computed: {
            ...mapState('realTimeQuery/',[
                'queryHistoryList',
            ]),
            ...mapGetters('realTimeQuery/',[
                'busLines',
                'showQueryResult'
            ])
        },
        methods: {
            getQueryResult_: function(event) {
                this.$store.dispatch('realTimeQuery/getQueryResult', this.query);
            },
            getRealTimeStatus_(id, event) {
                const source = event.currentTarget.querySelector('a').getAttribute('source');
                this.$store.dispatch(`realTimeQuery/getRealTimeStatusFrom${source}`, id);
                this.$store.commit('common/' + GOTO_SUB_PAGE);
                router.push('/real_time/status');
            },
            ...mapMutations('realTimeQuery/', {
                onMaskClicked_: CLEAR_QUERY_RESULT
            })
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
        top: calc(100% - 12px);
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

    .query-history-container .label {
        width: 100%;
        text-align: center;
        display: inline-block;
        color: #adadad;
    }
</style>

