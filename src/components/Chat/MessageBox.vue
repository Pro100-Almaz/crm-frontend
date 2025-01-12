<script setup lang="ts">
interface Props {
    author?: string;
    message: string;
    time: string;
    from?: string;
}

const props = defineProps<Props>();
const isClient = { value: false };

if (props.from == 'client') {
    isClient.value = true;
} else {
    isClient.value = false;
}
</script>

<template>
    <div class="max-w-125" v-if="isClient">
        <p class="mb-2.5 text-sm font-medium">{{ props.author }}</p>
        <div class="mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5 dark:bg-boxdark-2">
            <p class="font-medium">
            {{ props.message }}
            </p>
        </div>
        <p class="text-xs font-medium">{{ props.time }}</p>
    </div>

    <div class="ml-auto max-w-125" v-else>
        <div class="mb-2.5 rounded-2xl rounded-br-none bg-primary py-3 px-5">
            <p class="font-medium text-white">
            {{ props.message }}
            </p>
        </div>
        <p class="text-right text-xs font-medium">{{ props.time }}</p>
        </div>
    <div class="max-w-125"></div>
</template>