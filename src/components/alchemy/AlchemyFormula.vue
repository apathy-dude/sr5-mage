<template>
  <v-dialog v-if="form" v-model="show" persistent max-width="960px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ form.category | fromCaps }} Alchemy Formula</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md10>
              <v-text-field label="Name" v-model="form.name"></v-text-field>
            </v-flex>
            <v-flex xs12 md2>
              <v-text-field label="Drain" type="number" v-model="form.drain"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select label="Keywords" v-model="form.keywords" :items="keywords" item-text="label" item-value="key" chips multiple></v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-switch :label="`Type - ${form.type}` | fromCaps" v-model="form.type" hide-details true-value="PHYSICAL" false-value="MANA"></v-switch>
            </v-flex>
            <v-flex v-if="form.category === SpellCategory.COMBAT" xs12 md6>
              <v-switch :label="`Damage - ${form.damage}` | fromCaps" v-model="form.damage" :hint="form.damage | fromCaps" true-value="PHYSICAL" false-value="STUN"></v-switch>
            </v-flex>
            <v-flex xs12>
              <v-select label="Range" v-model="form.range" :items="range" item-text="label" item-value="key"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select label="Duration" v-model="form.duration" :items="duration" item-text="label" item-value="key"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Effect" multi-line v-model="form.effect"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions class="text-xs-right">
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close()">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { Guid } from '../../services/guidService'
import { fromCaps } from '../../filters/labelFilter'

import { SpellCategory } from '../../interfaces/magicModels'
import { ICombatSpellFormula, IDetectionSpellFormula, IHealthSpellFormula, IIllusionSpellFormula, IManipulationSpellFormula } from '../../interfaces/formulaModels'
import { IHasId } from '../../interfaces/util'

import { ALCHEMY_MODULE } from '../../store/index'
import { FORMULA } from '../../store/alchemy'

@Component({
  name: 'alchemy-formula',
  filters: {
    fromCaps
  }
})
export default class AlchemyFormula extends Vue {
  @Prop() public show: boolean
  @Prop() public id: string
  @Prop() public formula: (ICombatSpellFormula | IDetectionSpellFormula | IHealthSpellFormula | IIllusionSpellFormula | IManipulationSpellFormula) & IHasId
  @Prop() public close: () => void

  public form: ICombatSpellFormula | IDetectionSpellFormula | IHealthSpellFormula | IIllusionSpellFormula | IManipulationSpellFormula | null = null
  public SpellCategory: any = SpellCategory

  public mounted(): void {
    this.form = Object.assign({}, this.formula)
  }

  public save(): void {
    // TODO: Validate
    const id = this.formula.id || Guid.newGuid()
    this.$store.commit(`${ALCHEMY_MODULE}/${FORMULA}`, { ...this.form, id })

    this.close()
  }

  get range(): Array<{ key: string, label: string}> {
    return [{ key: 'TOUCH', label: 'Touch' },
            { key: 'LOS', label: 'LOS' },
            { key: 'LOS (A)', label: 'LOS (A)'}]
  }

  get duration(): Array<{ key: string, label: string}> {
    return ['INSTANTANEOUS', 'SUSTAINED', 'PERMANANT']
      .map(v => ({ key: v, label: fromCaps(v) }))
  }

  get keywords(): Array<{ key: string, label: string}> {
    switch (this.formula.category) {
      case SpellCategory.COMBAT:
        return ['DIRECT', 'INDIRECT', 'ELEMENTAL']
          .map(v => ({ key: v, label: fromCaps(v) }))
      case SpellCategory.DETECTION:
        return ['ACTIVE', 'PASSIVE', 'DIRECTIONAL', 'PSYCHIC', 'AREA', 'EXTENDED_AREA']
          .map(v => ({ key: v, label: fromCaps(v) }))
      case SpellCategory.HEALTH:
        return ['ESSENCE']
          .map(v => ({ key: v, label: fromCaps(v) }))
      case SpellCategory.ILLUSION:
        return ['OBVIOUS', 'REALISTIC', 'SINGLE_SENSE', 'MULTI_SENSE']
          .map(v => ({ key: v, label: fromCaps(v) }))
      case SpellCategory.MANIPULATION:
        return ['DAMAGING', 'MENTAL', 'ENVIRONMENTAL', 'PHYSICAL', 'AREA']
          .map(v => ({ key: v, label: fromCaps(v) }))
      default:
        // TODO: Warn
        return []
    }
  }
}
</script>
