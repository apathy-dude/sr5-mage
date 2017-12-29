<template>
  <v-flex xs12 sm6 xl2>
    <v-text-field :label="skillName | labelFilter" type="number" v-model="skillValue"></v-text-field>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { SKILL } from '../../interfaces/skills'

import { MAGICIAN_MODULE } from '../../store/index'

@Component({
  name: 'skill',
  filters: {
    labelFilter(label: string): string {
      return label
        .substring(1)
        .split('')
        .map(a => a.match(/[A-Z]/) ? ' ' + a : a)
        .reduce((rLabel, a) => rLabel + a, label.charAt(0).toUpperCase())
    }
  }
})
export default class Skill extends Vue {
  @Prop() public skillName: string

  get skillValue(): number { return this.$store.state[MAGICIAN_MODULE].skills[this.skillName] }
  set skillValue(value: number) { this.$store.commit(`${MAGICIAN_MODULE}/${SKILL}`, { field: this.skillName, value }) }
}
</script>

