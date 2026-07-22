/* @ts-self-types="./basic_js.d.ts" */

/**
 * Handle to a mounted rs-grid instance, usable from JS.
 */
export class JsGrid {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JsGridFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsgrid_free(ptr, 0);
    }
    /**
     * Remove all active filters.
     */
    clear_filters() {
        wasm.jsgrid_clear_filters(this.__wbg_ptr);
    }
    /**
     * Detach event listeners and clean up.
     */
    detach() {
        wasm.jsgrid_detach(this.__wbg_ptr);
    }
    /**
     * Export edited cell patches as a TSV string.
     * @returns {string}
     */
    export_patches() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.jsgrid_export_patches(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Import cell patches from a TSV string.
     * @param {string} data
     */
    import_patches(data) {
        const ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.jsgrid_import_patches(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Mount a new grid on `canvas` with `row_count` rows
     * and `col_count` columns of fake data.
     *
     * Uses `f64` instead of `u64` to avoid JS `BigInt`.
     *
     * A persisted column layout (widths / order / pinned count) is restored
     * from `localStorage` before mount, and re-saved whenever the user
     * resizes, reorders, or pins/unpins a column.
     * @param {HTMLCanvasElement} canvas
     * @param {number} row_count
     * @param {number} col_count
     */
    constructor(canvas, row_count, col_count) {
        const ret = wasm.jsgrid_new(canvas, row_count, col_count);
        this.__wbg_ptr = ret;
        JsGridFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Clear the persisted column layout. The host page should reload the
     * page afterwards to rebuild the grid with its default layout.
     */
    reset_layout() {
        wasm.jsgrid_reset_layout(this.__wbg_ptr);
    }
    /**
     * Enable or disable drag-to-reorder of columns.
     * @param {boolean} on
     */
    set_column_reorderable(on) {
        wasm.jsgrid_set_column_reorderable(this.__wbg_ptr, on);
    }
    /**
     * Enable or disable in-place cell editing.
     * @param {boolean} on
     */
    set_editable(on) {
        wasm.jsgrid_set_editable(this.__wbg_ptr, on);
    }
    /**
     * Filter rows by text on a given column.
     * @param {string} col_key
     * @param {string} text
     */
    set_filter(col_key, text) {
        const ptr0 = passStringToWasm0(col_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.jsgrid_set_filter(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * Switch the UI locale by IETF language tag (e.g. `"fr"`, `"ja"`).
     * @param {string} tag
     */
    set_locale(tag) {
        const ptr0 = passStringToWasm0(tag, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.jsgrid_set_locale(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Bridge cell-button clicks to a JS callback.
     *
     * The callback is invoked as `cb(row, col_key, button_id)`.
     * @param {Function} cb
     */
    set_on_cell_button_click(cb) {
        wasm.jsgrid_set_on_cell_button_click(this.__wbg_ptr, cb);
    }
    /**
     * Bridge column-validation errors to a JS callback.
     *
     * The callback is invoked as `cb(row, col_key, error_message)`.
     * @param {Function} cb
     */
    set_on_validation_error(cb) {
        wasm.jsgrid_set_on_validation_error(this.__wbg_ptr, cb);
    }
    /**
     * Set the number of pinned (frozen) columns.
     * @param {number} count
     */
    set_pinned_count(count) {
        wasm.jsgrid_set_pinned_count(this.__wbg_ptr, count);
    }
    /**
     * Enable or disable cell / row / column selection.
     * @param {boolean} on
     */
    set_selectable(on) {
        wasm.jsgrid_set_selectable(this.__wbg_ptr, on);
    }
    /**
     * Re-read the CSS theme variables and apply them.
     */
    set_theme_from_css() {
        wasm.jsgrid_set_theme_from_css(this.__wbg_ptr);
    }
}
if (Symbol.dispose) JsGrid.prototype[Symbol.dispose] = JsGrid.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_debug_string_c25d447a39f5578f: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_is_function_1ff95bcc5517c252: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_undefined_c05833b95a3cf397: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_number_get_394265ed1e1b84ee: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_b0ca35b86a603356: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_344f42d3211c4765: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_fffb441def202758: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_activeElement_4bc99dc1a7094c27: function(arg0) {
            const ret = arg0.activeElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_addEventListener_520e749bbae24529: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_addEventListener_d85450ee1320c989: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_appendChild_f553e8704c4f14a6: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.appendChild(arg1);
            return ret;
        }, arguments); },
        __wbg_arcTo_6d4ffb0b356f8a23: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.arcTo(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_beginPath_ca2dfce389ff20d2: function(arg0) {
            arg0.beginPath();
        },
        __wbg_body_40ec34e0a2931fe8: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_bottom_e6ed49b80d965dae: function(arg0) {
            const ret = arg0.bottom;
            return ret;
        },
        __wbg_button_f6a9a7b725f1838e: function(arg0) {
            const ret = arg0.button;
            return ret;
        },
        __wbg_call_44b7209e1e252e6a: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.call(arg1, arg2, arg3, arg4);
            return ret;
        }, arguments); },
        __wbg_clearInterval_2e2069e95ad09d4f: function(arg0, arg1) {
            arg0.clearInterval(arg1);
        },
        __wbg_clearRect_520d2bbc2437bfaa: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearRect(arg1, arg2, arg3, arg4);
        },
        __wbg_clearTimeout_8f80437be2324e09: function(arg0, arg1) {
            arg0.clearTimeout(arg1);
        },
        __wbg_clientHeight_994541cde34d3ca0: function(arg0) {
            const ret = arg0.clientHeight;
            return ret;
        },
        __wbg_clientWidth_6852617da948be39: function(arg0) {
            const ret = arg0.clientWidth;
            return ret;
        },
        __wbg_clientX_a7dcb4081126cd4b: function(arg0) {
            const ret = arg0.clientX;
            return ret;
        },
        __wbg_clientY_c0560910b20ee192: function(arg0) {
            const ret = arg0.clientY;
            return ret;
        },
        __wbg_clip_26d9280631a1d13e: function(arg0) {
            arg0.clip();
        },
        __wbg_clipboardData_b99e24e2d915217c: function(arg0) {
            const ret = arg0.clipboardData;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_clipboard_cc7335fcba1a9a80: function(arg0) {
            const ret = arg0.clipboard;
            return ret;
        },
        __wbg_closePath_0e752092e41e1e22: function(arg0) {
            arg0.closePath();
        },
        __wbg_closest_d889c758da4bb13b: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.closest(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_createElement_fcbc0805de826d62: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_ctrlKey_2e52816fa7160097: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_deltaMode_d869228efd74f393: function(arg0) {
            const ret = arg0.deltaMode;
            return ret;
        },
        __wbg_deltaX_5d829ffba565ed10: function(arg0) {
            const ret = arg0.deltaX;
            return ret;
        },
        __wbg_deltaY_6cfce8f8da250c23: function(arg0) {
            const ret = arg0.deltaY;
            return ret;
        },
        __wbg_devicePixelRatio_1c0e0ed7deb19cd8: function(arg0) {
            const ret = arg0.devicePixelRatio;
            return ret;
        },
        __wbg_disconnect_39bfdcb35b1fc7b9: function(arg0) {
            arg0.disconnect();
        },
        __wbg_dispatchEvent_ca78eaf3d469bc25: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.dispatchEvent(arg1);
            return ret;
        }, arguments); },
        __wbg_documentElement_b7ec99417969bfbc: function(arg0) {
            const ret = arg0.documentElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_document_179650d6cb13c263: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_drawImage_e15261ac3a7625d8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawImage(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_execCommand_5f3a0091f07c38d9: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.execCommand(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_fetch_6ecc661950e58d49: function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        },
        __wbg_fillRect_97b1f503e30148c3: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.fillRect(arg1, arg2, arg3, arg4);
        },
        __wbg_fillText_e462ba58cec15054: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_fill_7e2406c195723006: function(arg0) {
            arg0.fill();
        },
        __wbg_focus_2f77051f98540625: function() { return handleError(function (arg0) {
            arg0.focus();
        }, arguments); },
        __wbg_getAttribute_5a601ba4718b922a: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.getAttribute(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getBoundingClientRect_e828e6c31c66dea6: function(arg0) {
            const ret = arg0.getBoundingClientRect();
            return ret;
        },
        __wbg_getComputedStyle_961681bdf7e518e8: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getComputedStyle(arg1);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_ca12bb65aab778a4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getData_fcb88fae21d94f1e: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getData(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getElementById_1cbd8f06dbe8eb8e: function(arg0, arg1, arg2) {
            const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getItem_b96269ddc16cf24a: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getItem(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getPropertyValue_dc6b061239dad6f1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_height_6eec812c213259a1: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_innerHeight_92315939e482496d: function() { return handleError(function (arg0) {
            const ret = arg0.innerHeight;
            return ret;
        }, arguments); },
        __wbg_instanceof_CanvasRenderingContext2d_2284b703b7023dcc: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CanvasRenderingContext2D;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Element_beebfaab75d12d9d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Element;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlDocument_af729c5486a6c5ae: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLDocument;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlElement_4493a09212d3586f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlImageElement_c3b307a1e52b41dd: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLImageElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlInputElement_ad3be04339d0e4df: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLInputElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlTextAreaElement_37795f65e16b7ed0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLTextAreaElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_c8b64b2256f01bec: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_05ba1ee4f6781663: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isSecureContext_d2e906a088ea2127: function(arg0) {
            const ret = arg0.isSecureContext;
            return ret;
        },
        __wbg_is_7b9d0b289033c7de: function(arg0, arg1) {
            const ret = Object.is(arg0, arg1);
            return ret;
        },
        __wbg_json_77bd792f9a4a3fe1: function() { return handleError(function (arg0) {
            const ret = arg0.json();
            return ret;
        }, arguments); },
        __wbg_key_803dca86cdcfa8dd: function(arg0, arg1) {
            const ret = arg1.key;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_language_4f09493ffb9388cd: function(arg0, arg1) {
            const ret = arg1.language;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_left_7e76a74d0db1754f: function(arg0) {
            const ret = arg0.left;
            return ret;
        },
        __wbg_lineTo_1aeefd30328165b5: function(arg0, arg1, arg2) {
            arg0.lineTo(arg1, arg2);
        },
        __wbg_localStorage_5bf6ce3f8e51412a: function() { return handleError(function (arg0) {
            const ret = arg0.localStorage;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_measureText_c54a480a20a73a31: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.measureText(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_metaKey_d961c7572a9f84f5: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_moveTo_2618bed6b5b25622: function(arg0, arg1, arg2) {
            arg0.moveTo(arg1, arg2);
        },
        __wbg_naturalHeight_90457615c5238136: function(arg0) {
            const ret = arg0.naturalHeight;
            return ret;
        },
        __wbg_naturalWidth_62a7409ab6dd9e9a: function(arg0) {
            const ret = arg0.naturalWidth;
            return ret;
        },
        __wbg_navigator_99621db14b3f1099: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_5394f65338077341: function() { return handleError(function (arg0) {
            const ret = new ResizeObserver(arg0);
            return ret;
        }, arguments); },
        __wbg_new_da52cf8fe3429cb2: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_with_mouse_event_init_dict_123a7a731b19ec5c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new MouseEvent(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_str_and_init_d95cbe11ce28e65e: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_now_390768da5ee9e776: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_observe_f27242eadc2ebd47: function(arg0, arg1) {
            arg0.observe(arg1);
        },
        __wbg_offsetHeight_242135c11b7fdaec: function(arg0) {
            const ret = arg0.offsetHeight;
            return ret;
        },
        __wbg_offsetTop_eb7a93213506ba96: function(arg0) {
            const ret = arg0.offsetTop;
            return ret;
        },
        __wbg_offsetWidth_f7d4d93df1ead153: function(arg0) {
            const ret = arg0.offsetWidth;
            return ret;
        },
        __wbg_performance_3ef602e13d6c3b56: function(arg0) {
            const ret = arg0.performance;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_preventDefault_b64888c857500682: function(arg0) {
            arg0.preventDefault();
        },
        __wbg_queueMicrotask_0ab5b2d2393e99b9: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_queueMicrotask_6a09b7bc46549209: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_readText_5333f03788da6d4c: function(arg0) {
            const ret = arg0.readText();
            return ret;
        },
        __wbg_rect_cbf18d19ffd5b10a: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.rect(arg1, arg2, arg3, arg4);
        },
        __wbg_removeAttribute_1e7d2c409776d836: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.removeAttribute(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_removeEventListener_a3f23c70077bdcc1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_removeItem_78e03a38da96e0ae: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.removeItem(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_removeProperty_70da952bc1b493fa: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_remove_ce1b54059317fe8a: function(arg0) {
            arg0.remove();
        },
        __wbg_requestAnimationFrame_1a85deeab66448c2: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.requestAnimationFrame(arg1);
            return ret;
        }, arguments); },
        __wbg_resolve_2191a4dfe481c25b: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_restore_ab535bc88702bcc0: function(arg0) {
            arg0.restore();
        },
        __wbg_right_36c53e00496f4f0a: function(arg0) {
            const ret = arg0.right;
            return ret;
        },
        __wbg_save_cd0bc920468bfe2c: function(arg0) {
            arg0.save();
        },
        __wbg_scale_c1f36b23e39bf061: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.scale(arg1, arg2);
        }, arguments); },
        __wbg_scrollTop_dc5ff575e4a53628: function(arg0) {
            const ret = arg0.scrollTop;
            return ret;
        },
        __wbg_select_04bad0c19af24ed1: function(arg0) {
            arg0.select();
        },
        __wbg_select_439dea2335b9e472: function(arg0) {
            arg0.select();
        },
        __wbg_setAttribute_71039043be82d098: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setData_19a2f9f5b313cbd6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setData(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setInterval_93ec7461c3650c76: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setInterval(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setItem_364a11cf21db9039: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setItem(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setProperty_e4e51b1b1d681d15: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setTimeout_cfa2cf195c3738db: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_8535240470bf2500: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_bubbles_c0cabd3e4b5b19b9: function(arg0, arg1) {
            arg0.bubbles = arg1 !== 0;
        },
        __wbg_set_button_ccef03e2594e8e7f: function(arg0, arg1) {
            arg0.button = arg1;
        },
        __wbg_set_cancelable_d2a646eb01607da2: function(arg0, arg1) {
            arg0.cancelable = arg1 !== 0;
        },
        __wbg_set_client_x_6508054418447e2b: function(arg0, arg1) {
            arg0.clientX = arg1;
        },
        __wbg_set_client_y_653895adf886b407: function(arg0, arg1) {
            arg0.clientY = arg1;
        },
        __wbg_set_fillStyle_4360b989b9352bbb: function(arg0, arg1, arg2) {
            arg0.fillStyle = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_font_33fee74f2c82cb6f: function(arg0, arg1, arg2) {
            arg0.font = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_height_7d9d8f892e6964c6: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_id_4beae8b813c092d8: function(arg0, arg1, arg2) {
            arg0.id = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_innerHTML_f78a45a07f97e136: function(arg0, arg1, arg2) {
            arg0.innerHTML = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_lineWidth_beb3d05e36f4cc53: function(arg0, arg1) {
            arg0.lineWidth = arg1;
        },
        __wbg_set_method_5532d59b92d76467: function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_passive_86a651d25740d760: function(arg0, arg1) {
            arg0.passive = arg1 !== 0;
        },
        __wbg_set_placeholder_b9d6460490e1c0ff: function(arg0, arg1, arg2) {
            arg0.placeholder = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_scrollTop_2d6806f47f17cc8b: function(arg0, arg1) {
            arg0.scrollTop = arg1;
        },
        __wbg_set_src_674d1d8659ee9cd5: function(arg0, arg1, arg2) {
            arg0.src = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_strokeStyle_b390d5f09a6989a8: function(arg0, arg1, arg2) {
            arg0.strokeStyle = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_textAlign_75f93b22c0415d5d: function(arg0, arg1, arg2) {
            arg0.textAlign = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_textBaseline_edb08ba62ac0d3ac: function(arg0, arg1, arg2) {
            arg0.textBaseline = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_textContent_54dcad83ae15772d: function(arg0, arg1, arg2) {
            arg0.textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_value_a342f135c825187d: function(arg0, arg1, arg2) {
            arg0.value = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_value_e5d078763e63e81e: function(arg0, arg1, arg2) {
            arg0.value = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_width_8e30d010cd66830d: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_shiftKey_9bcb8bdd60c2f152: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_shiftKey_9f797da486b2ade8: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_4ef717fb391d88b7: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_8d1badc68b5a74f4: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_146583524fe1469b: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_f2829a2234d7819e: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_strokeRect_74c74060d04c703b: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.strokeRect(arg1, arg2, arg3, arg4);
        },
        __wbg_stroke_cf809e69aae41b03: function(arg0) {
            arg0.stroke();
        },
        __wbg_style_6657aed849e5d757: function(arg0) {
            const ret = arg0.style;
            return ret;
        },
        __wbg_target_e759594a8d965ed7: function(arg0) {
            const ret = arg0.target;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_then_16d107c451e9905d: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_6ec10ae38b3e92f7: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_top_fe120acfa924a430: function(arg0) {
            const ret = arg0.top;
            return ret;
        },
        __wbg_value_1f687dfa7d6c3d08: function(arg0, arg1) {
            const ret = arg1.value;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_warn_b1370d804fa3e259: function(arg0) {
            console.warn(arg0);
        },
        __wbg_width_6d9315ecc7140ff6: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_84477c442af415ce: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_writeText_34bfead2ae78e5bb: function(arg0, arg1, arg2) {
            const ret = arg0.writeText(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 183, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___wasm_bindgen_f555086a82b9a402___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_f555086a82b9a402___JsError___true_);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Array<any>")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true_);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("ClipboardEvent")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__2);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__3);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("FocusEvent")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__4);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("KeyboardEvent")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__5);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MouseEvent")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__6);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("WheelEvent")], shim_idx: 138, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__7);
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 146, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen_f555086a82b9a402___convert__closures_____invoke_______true_);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./basic_js_bg.js": import0,
    };
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke_______true_(arg0, arg1) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke_______true_(arg0, arg1);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true_(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__2(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__2(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__3(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__3(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__4(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__4(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__5(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__5(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__6(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__6(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__7(arg0, arg1, arg2) {
    wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___js_sys_963196ae605fade1___Array______true__7(arg0, arg1, arg2);
}

function wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___wasm_bindgen_f555086a82b9a402___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_f555086a82b9a402___JsError___true_(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_f555086a82b9a402___convert__closures_____invoke___wasm_bindgen_f555086a82b9a402___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_f555086a82b9a402___JsError___true_(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

const JsGridFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jsgrid_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('basic_js_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
