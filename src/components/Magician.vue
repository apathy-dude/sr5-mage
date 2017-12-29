<template>
  <v-container grid-list-xl fluid>
    <v-layout wrap>
      <v-flex xs12>
        <h1>Magician</h1>
      </v-flex>
      <v-flex xs12 lg4>
        <v-text-field label="Drain Resist" type="number" v-model="drainResist"></v-text-field>
      </v-flex>
      <v-flex xs12 lg4>
        <v-text-field label="Magic" type="number" v-model="magic"></v-text-field>
      </v-flex>
      <v-flex xs12 lg4>
        <v-text-field label="Sustain Penalty" type="number" v-model="sustainPenalty"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <h2>Skills</h2>
      </v-flex>
      <skill v-for="s in skills" :key="s" :skillName="s"></skill>
      <v-flex xs12>
        <h2>Stun Track</h2>
      </v-flex>
      <damage :damageTrack="stunTrack"></damage>
      <v-flex xs12>
        <h2>Physical Track</h2>
      </v-flex>
      <damage :damageTrack="physicalTrack"></damage>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import { Component } from 'vue-property-decorator'

import SkillComponent from './magician/Skill.vue'
import DamageTrackComponent from './magician/DamageTrack.vue'

import { ATTRIBUTE, MAGIC } from '../interfaces/attributes'
import { ALCHEMY, BINDING, RITUAL_SPELLCASTING, SPELLCASTING, SUMMONING } from '../interfaces/skills'
import { PHYSICAL, STUN } from '../interfaces/damageTracks'

import { MAGICIAN_MODULE } from '../store/index'

@Component({
  name: 'magician',
  components: {
    skill: SkillComponent as ComponentOptions<Vue>,
    damage: DamageTrackComponent as ComponentOptions<Vue>
  }
})
export default class Magician extends Vue {
  public skills: string[] = [ ALCHEMY, BINDING, RITUAL_SPELLCASTING, SPELLCASTING, SUMMONING ]
  public stunTrack: string = STUN
  public physicalTrack: string = PHYSICAL

  // Attributes
  get [MAGIC](): number { return this.$store.state[MAGICIAN_MODULE].attributes[MAGIC] }
  set [MAGIC](value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${ATTRIBUTE}`, { field: MAGIC, value }) }

  // OTHER
  get drainResist(): number { return this.$store.state[MAGICIAN_MODULE].drainResist }
  set drainResist(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/DRAIN_RESIST`, value) }

  get sustainPenalty(): number { return this.$store.state[MAGICIAN_MODULE].sustainPenalty }
  set sustainPenalty(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/SUSTAIN_PENALTY`, value) }
}
</script>
