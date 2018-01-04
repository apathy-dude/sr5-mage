<template>
  <v-flex xs12 xl2>
    <v-card>
      <v-card-text>
        <h3>{{ category | fromCaps }}</h3>
        <v-speed-dial
          v-if="!quickCast"
          v-for="(p, i) in formula" :key="`${category}-${i}`"
          hover
          direction="left"
          transition="slide-x-reverse-transition"
          >
          <v-btn slot="activator" block hover>{{ p.name }}</v-btn>
          <v-btn small fab dark class="blue" @click.stop="editFunc(p.id, p)"><v-icon>edit</v-icon></v-btn>
          <v-btn small fab dark class="red" @click.stop="deleteFunc(p.id)"><v-icon>delete</v-icon></v-btn>
          <v-btn small fab>Roll</v-btn>
          <v-btn small fab>Edge</v-btn>
        </v-speed-dial>
        <v-btn
          v-if="quickCast"
          v-for="(p, i) in formula" :key="`${category}-${i}`"
          slot="activator"
          block hover
        >{{ p.name }}</v-btn>
        <v-btn fab small absolute top right @click.stop="createFunc(category)" color="primary"><v-icon>add</v-icon></v-btn>
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

@Component({
  name: 'alchemy-formula-list',
  filters: {
    fromCaps
  }
})
export default class AlchemyFormulaList extends Vue {
  @Prop({ required: true }) public category: SpellCategory
  @Prop({ required: true }) public quickCast: boolean

  @Prop({ required: true }) public createFunc: (category: SpellCategory) => void
  @Prop({ required: true }) public editFunc: (id: string, formula: ISpellFormula) => void
  @Prop({ required: true }) public deleteFunc: (id: string) => void

  get formula(): Array<ISpellFormula & { id: string }> {
    const formula: Array<ISpellFormula & { id: string }> = this.$store.state.alchemy.knownFormula
    return formula.filter(f => f.category === this.category)
  }
}
</script>
