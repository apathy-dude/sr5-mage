<template>
  <div>Preparation - {{ preparation.name }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { IPreparation } from '../../interfaces/preparationModels'

@Component({
  name: 'preparation'
})
export default class Preparation extends Vue {
  get preparation(): IPreparation {
    return this.$store.state.alchemy.preparations[this.$route.params.id]
  }
}
</script>
