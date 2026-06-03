import { RawInterpreter } from './snippets/dioxus-interpreter-js-e827be9a3ca83173/inline0.js';
import { setAttributeInner } from './snippets/dioxus-interpreter-js-e827be9a3ca83173/src/js/set_attribute.js';
import { get_select_data } from './snippets/dioxus-web-5b126e270dcd269f/inline0.js';
import { WebDioxusChannel } from './snippets/dioxus-web-5b126e270dcd269f/src/js/eval.js';


export class JSOwner {
    static __wrap(ptr) {
        const obj = Object.create(JSOwner.prototype);
        obj.__wbg_ptr = ptr;
        JSOwnerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        JSOwnerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_jsowner_free(ptr, 0);
    }
}
if (Symbol.dispose) JSOwner.prototype[Symbol.dispose] = JSOwner.prototype.free;

/**
 * WASM entry point — mount the Dioxus app.
 */
export function main() {
    wasm.main();
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_ef53bc310eb298a0: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_bigint_get_as_i64_38130e98eecd467d: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_1a45e2c38d4d41b9: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_0accd80f45e5faa2: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_70a403a56e771704: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_6ffd6468a9bc44b9: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_754e9f305ff6029e: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_56732c2bc353f41d: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_c236cabd84a4d769: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_67b456be8673d3d7: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_1068e624fa87f6ab: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_2c56564c75129511: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_memory_fbc4c3e30b409f08: function() {
            const ret = wasm.memory;
            return ret;
        },
        __wbg___wbindgen_number_get_9bb1761122181af2: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_72bdf95d3ae505b1: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_1506f2235d1bdba0: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_61db23ac97f16c31: function(arg0) {
            arg0._wbg_cb_unref();
        },
        __wbg_activeElement_63a85ac417bbb8d3: function(arg0) {
            const ret = arg0.activeElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_addEventListener_5593b0efd622abd6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_addEventListener_7c5a0db2b2826a06: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_altKey_4efe9bf67d712839: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_altKey_77d5df8df54f3c7e: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_altKey_f112365f48461ccc: function(arg0) {
            const ret = arg0.altKey;
            return ret;
        },
        __wbg_animationName_23e8befb93220b3c: function(arg0, arg1) {
            const ret = arg1.animationName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_appendChild_364435158a70bd03: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.appendChild(arg1);
            return ret;
        }, arguments); },
        __wbg_arcTo_6b47eaa88893c130: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.arcTo(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_arrayBuffer_a0e88fd0c0e099b2: function(arg0) {
            const ret = arg0.arrayBuffer();
            return ret;
        },
        __wbg_back_3e53b5980d9fb5bd: function() { return handleError(function (arg0) {
            arg0.back();
        }, arguments); },
        __wbg_beginPath_1da975fa79b7c1b9: function(arg0) {
            arg0.beginPath();
        },
        __wbg_blockSize_4831f37080060d97: function(arg0) {
            const ret = arg0.blockSize;
            return ret;
        },
        __wbg_blur_fa177adf4bb4d43a: function() { return handleError(function (arg0) {
            arg0.blur();
        }, arguments); },
        __wbg_body_7d5b1a2ac7f2c821: function(arg0) {
            const ret = arg0.body;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_borderBoxSize_39a36ccf939c950d: function(arg0) {
            const ret = arg0.borderBoxSize;
            return ret;
        },
        __wbg_bottom_08c48399206127ee: function(arg0) {
            const ret = arg0.bottom;
            return ret;
        },
        __wbg_boundingClientRect_cc52b11bfb9da8cd: function(arg0) {
            const ret = arg0.boundingClientRect;
            return ret;
        },
        __wbg_bubbles_6507901b016ba2aa: function(arg0) {
            const ret = arg0.bubbles;
            return ret;
        },
        __wbg_button_f3dc4c82e6ee9a0c: function(arg0) {
            const ret = arg0.button;
            return ret;
        },
        __wbg_buttons_8dae14f7d9ea8c8a: function(arg0) {
            const ret = arg0.buttons;
            return ret;
        },
        __wbg_call_8a89609d89f6608a: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_9c758de292015997: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_changedTouches_f4bc81aa9275b3b1: function(arg0) {
            const ret = arg0.changedTouches;
            return ret;
        },
        __wbg_charCodeAt_464da5455a6116e4: function(arg0, arg1) {
            const ret = arg0.charCodeAt(arg1 >>> 0);
            return ret;
        },
        __wbg_checkValidity_d676b599c895f7e9: function(arg0) {
            const ret = arg0.checkValidity();
            return ret;
        },
        __wbg_checked_08fc50bf12676638: function(arg0) {
            const ret = arg0.checked;
            return ret;
        },
        __wbg_clearData_0d80a13dc1dfd821: function() { return handleError(function (arg0) {
            arg0.clearData();
        }, arguments); },
        __wbg_clearData_a2313e4669f1a692: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.clearData(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_clearInterval_dd698b7aa355fbe4: function(arg0, arg1) {
            arg0.clearInterval(arg1);
        },
        __wbg_clearRect_c6c4586d143d768c: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.clearRect(arg1, arg2, arg3, arg4);
        },
        __wbg_clearTimeout_4f7dad1647aa1690: function(arg0, arg1) {
            arg0.clearTimeout(arg1);
        },
        __wbg_clientHeight_a7262e398342b986: function(arg0) {
            const ret = arg0.clientHeight;
            return ret;
        },
        __wbg_clientWidth_df70d49cc7ae3e15: function(arg0) {
            const ret = arg0.clientWidth;
            return ret;
        },
        __wbg_clientX_6a613cbcceb44e9d: function(arg0) {
            const ret = arg0.clientX;
            return ret;
        },
        __wbg_clientX_c85019015e605e82: function(arg0) {
            const ret = arg0.clientX;
            return ret;
        },
        __wbg_clientY_48b9212040ca1133: function(arg0) {
            const ret = arg0.clientY;
            return ret;
        },
        __wbg_clientY_e89b1cdbdb6c1772: function(arg0) {
            const ret = arg0.clientY;
            return ret;
        },
        __wbg_clip_512aa0849d54e0d5: function(arg0) {
            arg0.clip();
        },
        __wbg_clipboardData_9cee642a6a4aa59c: function(arg0) {
            const ret = arg0.clipboardData;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_clipboard_53ba93c4ad802c3d: function(arg0) {
            const ret = arg0.clipboard;
            return ret;
        },
        __wbg_closePath_6a67796205fda3c8: function(arg0) {
            arg0.closePath();
        },
        __wbg_closest_d8bee0814e70d0eb: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.closest(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_code_fda4a2b9044681ac: function(arg0, arg1) {
            const ret = arg1.code;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_contentBoxSize_48fabcd0eea7c23e: function(arg0) {
            const ret = arg0.contentBoxSize;
            return ret;
        },
        __wbg_createComment_fee3099b63c574fb: function(arg0, arg1, arg2) {
            const ret = arg0.createComment(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_createElementNS_2c964c61db671f5d: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return ret;
        }, arguments); },
        __wbg_createElement_c3c16a9aa7f5cc74: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_createTextNode_f78a04409331196b: function(arg0, arg1, arg2) {
            const ret = arg0.createTextNode(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_ctrlKey_1cae6780759a470d: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_ctrlKey_9a3be9ca366f0d73: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_ctrlKey_a1ca4695e4fe525a: function(arg0) {
            const ret = arg0.ctrlKey;
            return ret;
        },
        __wbg_dataTransfer_bf723904983b1674: function(arg0) {
            const ret = arg0.dataTransfer;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_data_8d4459e190fc1615: function(arg0, arg1) {
            const ret = arg1.data;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_deltaMode_40f5de10d348f7e8: function(arg0) {
            const ret = arg0.deltaMode;
            return ret;
        },
        __wbg_deltaX_5193430f52fdad3f: function(arg0) {
            const ret = arg0.deltaX;
            return ret;
        },
        __wbg_deltaY_e1fefa22823d87c4: function(arg0) {
            const ret = arg0.deltaY;
            return ret;
        },
        __wbg_deltaZ_0cd74e7cc4f80662: function(arg0) {
            const ret = arg0.deltaZ;
            return ret;
        },
        __wbg_detail_8d603e8cc69062d8: function(arg0) {
            const ret = arg0.detail;
            return ret;
        },
        __wbg_devicePixelRatio_dab1a0b7ea57b26a: function(arg0) {
            const ret = arg0.devicePixelRatio;
            return ret;
        },
        __wbg_disconnect_baa8c650bef8508f: function(arg0) {
            arg0.disconnect();
        },
        __wbg_dispatchEvent_9e344ca144dd9545: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.dispatchEvent(arg1);
            return ret;
        }, arguments); },
        __wbg_documentElement_19b770919f3ea991: function(arg0) {
            const ret = arg0.documentElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_document_aceb08cd6489baf5: function(arg0) {
            const ret = arg0.document;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_done_60cf307fcc680536: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_drawImage_92a28897b8ab19b6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.drawImage(arg1, arg2, arg3, arg4, arg5);
        }, arguments); },
        __wbg_dropEffect_8c094b67487a3b6b: function(arg0, arg1) {
            const ret = arg1.dropEffect;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_effectAllowed_b6d34addff0cc3d5: function(arg0, arg1) {
            const ret = arg1.effectAllowed;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_elapsedTime_134de65ccf47aee6: function(arg0) {
            const ret = arg0.elapsedTime;
            return ret;
        },
        __wbg_elapsedTime_5997ee938bdcc694: function(arg0) {
            const ret = arg0.elapsedTime;
            return ret;
        },
        __wbg_entries_04b37a02507f1713: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_entries_373be202d0843c74: function(arg0) {
            const ret = arg0.entries();
            return ret;
        },
        __wbg_error_78ff5b3a29b770e0: function(arg0) {
            console.error(arg0);
        },
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
        __wbg_execCommand_e9929c7b258d479a: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.execCommand(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_fetch_ce1af4d1b59a60be: function(arg0, arg1) {
            const ret = arg0.fetch(arg1);
            return ret;
        },
        __wbg_files_6d12882157f4016a: function(arg0) {
            const ret = arg0.files;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_files_e558387d1120f356: function(arg0) {
            const ret = arg0.files;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_fillRect_3916c35e6834cd1b: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.fillRect(arg1, arg2, arg3, arg4);
        },
        __wbg_fillText_9a0aa2acf11b7d03: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
        }, arguments); },
        __wbg_fill_e9ef1c011f58f948: function(arg0) {
            arg0.fill();
        },
        __wbg_focus_a3a6c806c5bccea1: function() { return handleError(function (arg0) {
            arg0.focus();
        }, arguments); },
        __wbg_force_df887cff6d21dd3d: function(arg0) {
            const ret = arg0.force;
            return ret;
        },
        __wbg_forward_eeed37582baadfaf: function() { return handleError(function (arg0) {
            arg0.forward();
        }, arguments); },
        __wbg_getAsFile_a461d9ef46e11b13: function() { return handleError(function (arg0) {
            const ret = arg0.getAsFile();
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getAttribute_27f7a0d74339fd41: function(arg0, arg1, arg2, arg3) {
            const ret = arg1.getAttribute(getStringFromWasm0(arg2, arg3));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getBoundingClientRect_93c2750834277567: function(arg0) {
            const ret = arg0.getBoundingClientRect();
            return ret;
        },
        __wbg_getComputedStyle_c59f58a15bc6a800: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.getComputedStyle(arg1);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getContext_5b39fff76491fded: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        }, arguments); },
        __wbg_getData_ac647d2fd3233198: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getData(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_getElementById_c35b4b7d270d161d: function(arg0, arg1, arg2) {
            const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_getNode_2f3b1f608db7c9d0: function(arg0, arg1) {
            const ret = arg0.getNode(arg1 >>> 0);
            return ret;
        },
        __wbg_getPropertyValue_dbbb77f232017e4d: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_get_1f8f054ddbaa7db2: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_2b48c7d0d006a781: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_c4eb9c8665471988: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_dd98bf4577cc33b4: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_get_de6a0f7d4d18a304: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_select_data_60af93fcbe2f391c: function(arg0, arg1) {
            const ret = get_select_data(arg1);
            const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_get_unchecked_33f6e5c9e2f2d6b2: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_hash_943e3a1af6d171d2: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.hash;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_head_79cb26ea82b99acd: function(arg0) {
            const ret = arg0.head;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_height_87fd6bb4af652876: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_8e3b6ac1a60655fb: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_8e6603d2bea90dc1: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_height_ef5b5950872773b5: function(arg0) {
            const ret = arg0.height;
            return ret;
        },
        __wbg_history_58333fc71c2a7689: function() { return handleError(function (arg0) {
            const ret = arg0.history;
            return ret;
        }, arguments); },
        __wbg_identifier_ea7042cbf4a863b9: function(arg0) {
            const ret = arg0.identifier;
            return ret;
        },
        __wbg_initialize_169e37fbdd472b20: function(arg0, arg1, arg2) {
            arg0.initialize(arg1, arg2);
        },
        __wbg_inlineSize_370a3eb7b97dc084: function(arg0) {
            const ret = arg0.inlineSize;
            return ret;
        },
        __wbg_innerHeight_8b6ee2571dbedb9d: function() { return handleError(function (arg0) {
            const ret = arg0.innerHeight;
            return ret;
        }, arguments); },
        __wbg_instanceof_AnimationEvent_ad33ff874abdf2ff: function(arg0) {
            let result;
            try {
                result = arg0 instanceof AnimationEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_8f49811467741499: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Blob_f6321ce92d2740fd: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Blob;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CanvasRenderingContext2d_6f2951bc60fb6d97: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CanvasRenderingContext2D;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CompositionEvent_a67003a76d3b5d08: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CompositionEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_CustomEvent_c9861695009b62e1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof CustomEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Document_25f29ef741d52c29: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Document;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_DragEvent_712f9ab18208a9df: function(arg0) {
            let result;
            try {
                result = arg0 instanceof DragEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Element_73566cb5986eac3a: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Element;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Event_54b0170b4e4224ac: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Event;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_File_4389d03fd2e0b69e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof File;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_FocusEvent_763702798014f0c1: function(arg0) {
            let result;
            try {
                result = arg0 instanceof FocusEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlCanvasElement_8325b7578cc1684c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLCanvasElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlDocument_cdecb2bb5afab0de: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLDocument;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlElement_9d326f7a42217802: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlFormElement_fb5be6b5f88d4b6d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLFormElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlImageElement_13a655d00f32b750: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLImageElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlInputElement_684a7e5d7dbec24c: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLInputElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlSelectElement_9678e03521a565e0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLSelectElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlTextAreaElement_ddb0b111033391f4: function(arg0) {
            let result;
            try {
                result = arg0 instanceof HTMLTextAreaElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_KeyboardEvent_2ecb44c131a7b1a6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof KeyboardEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Map_9fc06d9a951bcee6: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Map;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_MouseEvent_bcc08a1c7e46e4a0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof MouseEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Node_3149777213c50c67: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Node;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_PointerEvent_bbeecbc12422c20d: function(arg0) {
            let result;
            try {
                result = arg0 instanceof PointerEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_cb984bd66d7bd408: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_TouchEvent_d8c632d7a209a685: function(arg0) {
            let result;
            try {
                result = arg0 instanceof TouchEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_TransitionEvent_bc70105685e71f3e: function(arg0) {
            let result;
            try {
                result = arg0 instanceof TransitionEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_86f30649f63ef9c2: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WheelEvent_9a9cc576b7ce4fc0: function(arg0) {
            let result;
            try {
                result = arg0 instanceof WheelEvent;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_e093be59ee9a8e14: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_intersectionRatio_00cb91bc55bb82a0: function(arg0) {
            const ret = arg0.intersectionRatio;
            return ret;
        },
        __wbg_intersectionRect_a76f50fe0931a3a7: function(arg0) {
            const ret = arg0.intersectionRect;
            return ret;
        },
        __wbg_isArray_67c2c9c4313f4448: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isComposing_0b9f69114b4de822: function(arg0) {
            const ret = arg0.isComposing;
            return ret;
        },
        __wbg_isIntersecting_702e9334ce71bbb4: function(arg0) {
            const ret = arg0.isIntersecting;
            return ret;
        },
        __wbg_isPrimary_cd1e73d5446d0d3c: function(arg0) {
            const ret = arg0.isPrimary;
            return ret;
        },
        __wbg_isSafeInteger_66acec27e09e99a7: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_isSecureContext_ef5e466438f051c0: function(arg0) {
            const ret = arg0.isSecureContext;
            return ret;
        },
        __wbg_is_4801976d24bcae5b: function(arg0, arg1) {
            const ret = Object.is(arg0, arg1);
            return ret;
        },
        __wbg_item_869a4237f79e82fe: function(arg0, arg1) {
            const ret = arg0.item(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_items_2c4524d8f08df46b: function(arg0) {
            const ret = arg0.items;
            return ret;
        },
        __wbg_iterator_8732428d309e270e: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_json_8b1fa0ed507324c9: function() { return handleError(function (arg0) {
            const ret = arg0.json();
            return ret;
        }, arguments); },
        __wbg_key_df6a54e3e036c3fe: function(arg0, arg1) {
            const ret = arg1.key;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_kind_9d0d4edd90c193cf: function(arg0, arg1) {
            const ret = arg1.kind;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_lastModified_c40e7ba12f6ccc24: function(arg0) {
            const ret = arg0.lastModified;
            return ret;
        },
        __wbg_left_985fa07b897d8e74: function(arg0) {
            const ret = arg0.left;
            return ret;
        },
        __wbg_length_4a591ecaa01354d9: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_521edf73d0cf740d: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_60b522d4443ec08e: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_66f1a4b2e9026940: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_e6080b6174ddb9c0: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_f1b1258ecc19cc7d: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_lineTo_1c1d0e0fabd76dd5: function(arg0, arg1, arg2) {
            arg0.lineTo(arg1, arg2);
        },
        __wbg_location_bd39406d76c6d592: function(arg0) {
            const ret = arg0.location;
            return ret;
        },
        __wbg_location_efdf1fea18b5552a: function(arg0) {
            const ret = arg0.location;
            return ret;
        },
        __wbg_log_0c201ade58bb55e1: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_log_ce2c4456b290c5e7: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.log(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_mark_b4d943f3bc2d2404: function(arg0, arg1) {
            performance.mark(getStringFromWasm0(arg0, arg1));
        },
        __wbg_measureText_b7ba8e89644fa634: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.measureText(getStringFromWasm0(arg1, arg2));
            return ret;
        }, arguments); },
        __wbg_measure_84362959e621a2c1: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            let deferred0_0;
            let deferred0_1;
            let deferred1_0;
            let deferred1_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                deferred1_0 = arg2;
                deferred1_1 = arg3;
                performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
                wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
            }
        }, arguments); },
        __wbg_metaKey_752862905c708ca9: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_metaKey_d2a47aa621ff2c45: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_metaKey_d3d574e41436dc65: function(arg0) {
            const ret = arg0.metaKey;
            return ret;
        },
        __wbg_moveTo_3356d453f2b376d1: function(arg0, arg1, arg2) {
            arg0.moveTo(arg1, arg2);
        },
        __wbg_name_07c5219bbe18b668: function(arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_name_2b1afe861fc08636: function(arg0, arg1) {
            const ret = arg1.name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_naturalHeight_36c61aa219debd58: function(arg0) {
            const ret = arg0.naturalHeight;
            return ret;
        },
        __wbg_naturalWidth_2111265fa11a1862: function(arg0) {
            const ret = arg0.naturalWidth;
            return ret;
        },
        __wbg_navigator_3833ecdbc19d2757: function(arg0) {
            const ret = arg0.navigator;
            return ret;
        },
        __wbg_new_22598f2b091dadf2: function(arg0) {
            const ret = new WebDioxusChannel(JSOwner.__wrap(arg0));
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_26bdcffba762c064: function(arg0) {
            const ret = new RawInterpreter(arg0 >>> 0);
            return ret;
        },
        __wbg_new_31ac8633a73459af: function() { return handleError(function (arg0) {
            const ret = new ResizeObserver(arg0);
            return ret;
        }, arguments); },
        __wbg_new_578aeef4b6b94378: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_6114450be2525299: function() { return handleError(function () {
            const ret = new FileReader();
            return ret;
        }, arguments); },
        __wbg_new_622fc80556be2e26: function() {
            const ret = new Map();
            return ret;
        },
        __wbg_new_b16ba8f830b408c1: function() { return handleError(function () {
            const ret = new DataTransfer();
            return ret;
        }, arguments); },
        __wbg_new_ce1ab61c1c2b300d: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_d90091b82fdf5b91: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_with_args_b7569746028c197c: function(arg0, arg1, arg2, arg3) {
            const ret = new Function(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
            return ret;
        },
        __wbg_new_with_form_afcc4b8d67f692c3: function() { return handleError(function (arg0) {
            const ret = new FormData(arg0);
            return ret;
        }, arguments); },
        __wbg_new_with_mouse_event_init_dict_120c51dc15046998: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new MouseEvent(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_new_with_str_and_init_bcd02b79a793d27f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_next_9e03acdf51c4960d: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_next_eb8ca7351fa27906: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_now_f565250295e2d180: function(arg0) {
            const ret = arg0.now();
            return ret;
        },
        __wbg_observe_85023e8cba523492: function(arg0, arg1) {
            arg0.observe(arg1);
        },
        __wbg_offsetHeight_c3c884d1082f2a03: function(arg0) {
            const ret = arg0.offsetHeight;
            return ret;
        },
        __wbg_offsetTop_a46f900932d41962: function(arg0) {
            const ret = arg0.offsetTop;
            return ret;
        },
        __wbg_offsetWidth_44642f6f44cf2fb4: function(arg0) {
            const ret = arg0.offsetWidth;
            return ret;
        },
        __wbg_offsetX_9ed7cd6abcf67d8b: function(arg0) {
            const ret = arg0.offsetX;
            return ret;
        },
        __wbg_offsetY_31fc6016c060dacd: function(arg0) {
            const ret = arg0.offsetY;
            return ret;
        },
        __wbg_ownerDocument_3382cef744616ba1: function(arg0) {
            const ret = arg0.ownerDocument;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_pageX_a10e815efab68f0b: function(arg0) {
            const ret = arg0.pageX;
            return ret;
        },
        __wbg_pageX_e6c22dee653091ec: function(arg0) {
            const ret = arg0.pageX;
            return ret;
        },
        __wbg_pageY_d267a50f1054ace5: function(arg0) {
            const ret = arg0.pageY;
            return ret;
        },
        __wbg_pageY_dead0e5826c04c0e: function(arg0) {
            const ret = arg0.pageY;
            return ret;
        },
        __wbg_parentElement_8b5d8fe9f2319ca8: function(arg0) {
            const ret = arg0.parentElement;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_pathname_626d5a44ea16c0c9: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.pathname;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_performance_68499ca0718837f5: function(arg0) {
            const ret = arg0.performance;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_pointerId_be45f553bf33ecdd: function(arg0) {
            const ret = arg0.pointerId;
            return ret;
        },
        __wbg_pointerType_2da062eba6f661c0: function(arg0, arg1) {
            const ret = arg1.pointerType;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_pressure_e31046ec6e6263d3: function(arg0) {
            const ret = arg0.pressure;
            return ret;
        },
        __wbg_preventDefault_4902f41a1b31bedd: function(arg0) {
            arg0.preventDefault();
        },
        __wbg_propertyName_1e8546936b567c8b: function(arg0, arg1) {
            const ret = arg1.propertyName;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_prototypesetcall_3249fc62a0fafa30: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_pseudoElement_56c2ea08c5ae9a25: function(arg0, arg1) {
            const ret = arg1.pseudoElement;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_pseudoElement_907514ceb48d2efa: function(arg0, arg1) {
            const ret = arg1.pseudoElement;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_pushState_f4bbfda83cdfe6c2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.pushState(arg1, getStringFromWasm0(arg2, arg3), arg4 === 0 ? undefined : getStringFromWasm0(arg4, arg5));
        }, arguments); },
        __wbg_push_a6822215aa43e71c: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_queueMicrotask_35c611f4a14830b2: function(arg0) {
            queueMicrotask(arg0);
        },
        __wbg_queueMicrotask_404ed0a58e0b63cc: function(arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        },
        __wbg_radiusX_ca7ad662bbfb4f57: function(arg0) {
            const ret = arg0.radiusX;
            return ret;
        },
        __wbg_radiusY_6cdedb371f9c1bd5: function(arg0) {
            const ret = arg0.radiusY;
            return ret;
        },
        __wbg_readAsArrayBuffer_dcc71a4ed6cdcf06: function() { return handleError(function (arg0, arg1) {
            arg0.readAsArrayBuffer(arg1);
        }, arguments); },
        __wbg_readAsText_1892e1cf58cb4930: function() { return handleError(function (arg0, arg1) {
            arg0.readAsText(arg1);
        }, arguments); },
        __wbg_readText_db1b4dc836c0fa14: function(arg0) {
            const ret = arg0.readText();
            return ret;
        },
        __wbg_rect_72dd146afd51fd1d: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.rect(arg1, arg2, arg3, arg4);
        },
        __wbg_removeEventListener_5f35962e6c0b2ddc: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
        }, arguments); },
        __wbg_removeProperty_d208a45736ad36a4: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = arg1.removeProperty(getStringFromWasm0(arg2, arg3));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_remove_f3fdf26d49490e53: function(arg0) {
            arg0.remove();
        },
        __wbg_repeat_136a627581271bd3: function(arg0) {
            const ret = arg0.repeat;
            return ret;
        },
        __wbg_replaceState_827056d3e0653693: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            arg0.replaceState(arg1, getStringFromWasm0(arg2, arg3), arg4 === 0 ? undefined : getStringFromWasm0(arg4, arg5));
        }, arguments); },
        __wbg_requestAnimationFrame_72bbc2f340fc7a29: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.requestAnimationFrame(arg1);
            return ret;
        }, arguments); },
        __wbg_resolve_25a7e548d5881dca: function(arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        },
        __wbg_restore_35d33f272777a212: function(arg0) {
            arg0.restore();
        },
        __wbg_result_2804124b89ae22a3: function() { return handleError(function (arg0) {
            const ret = arg0.result;
            return ret;
        }, arguments); },
        __wbg_right_c5d17f2dff9d0d06: function(arg0) {
            const ret = arg0.right;
            return ret;
        },
        __wbg_rootBounds_3e53fd34eea77f95: function(arg0) {
            const ret = arg0.rootBounds;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_rotationAngle_7b2ec4a2283ff78c: function(arg0) {
            const ret = arg0.rotationAngle;
            return ret;
        },
        __wbg_run_9f0b5ec848bddc2d: function(arg0) {
            arg0.run();
        },
        __wbg_rustRecv_ce812a5965920185: function(arg0) {
            const ret = arg0.rustRecv();
            return ret;
        },
        __wbg_rustSend_27a0ddfb6f0fa952: function(arg0, arg1) {
            arg0.rustSend(arg1);
        },
        __wbg_saveTemplate_4aa5c34bf8b14cc9: function(arg0, arg1, arg2, arg3) {
            var v0 = getArrayJsValueFromWasm0(arg1, arg2).slice();
            wasm.__wbindgen_free(arg1, arg2 * 4, 4);
            arg0.saveTemplate(v0, arg3);
        },
        __wbg_save_e8d837ef098cd6fc: function(arg0) {
            arg0.save();
        },
        __wbg_scale_28884a905dff3c86: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.scale(arg1, arg2);
        }, arguments); },
        __wbg_screenX_cf6973d471eef9af: function(arg0) {
            const ret = arg0.screenX;
            return ret;
        },
        __wbg_screenX_d72df4af68a5e385: function(arg0) {
            const ret = arg0.screenX;
            return ret;
        },
        __wbg_screenY_aa5662ddfe8bd0b3: function(arg0) {
            const ret = arg0.screenY;
            return ret;
        },
        __wbg_screenY_e0d554d8c6125f4a: function(arg0) {
            const ret = arg0.screenY;
            return ret;
        },
        __wbg_scrollHeight_28eca057d00b2962: function(arg0) {
            const ret = arg0.scrollHeight;
            return ret;
        },
        __wbg_scrollIntoView_26d2401245f96cab: function(arg0, arg1) {
            arg0.scrollIntoView(arg1);
        },
        __wbg_scrollLeft_7897f8332705d017: function(arg0) {
            const ret = arg0.scrollLeft;
            return ret;
        },
        __wbg_scrollTo_76d88a4c0481b97b: function(arg0, arg1, arg2) {
            arg0.scrollTo(arg1, arg2);
        },
        __wbg_scrollTop_705ef336e30f2d3c: function(arg0) {
            const ret = arg0.scrollTop;
            return ret;
        },
        __wbg_scrollTop_a7ae07fae76663e3: function(arg0) {
            const ret = arg0.scrollTop;
            return ret;
        },
        __wbg_scrollWidth_48bec0be1eaedf88: function(arg0) {
            const ret = arg0.scrollWidth;
            return ret;
        },
        __wbg_scrollX_9c3fa310cb5ed346: function() { return handleError(function (arg0) {
            const ret = arg0.scrollX;
            return ret;
        }, arguments); },
        __wbg_scrollY_5502bd75aa44fd39: function() { return handleError(function (arg0) {
            const ret = arg0.scrollY;
            return ret;
        }, arguments); },
        __wbg_scroll_645ccb54e18bd7ba: function(arg0, arg1) {
            arg0.scroll(arg1);
        },
        __wbg_search_c299eeae1d9b169e: function() { return handleError(function (arg0, arg1) {
            const ret = arg1.search;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_select_825b7186a349cb10: function(arg0) {
            arg0.select();
        },
        __wbg_select_eb5fe194807ca310: function(arg0) {
            arg0.select();
        },
        __wbg_setAttributeInner_11a30d36aa43287e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            setAttributeInner(arg0, getStringFromWasm0(arg1, arg2), arg3, arg4 === 0 ? undefined : getStringFromWasm0(arg4, arg5));
        },
        __wbg_setAttribute_5b695d1c3be2e3e6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setData_58c7ed2ecc354ef7: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setData(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setInterval_ae27514ca815a798: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setInterval(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_setProperty_a6e0b14612e307b1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        }, arguments); },
        __wbg_setTimeout_b5f25e402b6e8ff9: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.setTimeout(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_52b1e1eb5bed906a: function(arg0, arg1, arg2) {
            const ret = arg0.set(arg1, arg2);
            return ret;
        },
        __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_set_6e30c9374c26414c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_behavior_0ee56867a7179068: function(arg0, arg1) {
            arg0.behavior = __wbindgen_enum_ScrollBehavior[arg1];
        },
        __wbg_set_behavior_46eb03828e7952aa: function(arg0, arg1) {
            arg0.behavior = __wbindgen_enum_ScrollBehavior[arg1];
        },
        __wbg_set_block_9ca04ac9bad276f2: function(arg0, arg1) {
            arg0.block = __wbindgen_enum_ScrollLogicalPosition[arg1];
        },
        __wbg_set_bubbles_6fd039cfe6bbf77e: function(arg0, arg1) {
            arg0.bubbles = arg1 !== 0;
        },
        __wbg_set_button_0fe7a548feff85e2: function(arg0, arg1) {
            arg0.button = arg1;
        },
        __wbg_set_cancelable_1743c31f74b35db7: function(arg0, arg1) {
            arg0.cancelable = arg1 !== 0;
        },
        __wbg_set_className_764842f07bec5aba: function(arg0, arg1, arg2) {
            arg0.className = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_client_x_41d41ffb67ed125b: function(arg0, arg1) {
            arg0.clientX = arg1;
        },
        __wbg_set_client_y_7a2639fa581cae41: function(arg0, arg1) {
            arg0.clientY = arg1;
        },
        __wbg_set_dca99999bba88a9a: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_dropEffect_92a015565ed9acec: function(arg0, arg1, arg2) {
            arg0.dropEffect = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_effectAllowed_5c9ca16724ef0d31: function(arg0, arg1, arg2) {
            arg0.effectAllowed = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_fillStyle_e96ce0e2e6d0bd13: function(arg0, arg1, arg2) {
            arg0.fillStyle = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_font_3700823e473a6204: function(arg0, arg1, arg2) {
            arg0.font = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_height_0739170de8653cc4: function(arg0, arg1) {
            arg0.height = arg1 >>> 0;
        },
        __wbg_set_href_eee50816257e9d44: function() { return handleError(function (arg0, arg1, arg2) {
            arg0.href = getStringFromWasm0(arg1, arg2);
        }, arguments); },
        __wbg_set_id_b9d2ee0b28d87959: function(arg0, arg1, arg2) {
            arg0.id = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_inline_ef10841da7a5d18c: function(arg0, arg1) {
            arg0.inline = __wbindgen_enum_ScrollLogicalPosition[arg1];
        },
        __wbg_set_innerHTML_6bcbbce0a3626998: function(arg0, arg1, arg2) {
            arg0.innerHTML = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_left_73a5fe19e9f1cf30: function(arg0, arg1) {
            arg0.left = arg1;
        },
        __wbg_set_lineWidth_57a9e0b365e06eba: function(arg0, arg1) {
            arg0.lineWidth = arg1;
        },
        __wbg_set_method_7a6811dec7a4feff: function(arg0, arg1, arg2) {
            arg0.method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_onload_c8366a4de7e51593: function(arg0, arg1) {
            arg0.onload = arg1;
        },
        __wbg_set_passive_cd1f03dae3bdd0f9: function(arg0, arg1) {
            arg0.passive = arg1 !== 0;
        },
        __wbg_set_placeholder_89475f02a71a9568: function(arg0, arg1, arg2) {
            arg0.placeholder = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_scrollRestoration_2dbe7bb81342e294: function() { return handleError(function (arg0, arg1) {
            arg0.scrollRestoration = __wbindgen_enum_ScrollRestoration[arg1];
        }, arguments); },
        __wbg_set_scrollTop_a8e46c99b633c0fa: function(arg0, arg1) {
            arg0.scrollTop = arg1;
        },
        __wbg_set_src_44ba1ad03eb5113d: function(arg0, arg1, arg2) {
            arg0.src = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_strokeStyle_f44ddd692cbef122: function(arg0, arg1, arg2) {
            arg0.strokeStyle = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_textAlign_2cf46493669911fa: function(arg0, arg1, arg2) {
            arg0.textAlign = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_textBaseline_5a3fa8559d95dd95: function(arg0, arg1, arg2) {
            arg0.textBaseline = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_textContent_2a822316d8a2310b: function(arg0, arg1, arg2) {
            arg0.textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_top_1865aa00fe910db0: function(arg0, arg1) {
            arg0.top = arg1;
        },
        __wbg_set_value_7fcf46f20123a28a: function(arg0, arg1, arg2) {
            arg0.value = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_value_fc1a37d10af775a0: function(arg0, arg1, arg2) {
            arg0.value = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_width_87301412247f3343: function(arg0, arg1) {
            arg0.width = arg1 >>> 0;
        },
        __wbg_shiftKey_05941b44ffe0a9ce: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_shiftKey_e62ee708439d8a9c: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_shiftKey_ec95aec36c86fb31: function(arg0) {
            const ret = arg0.shiftKey;
            return ret;
        },
        __wbg_size_9970092b88b1094c: function(arg0) {
            const ret = arg0.size;
            return ret;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_state_7824bbeefbc301b1: function() { return handleError(function (arg0) {
            const ret = arg0.state;
            return ret;
        }, arguments); },
        __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_4c59f6c7ea29a144: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_e70ae9f2eb052253: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_stringify_8286df6dcc591521: function() { return handleError(function (arg0) {
            const ret = JSON.stringify(arg0);
            return ret;
        }, arguments); },
        __wbg_strokeRect_0b35a3d8bed14f36: function(arg0, arg1, arg2, arg3, arg4) {
            arg0.strokeRect(arg1, arg2, arg3, arg4);
        },
        __wbg_stroke_298b6b02ba692298: function(arg0) {
            arg0.stroke();
        },
        __wbg_style_ad0f3eb1fd1aa2bc: function(arg0) {
            const ret = arg0.style;
            return ret;
        },
        __wbg_tangentialPressure_86b5261e93500a5e: function(arg0) {
            const ret = arg0.tangentialPressure;
            return ret;
        },
        __wbg_targetTouches_775bc5755b8b96d9: function(arg0) {
            const ret = arg0.targetTouches;
            return ret;
        },
        __wbg_target_baf3e983dceee053: function(arg0) {
            const ret = arg0.target;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_textContent_666b896f07901078: function(arg0, arg1) {
            const ret = arg1.textContent;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_then_18f476d590e58992: function(arg0, arg1, arg2) {
            const ret = arg0.then(arg1, arg2);
            return ret;
        },
        __wbg_then_ac7b025999b52837: function(arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        },
        __wbg_tiltX_8d7111f4d9133ef2: function(arg0) {
            const ret = arg0.tiltX;
            return ret;
        },
        __wbg_tiltY_47632da38d059bfe: function(arg0) {
            const ret = arg0.tiltY;
            return ret;
        },
        __wbg_time_d7cc1475e076e12d: function(arg0) {
            const ret = arg0.time;
            return ret;
        },
        __wbg_top_14d766e5bde56568: function(arg0) {
            const ret = arg0.top;
            return ret;
        },
        __wbg_touches_65e436ac07e6aa05: function(arg0) {
            const ret = arg0.touches;
            return ret;
        },
        __wbg_twist_86e2236ace768bb1: function(arg0) {
            const ret = arg0.twist;
            return ret;
        },
        __wbg_type_6488255feec94876: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_type_d2c93d2bc26d9b55: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_type_f97e3f39d26c07d8: function(arg0, arg1) {
            const ret = arg1.type;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_update_memory_ddf6b41a329aec73: function(arg0, arg1) {
            arg0.update_memory(arg1);
        },
        __wbg_value_32493aa1c785ef7c: function(arg0, arg1) {
            const ret = arg1.value;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_6177c7953f900695: function(arg0, arg1) {
            const ret = arg1.value;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_ed244ce0aafd9d66: function(arg0, arg1) {
            const ret = arg1.value;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_value_f3625092ee4b37f4: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbg_warn_410c3261e3c6d686: function(arg0) {
            console.warn(arg0);
        },
        __wbg_weak_4a47d74ffa0a7f96: function(arg0) {
            const ret = arg0.weak();
            return ret;
        },
        __wbg_width_1e0b74fef17bc28b: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_699320f00b42fce1: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_796e38875beab5e6: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_a01fb50fdb566912: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_width_dd13177d91751e3c: function(arg0) {
            const ret = arg0.width;
            return ret;
        },
        __wbg_writeText_e35fb5c1924eb2ac: function(arg0, arg1, arg2) {
            const ret = arg0.writeText(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_x_d04fc448eb267831: function(arg0) {
            const ret = arg0.x;
            return ret;
        },
        __wbg_y_7a4ac1ce3a336bab: function(arg0) {
            const ret = arg0.y;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 966, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h9fa628e9c2bf6a55);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Array<any>")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5);
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("ClipboardEvent")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_2);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_3);
            return ret;
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 484, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__ha4f1b39275fbc26d);
            return ret;
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("FocusEvent")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_5);
            return ret;
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("KeyboardEvent")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_6);
            return ret;
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MouseEvent")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_7);
            return ret;
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("WheelEvent")], shim_idx: 172, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_8);
            return ret;
        },
        __wbindgen_cast_000000000000000a: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Ref(NamedExternref("Event"))], shim_idx: 486, ret: Unit, inner_ret: Some(Unit) }, mutable: false }) -> Externref`.
            const ret = makeClosure(arg0, arg1, wasm_bindgen__convert__closures________invoke__h4d9716b94c73f49b);
            return ret;
        },
        __wbindgen_cast_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 182, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h441005f42c845ca1);
            return ret;
        },
        __wbindgen_cast_000000000000000c: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 482, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, wasm_bindgen__convert__closures_____invoke__h25c1b4e4f016a2ae);
            return ret;
        },
        __wbindgen_cast_000000000000000d: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_000000000000000e: function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_000000000000000f: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000010: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
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
        "./basic-dioxus_bg.js": import0,
    };
}

function wasm_bindgen__convert__closures_____invoke__h441005f42c845ca1(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h441005f42c845ca1(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h25c1b4e4f016a2ae(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures_____invoke__h25c1b4e4f016a2ae(arg0, arg1);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_2(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_2(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_3(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_3(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__ha4f1b39275fbc26d(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__ha4f1b39275fbc26d(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_5(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_5(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_6(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_6(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_7(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_7(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_8(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures_____invoke__h4f7440e3216f31e5_8(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures________invoke__h4d9716b94c73f49b(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures________invoke__h4d9716b94c73f49b(arg0, arg1, arg2);
}

function wasm_bindgen__convert__closures_____invoke__h9fa628e9c2bf6a55(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen__convert__closures_____invoke__h9fa628e9c2bf6a55(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}


const __wbindgen_enum_ScrollBehavior = ["auto", "instant", "smooth"];


const __wbindgen_enum_ScrollLogicalPosition = ["start", "center", "end", "nearest"];


const __wbindgen_enum_ScrollRestoration = ["auto", "manual"];
const JSOwnerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_jsowner_free(ptr, 1));

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

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
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

function makeClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
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

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
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
        module_or_path = new URL('basic-dioxus_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
