<template>
    <v-app>
        <v-navigation-drawer
            fixed
            app
            v-model="showDrawer"
            :clipped="$vuetify.breakpoint.width > 1264"
        >
            <v-subheader>查询选项</v-subheader>
            <v-list class="menu-list">
                <v-list-tile
                    class="menu-list-item"
                    :class="{ 'is-active': item.isActive }"
                    v-for="item in menuItems"
                    :key="item.title"
                    @click="onMenuItemClicked_(item.route)"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon
                large
                v-if="$vuetify.breakpoint.width <= 1264"
                @click="showDrawer = !showDrawer"
            >
            </v-toolbar-side-icon>
            <span class="title">{{ toolbarTitle }}</span>
        </v-toolbar>
        <v-content>
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </v-content>
    </v-app>
</template>

<script>
    import router from '../router';
    export default {
        data: () => ({
            showDrawer: true,
            menuItems: [
                { title: '实时查询', icon: 'query_builder', route: '/real_time', isActive: true },
                { title: '换乘', icon: 'directions_bus', route: '/bus_change', isActive: false },
                { title: '站点查询', icon: 'place', route: '/bus_station', isActive: false }
            ],
            currentRoute: 'real_time'
        }),
        computed: {
            toolbarTitle: function() {
                const selectedMenuItem = this.menuItems.find(item => item.route === this.currentRoute);
                return selectedMenuItem ? selectedMenuItem.title : '公交查询';
            }
        },
        created: function() {
        },
        methods: {
            onMenuItemClicked_: function(route) {
                const lastIndex = this.menuItems.findIndex(item => item.route === this.currentRoute),
                      currentIndex = this.menuItems.findIndex(item => item.route === route);
                lastIndex > -1 && this.$set(this.menuItems, lastIndex, {...this.menuItems[lastIndex], isActive: false});
                currentIndex > -1 && this.$set(this.menuItems, currentIndex, {...this.menuItems[currentIndex], isActive: true});

                this.currentRoute = route;
                router.push(route);
            }
        }
    }
</script>

<style scoped>
    .menu-list-item.is-active {
        position: relative;
    }
    .menu-list-item.is-active::before {
        content: '';
        width: 8px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.12);
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

