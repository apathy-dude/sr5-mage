<template>
  <v-flex xs12 xl2>
    <v-card>
      <v-card-text>
        <h3 class="text-xs-center">{{ category | fromCaps }}</h3>
        <v-speed-dial
          v-for="(p, i) in formula" :key="`${category}-${i}`"
          hover
          direction="bottom"
          transition="slide-y-reverse-transition"
          >
          <v-btn slot="activator" flat block hover>{{ p.value.name }}</v-btn>
          <v-btn small fab dark class="blue" :to="`/alchemy/formula/${p.key}`"><v-icon>edit</v-icon></v-btn>
          <v-btn small fab dark class="red"><v-icon>delete</v-icon></v-btn>
          <v-btn small fab>Roll</v-btn>
          <v-btn small fab>Edge</v-btn>
        </v-speed-dial>
        <v-btn fab small absolute top left color="primary"><v-icon>add</v-icon></v-btn>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { fromCaps } from '../../filters/labelFilter'

import { SpellCategory } from '../../interfaces/magicModels'
import { ISpellFormula } from '../../interfaces/formulaModels'
import { IKeyValue } from '../../interfaces/util'

@Component({
  name: 'skill',
  filters: {
    fromCaps
  }
})
export default class Skill extends Vue {
  @Prop({ required: true }) public category: SpellCategory

  get formula(): Array<IKeyValue<ISpellFormula>> {
    return Object.keys(this.$store.state.alchemy.knownFormula)
      .map(k => {
        return { key: k, value: this.$store.state.alchemy.knownFormula[k] }
      })
      .filter(k => k.value.category === this.category)
  }
}
</script>
