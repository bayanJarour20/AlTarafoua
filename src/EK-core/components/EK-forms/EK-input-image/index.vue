<template>
    <div class="position-relative mb-1">
        <b-button size="sm" class="clear btn-icon border-0" variant="flat-secondary" @click="clear">
            <unicon name="trash-alt" fill="#ea5455" width="16" height="16" />
        </b-button>
        <label :for="'label-for-file-' + id + (mul ? '-mul' : '-single')">{{label}}</label>
        <label
            :for="'label-for-file-' + id + (mul ? '-mul' : '-single')"
            class="drop border-primary"
            :class="{'border-danger': required && ((mul && (!previewBase || (previewBase && !previewBase.length))) || (!mul && !previewBase))}"
            :style="
                'background:url(' +
                    placehoder +
                    ') center center no-repeat; background-size: cover; height:' +
                    height
            "
        >
            <div
                :class="{ over: isDragging, error: wrongFile }"
                class="drop-container"
                @dragover.prevent="dragOver"
                @dragleave.prevent="dragLeave"
                @drop.prevent="drop($event)"
            >
                <h5 class="text-primary m-0">
                    {{ title }}
                    <unicon fill="#7367f0" width="20" name="plus"></unicon>
                </h5>
                <input
                    v-if="mul"
                    v-bind="$attrs"
                    type="file"
                    multiple
                    :id="'label-for-file-' + id + '-mul'"
                    @change="drop($event)"
                    class="d-none"
                />
                <input
                    v-else
                    type="file"
                    v-bind="$attrs"
                    :id="'label-for-file-' + id + '-single'"
                    @change="drop($event)"
                    class="d-none"
                />
            </div>
        </label>
        <div class="preview border-primary" :class="{'border-danger': required && ((mul && (!previewBase || (previewBase && !previewBase.length))) || (!mul && !previewBase))}">
            <slot name="preview" :previewBase="previewBase">
                <video v-if="previewBase && !mul" :src="previewBase" />
                
                <img  class="image" v-if="previewBase && !mul && !isVideo" :src="previewBase" />
                <template v-if="mul">
                    <img
                        class="image multie-image"
                        v-for="(src, index) in previewBase"
                        :key="index"
                        :src="src"
                    />
                </template>
            </slot>
        </div>
        <small class="text-danger" v-if="required && ((mul && (!previewBase || (previewBase && !previewBase.length))) || (!mul && !previewBase))">{{name ? name : ' الصورة مطلوبة'}} </small>
        <small>{{ progress }}</small>
    </div>
</template>
<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BButton
} from "bootstrap-vue";
export default {
    components: {
        BButton
    },
    data: () => ({
        innerVal: null,
        previewBase: null,
        id: Math.random() * 100000,
        isDragging: false,
        wrongFile: false,
    }),
    props: {
        title: String,
        mul: Boolean,
        name: String,
        placehoder: String,
        progress: String,
        base64: Boolean,
        required: Boolean,
        label: String,
        height: String,
        value: {
            type: null
        },
        isVideo: {
            type: Boolean,
            default: () => false
        }
    },
    mounted() {
        if (this.value) {
            this.previewBase = this.value;
        }
    },
    methods: {
        clear() {
            this.innerVal = null;
            this.previewBase = null;
        },
        dragOver() {
            this.isDragging = true;
        },
        dragLeave() {
            this.isDragging = false;
        },
        async drop(e) {
            console.log(this.previewBase)
            let files =
                e.dataTransfer == null ? e.target.files : e.dataTransfer.files;
            this.wrongFile = false;
            this.isDragging = false;
            // allows only 1 file
            if (files.length === 0) {
                return;
            } else if (!this.mul) {
                if ((files[0].type.indexOf("image") == -1 && !this.isVideo)|| (files[0].type.indexOf("video/mp4") == -1 && this.isVideo)) {
                    this.wrongFile = true;
                    this.$emit("inValidFile");
                    this.$toast({
                        component: ToastificationContent,
                        position: "top-right",
                        props: {
                            title: "نوع الملف غير مدعوم",
                            icon: "CoffeeIcon",
                            variant: "danger"
                        }
                    });
                    setTimeout(() => {
                        this.wrongFile = false;
                    }, 300);
                } else {         
                    let file = files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (() => {
                        
                        if(this.isVideo) {
                            this.previewBase = '/media/placeholder/pdf-svgrepo-com.svg'
                        } else {
                            this.previewBase = reader.result
                        }
                        if (this.base64) {
                            this.innerVal = reader.result;
                        } else {
                            this.innerVal = file;
                        }
                    }).bind(this);
                }
            } else {
                let file = files;
                let acceptedFiles = [];
                this.previewBase = [];
                await file.forEach(file => {
                    if (file.type.indexOf("image") == -1) {
                        this.wrongFile = true;
                        this.$emit("inValidFile");
                        this.$toast({
                            component: ToastificationContent,
                            position: "top-right",
                            props: {
                                title: "نوع الملف " + file.name + "غير مدعوم",
                                icon: "CoffeeIcon",
                                variant: "danger"
                            }
                        });
                        setTimeout(() => {
                            this.wrongFile = false;
                        }, 300);
                    } else {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (() => {
                            this.previewBase.push(reader.result)
                            if (this.base64) {
                                acceptedFiles.push(reader.result);
                            } else {
                                acceptedFiles.push(file);
                            }
                        }).bind(this);
                    }
                });
                this.innerVal = acceptedFiles;
            }
        }
    },
    watch: {
        innerVal(v) {
            this.$emit("input", v);
        },
        value(v) {
            this.previewBase = v;
        }
    }
};
</script>
<style lang="scss">
.clear {
    position: absolute;
    top: -6px;
    right: 0;
}
.drop {
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    width: 100%;
    display: flex;
    background: #efefef;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 6px;
    margin: 0;
    border-style: dashed !important;
    border-bottom: none!important;
}
.over {
    background: #85e783;
}
.drop-container {
    width: 100%;
    text-align: center;
}
.preview {
    border-top: none !important;
    .image {
        width: 100%;
        max-height: 300px;
        object-fit: cover;
        &.multie-image {
            max-height: 200px;
            &:not(:last-of-type) {
                margin-bottom: 1rem;
            }
        }
    }
}
</style>
