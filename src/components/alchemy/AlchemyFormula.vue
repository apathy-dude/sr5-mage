<template>
  <div>Alchemy Formula - {{ formula.name }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { SpellCategory } from '../../interfaces/magicModels'
import { ISpellFormula } from '../../interfaces/formulaModels'
import { IPreparation } from '../../interfaces/preparationModels'

@Component({
  name: 'alchemy-formula'
})
export default class AlchemyFormula extends Vue {
  get formula(): ISpellFormula {
    if (!this.$route.params.id) {
      const formula: ISpellFormula = {
        name: '',
        drain: 0,
        effect: '',
        category: SpellCategory.COMBAT,
        type: 'MANA',
        range: 'TOUCH',
        duration: 'INSTANTANEOUS'
      }
      return formula
    }

    const form = this.$store.state.alchemy.knownFormula[this.$route.params.id]

    if (!form) {
      // Log and redirect
    }

    return form
  }
}
</script>
