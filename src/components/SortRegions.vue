<template>
    <select @click.capture="onOptionSelected" v-model="selected">
        <option disabled value="">Sort regions by</option>
        <option>Region length</option>
        <option>Topic name</option>
    </select>
</template>

<script>
    export default {
        data: () => ({ selected: '' }),
        methods: {
            onOptionSelected () {
                this.$emit('onOptionSelected', this.selectedTags)
            }
        }
    }
</script>

<style>
    #filter__tags__container > li { display: inline-block; }
</style>