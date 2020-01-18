<template>
    <div class="flex w-full">
        <input class="appearance-none bg-transparent text-gray-700 focus:outline-none w-full md:text-lg form-input"
               :class="[{'text-red-500': hasErrorsByField}, {'text-gray-600 disabled-state' : isDisabled}]"
               :disabled="isDisabled"
               v-model="inputBaseModel"
               v-bind="bindInputProps"
               @change="updatePayloadOnInput($event.target.value)"
               @input.native="updatePayloadOnInput($event.target.value)"
               @keyup="updatePayloadOnInput($event.target.value)"/>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Input',
    props: {
      schemaKey: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.$nextTick(() => {
        window.addEventListener('load', () => {
          this.getFirstInputFocus()
        })
      })
    },
    beforeDestroy () {
      window.removeEventListener('load', () => {
        this.getFirstInputFocus()
      })
    },
    data () {
      return {
        bindInputProps: {
          ref: this.schemaKey.name,
          'data-cy': this.schemaKey.name,
          id: this.schemaKey.name,
          required: this.schemaKey.required,
          type: this.schemaKey.type || 'text',
          name: this.schemaKey.name,
          step: this.schemaKey.type === 'number' ? `any` : ``,
          placeholder: this.schemaKey.placeholder,
          'aria-placeholder': this.schemaKey.placeholder,
        }
      }
    },
    computed: {
      ...mapGetters(['hasPayloadErrorByField', 'getPayloadByField', 'getDisabledState', 'getFocusRef']),
      inputBaseModel: {
        get () {
          return this.getPayloadByField(this.schemaKey.name)
        },
        set (value) {
          this.$emit('onInputEventValueToCalculate', {key: this.schemaKey.name, value: value})
          this.updatePayloadOnInput(value)
        },
      },
      hasErrorsByField () {
        return this.hasPayloadErrorByField(this.schemaKey.name)
      },
      isDisabled () {
        return this.getDisabledState
      },
    },
    methods: {
      ...mapActions(['updatePayload', 'recordPayloadErrors', 'clearErrorsByField']),
      updatePayloadOnInput (value) {
        let key = this.schemaKey.name,
          data = { [`${key}`]: value }

        //hack for now until refactoring required for validating
        if(key === 'pinCode') {
          if (this.hasPayloadErrorByField(key)) this.clearErrorsByField(key)
        }

        this.$emit('validateOnKeyHalt', { key: this.schemaKey.name, value: value })

        return this.updatePayload(data)
      },
      getFirstInputFocus () {
        let focusRefs = this.getFocusRef
        if (this.schemaKey.name === focusRefs) {
          return this.$refs[focusRefs].focus()
        }
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
