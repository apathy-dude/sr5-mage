<template>
  <div>Preparation - {{ id }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'preparation'
})
export default class Preparation extends Vue {
  public id: string = ''

  public mounted(): void {
    this.id = this.$route.params.id
  }
}
</script>
