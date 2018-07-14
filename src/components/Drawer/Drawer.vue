<template>
    <div :class="wrapperClassName" ref="container" v-if="!getContainer">
        <div :class="[`${prefixCls}`, `${prefixCls}-${placement}`, (this.firstEnter ? getOpen() : false) ? `${prefixCls}-open` : '', !!className ? `${className}` : '']" :style="_style" ref="wrapper" @transitionEnd="onWrapperTransitionEnd">
            <div
                :class="`${prefixCls}-mask`"
                @click="onMaskClick"
                :style="maskStyle"
                ref="mask"
                v-if="showMask">
            </div>
            <div :class="`${prefixCls}-content-wrapper`" :style="[ openFlag ? {} : { transform: `${placementName}(${placementPos})`} ]">
                <div :class="`${prefixCls}-content`" ref="context">
                    <slot></slot>
                </div>
                <div class="drawer-handle" @click="handleClick" ref="handler">
                    <i class="drawer-handle-icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint vue/no-reserved-keys: 0 */
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import some from 'lodash/some'
import keys from 'lodash/keys'
import forEach from 'lodash/forEach'

import { dataToArray, transitionEnd, addEventListener, removeEventListener, transformArguments } from './utils'
import getScrollBarSize from './getScrollBarSize'

const currentDrawer = {};
const windowIsUndefined = typeof window === 'undefined';

