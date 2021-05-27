<template>
    <a :href="url">
        <slot :slotData="website">
            {{website.subTitle}}
        </slot>
    </a>
</template>

<script>
export default {
    props: ['url'],
    data() {
        return {
            website: {
                title: 'aa',
                subTitle: 'bb'
            }
        }
    }
}
</script>