<template>
  <v-flex xs12>
    <v-layout wrap>
      <v-flex xs12 sm6 xl3>
        <v-text-field label="Max" type="number" v-model="max"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 xl3>
        <v-text-field label="Current" type="number" v-model="current"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 xl3>
        <v-text-field label="Penalty Divisor" type="number" v-model="penaltyDivisor"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 xl3>
        <v-text-field label="Penalty Modifier" type="number" v-model="penaltyModifier"></v-text-field>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { SKILL } from '../../interfaces/skills'
import { DAMAGE_TRACK_MAX, DAMAGE_TRACK_CURRENT, DAMAGE_TRACK_PENALTY_DIVISOR, DAMAGE_TRACK_PENALTY_MODIFIER } from '../../interfaces/damageTracks'

import { MAGICIAN_MODULE } from '../../store/index'

@Component({
  name: 'damage-track'
})
export default class DamageTrackComponent extends Vue {
  @Prop() public damageTrack: string

  get max(): number { return this.$store.state[MAGICIAN_MODULE].damageTracks[this.damageTrack].max }
  set max(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${DAMAGE_TRACK_MAX}`, { field: this.damageTrack, value }) }

  get current(): number { return this.$store.state[MAGICIAN_MODULE].damageTracks[this.damageTrack].current }
  set current(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${DAMAGE_TRACK_CURRENT}`, { field: this.damageTrack, value }) }

  get penaltyDivisor(): number { return this.$store.state[MAGICIAN_MODULE].damageTracks[this.damageTrack].penaltyDivisor }
  set penaltyDivisor(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${DAMAGE_TRACK_PENALTY_DIVISOR}`, { field: this.damageTrack, value }) }

  get penaltyModifier(): number { return this.$store.state[MAGICIAN_MODULE].damageTracks[this.damageTrack].penaltyModifier }
  set penaltyModifier(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${DAMAGE_TRACK_PENALTY_MODIFIER}`, { field: this.damageTrack, value }) }
}
</script>