export default  {
    props: {
        wrapperClassName: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        },
        _style: {
            type: Object,
            default () {
                return {}
            }
        },
        defaultOpen: {
            type: Boolean,
            default: false
        },
        open: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            type: String,
            default: 'drawer'
        },
        placement: {
            type: String,
            default: 'left'
        },
        level: {
            type: [String, Array],
            default: 'all'
        },
        levelMove: {
            type: [Number, Function, Array]
        },
        ease: {
            type: String,
            default: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)'
        },
        duration: {
            type: String,
            default: '.3s'
        },
        getContainer: {
            type: [String, Function, Object, Boolean],
            default: 'body'
        },
        handler: {},
        onChange: {
            type: Function,
            default: () => {}
        },
        onMaskClick: {
            type: Function,
            default: () => {}
        },
        onHandleClick: {
            type: Function,
            default: () => {}
        },
        showMask: {
            type: Boolean,
            default: true
        },
        maskStyle: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            levelDom: [],
            contextDom: null,
            maskDom: null,
            handlerdom: null,
            mousePos: null,
            firstEnter: false,
            timeout: null,
            drawerId: Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9))).toString(16),
            _open: this.open !== undefined ? this.open : !!this.defaultOpen
        }
    },
    created () {
        currentDrawer[this.drawerId] = this._open;
    },
    mounted () {
        this.$nextTick(() => {
            this.container = this.$refs.container
            this.dom = this.$refs.wrapper
            this.maskDom = this.$refs.mask
            this.contextDom = this.$refs.context
            this.handlerdom = this.$refs.handler
        })
        if (!windowIsUndefined) {
            let passiveSupported = false;
            window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', {
                    get: () => {
                        passiveSupported = true;
                        return null;
                    },
                })
            );
            this.passive = passiveSupported ? { passive: false } : false;
        }
        const open = this.getOpen();
        if (this.handler || open) {
            this.getDefault();
            if (open) {
                this.isOpenChange = true;
            }
            this.forceUpdate();
        }
    },
    updated () {
        if (!this.firstEnter && this.container) {
            this.forceUpdate();
            this.firstEnter = true;
        }
    },
    beforeDestroy () {},
    computed: {
        openFlag () {
            return this.firstEnter ? this.getOpen() : false
        },
        placementName () {
            return `translate${this.placement === 'left' || this.placement === 'right' ? 'X' : 'Y'}`
        },
        placementPos () {
            const value = this.contextDom ? this.contextDom.getBoundingClientRect()[this.placement === 'left' ||
                this.placement === 'right' ? 'width' : 'height'
            ] : 0;
            const defaultValue = !this.contextDom ? '100%' : `${value}px`;
            return this.placement === 'left' || this.placement === 'top' ? `-${defaultValue}` : defaultValue;
        }
    },
    methods: {
        forceUpdate () {
            return this.$forceUpdate()
        },
        getOpen () {
            return this.open !== undefined ? this.open : this._open
        },
        removeStartHandler (e) {
            if (e.touches.length > 1) {
                return;
            }
            this.startPos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            }
        },
        removeMoveHandler (e) {
            if (e.changedTouches.length > 1) return
            const currentTarget = e.currentTarget;
            const differX = e.changedTouches[0].clientX - this.startPos.x;
            const differY = e.changedTouches[0].clientY - this.startPos.y;
            if (currentTarget === this.maskDom ||
            currentTarget === this.handlerdom ||
            (currentTarget === this.contextDom &&
                ((((currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight &&
                differY < 0) ||
                (currentTarget.scrollTop <= 0 && differY > 0)) &&
                Math.max(Math.abs(differX), Math.abs(differY)) === differY) ||
                (((currentTarget.scrollLeft + currentTarget.offsetWidth >= currentTarget.scrollWidth &&
                    differX < 0) ||
                    (currentTarget.scrollLeft <= 0 && differX > 0)) &&
                    Math.max(Math.abs(differX), Math.abs(differY)) === differX)))
            ) {
                e.preventDefault();
            }
        },
        trnasitionEnd (e) {
            removeEventListener(e.target, transitionEnd, this.trnasitionEnd);
            e.target.style.transition = '';
        },
        defaultGetContainer () {
            if (windowIsUndefined) {
                return null;
            }
            const container = document.createElement('div');
            this.parent && this.parent.appendChild(container);
            if (this.wrapperClassName) {
                container.className = this.wrapperClassName;
            }
            return container;
        },
        onMaskTouchEnd (e) {
            this.onMaskClick(e);
            this.onTouchEnd(e, true);
        },
        onIconTouchEnd (e) {
            this.onHandleClick(e);
            this.onTouchEnd(e);
        },
        onTouchEnd (e, close) {
            if (this.open !== undefined) return
            const open = close || this._open;
            this.isOpenChange = true;
            this._open = !open
        },
        onWrapperTransitionEnd () {
            this.dom.style.transition = '';
            if (!this._open && this.getCrrentDrawerSome()) {
                document.body.style.overflowX = '';
                this.maskDom.style.left = '';
                this.maskDom.style.width = '';
            }
        },
        getDefault () {
            this.getParentAndLevelDom();
            if (this.getContainer || this.parent) {
                this.container = this.defaultGetContainer();
            }
        },
        getCrrentDrawerSome () {
            return some(keys(currentDrawer), key => currentDrawer[key])
        },
        // getContainer () {
        //     return this.container;
        // },
        getParentAndLevelDom () {
            if (windowIsUndefined) return
            this.levelDom = [];
            if (this.getContainer) {
                if (isString(this.getContainer)) {
                    const dom = document.querySelectorAll(this.getContainer)[0];
                    this.parent = dom;
                }
                if (isFunction(this.getContainer)) {
                    this.parent = this.getContainer();
                }
                if (isPlainObject(this.getContainer) && this.getContainer instanceof window.HTMLElement) {
                    this.parent = this.getContainer;
                }
            }
            if (!this.getContainer && this.container) {
                this.parent = this.container.parentNode;
            }
            if (this.level === 'all') {
                const children = Array.prototype.slice.call(this.parent.children);
                forEach(children, child => {
                    if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child !== this.container) {
                        this.levelDom.push(child);
                    }
                })
            } else if (this.level) {
                forEach(dataToArray(this.level), key => {
                    forEach(document.querySelectorAll(key), item => {
                        this.levelDom.push(item);
                    });
                })
            }
        },
        setLevelDomTransform (open, openTransition, placementName, value) {
            const { placement, duration, ease } = this;
            if (!windowIsUndefined) {
                forEach(this.levelDom, dom => {
                    if (this.isOpenChange || openTransition) {
                    /* eslint no-param-reassign: "error" */
                        dom.style.transition = `transform ${duration} ${ease}`;
                        addEventListener(dom, transitionEnd, this.trnasitionEnd);
                        let levelValue = open ? value : 0;
                        if (this.levelMove) {
                            const $levelMove = transformArguments(this.levelMove, { target: dom, open });
                            levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
                        }
                        const placementPos = placement === 'left' || placement === 'top' ? levelValue : -levelValue;
                        dom.style.transform = placementPos ? `${placementName}(${placementPos}px)` : '';
                    }
                })

                // 处理 body 滚动
                const eventArray = ['touchstart'];
                const domArray = [document.body, this.maskDom, this.handlerdom, this.contextDom];
                const right = getScrollBarSize();
                const widthTransition = `width ${duration} ${ease}`;
                const trannsformTransition = `transform ${duration} ${ease}`;
                if (open && document.body.style.overflow !== 'hidden') {
                    document.body.style.overflow = 'hidden';
                    if (right) {
                        document.body.style.position = 'relative';
                        document.body.style.width = `calc(100% - ${right}px)`;
                        this.dom.style.transition = 'none';
                        switch (placement) {
                        case 'right':
                            this.dom.style.transform = `translateX(-${right}px)`;
                            break;
                        case 'top':
                        case 'bottom':
                            this.dom.style.width = `calc(100% - ${right}px)`;
                            break;
                        default:
                            break;
                        }
                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(() => {
                            this.dom.style.transition = `${trannsformTransition},${widthTransition}`;
                            this.dom.style.width = '';
                            this.dom.style.transform = '';
                        });
                    }
                    // 手机禁滚
                    if (document.body.addEventListener) {
                        forEach(domArray, (item, i) => {
                            if (!item) return
                            item.addEventListener(eventArray[i] || 'touchmove', i ? this.removeMoveHandler : this.removeStartHandler, this.passive);
                        })
                    }
                } else if (this.getCrrentDrawerSome()) {
                    document.body.style.overflow = '';
                    if ((this.isOpenChange || openTransition) && right) {
                        document.body.style.position = '';
                        document.body.style.width = '';
                        document.body.style.overflowX = 'hidden';
                        this.dom.style.transition = 'none';
                        switch (placement) {
                        case 'right': {
                            this.dom.style.transform = `translateX(${right}px)`;
                            this.maskDom.style.left = `-${right}px`;
                            this.maskDom.style.width = `calc(100% + ${right}px)`;
                            break;
                        }
                        case 'top':
                        case 'bottom': {
                            this.dom.style.width = `calc(100% + ${right}px)`;
                            break;
                        }
                        default:
                            break;
                        }
                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(() => {
                            this.dom.style.transition = `${trannsformTransition},${widthTransition}`;
                            this.dom.style.transform = '';
                            this.dom.style.width = '';
                        });
                    }
                    if (document.body.removeEventListener) {
                        forEach(domArray, (item, i) => {
                            if (!item) return
                            item.removeEventListener(eventArray[i] || 'touchmove', i ? this.removeMoveHandler : this.removeStartHandler, this.passive);
                        });
                    }
                }
            }

            if (this.onChange && this.isOpenChange && this.firstEnter) {
                this.onChange(open);
                this.isOpenChange = false;
            }
        },
        handleClick (e) {
            this.onIconTouchEnd(e)
        }
    }
}
</script>
<style lang="less" scoped src="./index.less"></style>
