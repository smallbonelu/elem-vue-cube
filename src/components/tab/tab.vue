<template>
    <div class="tab">
        <cube-tab-bar show-slider v-model="selectedLabel" :data="tabs" :useTransition="false" ref="tabbar"></cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide ref="slide" :data="tabs" :initial-index="index" :show-dots="false" @change="changePage" :loop="false" :auto-play="false" :options="slideOptions" @scroll="scroll">
                <cube-slide-item v-for="(tab, index) in tabs" :key="index">
                    <component :is="tab.component" :data="tab.data" ref="component"></component>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tab',
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        initialIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            index: this.initialIndex,
            slideOptions: {
                listenScroll: true,
                probeType: 3,
                directionLockThreshold: 0,
                eventPassthrough: 'vertical'
            }
        }
    },
    computed: {
        selectedLabel: {
            get() {
                return this.tabs[this.index].label
            },
            set(newVal) {
                this.index = this.tabs.findIndex((value) => {
                    return value.label === newVal
                })
            }
        }
    },
    mounted() {
        this.changePage(this.index)
    },
    methods: {
        changePage(current) {
            this.index = current
            const component = this.$refs.component[current]
            if (component && component.fetch) {
                component.fetch()
            }
        },
        scroll(pos) {
            const tabbarWidth = this.$refs.tabbar.$el.clientWidth
            const slideWidth = this.$refs.slide.slide.scrollerWidth
            const transform = -pos.x / slideWidth * tabbarWidth

            this.$refs.tabbar.setSliderTransform(transform)
        }
    }
}
</script>

<style lang="stylus" scoped>
.tab {
    display: flex;
    flex-direction: column;
    height: 100%;

    >>> .cube-tab {
        padding: 10px 0;
    }

    .slide-wrapper {
        flex: 1;
        overflow: hidden;
    }
}
</style>