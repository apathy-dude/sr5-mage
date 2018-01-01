<template>
  <v-container grid-list-xl fluid>
    <v-layout wrap>
      <v-flex xs12>
        <h1>Alchemy</h1>
      </v-flex>

      <v-flex xs12 lg2>
        <v-text-field label="Magic" type="number" v-model="magic"></v-text-field>
      </v-flex>

      <v-flex xs12 lg2>
        <v-text-field label="Edge" type="number" v-model="edge"></v-text-field>
      </v-flex>

      <v-flex xs12 lg2>
        <v-text-field label="Drain Resist" type="number" v-model="drainResist"></v-text-field>
      </v-flex>

      <v-flex xs12 lg2>
        <v-text-field label="Duration Modifier" type="number" v-model="durationModifier"></v-text-field>
      </v-flex>

      <v-flex xs12 lg2>
        <v-text-field label="Duration Multiplier" type="number" v-model="durationMultiplier"></v-text-field>
      </v-flex>

      <skill v-for="s in skills" :key="`alchemy-skill-${s}`" :skillName="s"></skill>

      <v-flex xs12>
        <h2>Formula</h2>
      </v-flex>

      <v-flex xs12 xl2>
        <v-card>
          <v-card-text>
            <h3>Preparation Settings</h3>
            <v-text-field label="Force" type="number" v-model="force"></v-text-field>
            <v-select label="Trigger"></v-select>
            <v-text-field label="Reagents" type="number" v-model="reagent"></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>

      <alchemy-formula-list v-for="category in spellCategories" :key="`${category}-formula`" :category="category"></alchemy-formula-list>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { SpellCategory } from '../interfaces/magicModels'

import { ATTRIBUTE, EDGE, MAGIC } from '../interfaces/attributes'
import { ALCHEMY } from '../interfaces/skills'
import { IPreparationTrigger } from '../interfaces/preparationModels'

import AlchemyFormulaListComponent from './alchemy/AlchemyFormulaList.vue'
import SkillComponent from './magician/Skill.vue'

import { IBasicMutation } from '../store/index'
import { ALCHEMY_MODULE, MAGICIAN_MODULE } from '../store/index'
import { ALCHEMY_DURATION_MULTIPLIER, ALCHEMY_DURATION_MODIFIER, DRAIN_RESIST } from '../store/magician'

@Component({
  name: 'alchemy',
  components: {
    'alchemy-formula-list': AlchemyFormulaListComponent,
    'skill': SkillComponent
  }
})
export default class Alchemy extends Vue {
  public force: number = 6
  public reagent: number = 0

  public skills: string[] = [ ALCHEMY ]
  public spellCategories: SpellCategory[] = [
    SpellCategory.COMBAT,
    SpellCategory.DETECTION,
    SpellCategory.HEALTH,
    SpellCategory.ILLUSION,
    SpellCategory.MANIPULATION
  ]

  get magic(): number { return this.$store.state[MAGICIAN_MODULE].attributes[MAGIC] }
  set magic(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${ATTRIBUTE}`, { field: MAGIC, value } as IBasicMutation<number>) }

  get edge(): number { return this.$store.state[MAGICIAN_MODULE].attributes[EDGE] }
  set edge(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${ATTRIBUTE}`, { field: EDGE, value } as IBasicMutation<number>) }

  get drainResist(): number { return this.$store.state[MAGICIAN_MODULE].drainResist }
  set drainResist(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${DRAIN_RESIST}`, value) }

  get durationModifier(): number { return this.$store.state[MAGICIAN_MODULE].alchemy.durationModifier }
  set durationModifier(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${ALCHEMY_DURATION_MODIFIER}`, value) }

  get durationMultiplier(): number { return this.$store.state[MAGICIAN_MODULE].alchemy.durationMultiplier }
  set durationMultiplier(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${ALCHEMY_DURATION_MULTIPLIER}`, value) }

  get triggers(): IPreparationTrigger[] { return Object.values(this.$store.state[ALCHEMY_MODULE].knownTriggers) }
}
</script>
