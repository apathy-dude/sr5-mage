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
          <v-btn small fab @click.stop="rollFunc(p)">Roll</v-btn>
          <v-btn small fab dark class="blue" @click.stop="editFormulaFunc(p.id, p)"><v-icon>edit</v-icon></v-btn>
          <v-btn small fab dark class="red" @click.stop="deleteFormulaFunc(p.id)"><v-icon>delete</v-icon></v-btn>
        </v-speed-dial>
        <v-btn
          v-if="quickCast"
          v-for="(p, i) in formula" :key="`${category}-${i}`"
          slot="activator"
          block
          hover
          @click.stop="rollFunc(p)"
        >{{ p.name }}</v-btn>
        <v-btn fab small absolute top right @click.stop="newFormulaFunc(category)" color="primary"><v-icon>add</v-icon></v-btn>
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

  @Prop({ required: true }) public newFormulaFunc: (category: SpellCategory) => void
  @Prop({ required: true }) public editFormulaFunc: (id: string, formula: ISpellFormula) => void
  @Prop({ required: true }) public deleteFormulaFunc: (id: string) => void
  @Prop({ required: true }) public rollFunc: (formula: ISpellFormula) => void

  get formula(): ISpellFormula[] {
    const formula: ISpellFormula[] = this.$store.state.alchemy.knownFormula
    return formula.filter(f => f.category === this.category)
  }
}
</script>
