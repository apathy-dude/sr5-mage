<template>
  <v-card>
    <v-card-title>
      <h3>{{ details.name }}</h3>
    </v-card-title>

    <v-card-text>
      <p>Force: {{ details.force }}</p>
      <p>Limit: {{ details.limit || 'None' }}</p>
      <p v-if="details.drain">Drain: {{ drain(details.drain.details) }} <span @click.stop="showDrainDetails = !showDrainDetails">[DETAILS]</span></p>
      <div class="ml2" v-if="showDrainDetails">
        <p v-for="(d, i) in details.drain.details" :key="`drainDetails-${i}`">
          <strong>{{ d.label }}</strong> => {{ d.value }}
        </p>
      </div>

      <p v-if="details.roll">The Roll ({{ hits(details.roll.roll) }}) => {{ details.roll.roll.join(', ') }}</p>
      <p v-if="details.roll && details.roll.preEdge && details.roll.preEdge.length > 0">Pre-edge ({{ hits(details.roll.preEdge) }}) => {{ details.roll.preEdge.join(', ') }}</p>
      <p v-if="details.roll && details.roll.postEdge && details.roll.postEdge.length > 0">Post-edge ({{ hits(details.roll.postEdge) }}) => {{ details.roll.postEdge.join(', ') }}</p>
      <p v-if="details.roll && details.roll.opposition && details.roll.opposition.length > 0">Opposition ({{ hits(details.roll.opposition) }}) => {{ details.roll.opposition.join(', ') }}</p>

      <p v-if="details.drain && details.drain.roll && details.drain.roll.length > 0">Drain Resist ({{ hits(details.drain.roll) }}) => {{ details.drain.roll.join(', ') }}</p>
      <p v-if="details.drain && details.drain.preEdge && details.drain.preEdge.length > 0">Pre-edge ({{ hits(details.drain.preEdge) }}) => {{ details.drain.preEdge.join(', ') }}</p>
      <p v-if="details.drain && details.drain.postEdge && details.drain.postEdge.length > 0">Post-edge ({{ hits(details.drain.postEdge) }}) => {{ details.drain.postEdge.join(', ') }}</p>
    </v-card-text>

    <v-card-actions v-if="state === 'MAGIC'">
      <v-spacer></v-spacer>
      <v-btn v-if="canPostEdge" @click.stop="postEdge()">Post Edge ({{ postEdgeDice }})</v-btn>
      <v-btn @click.stop="rollDrain(true)">Resist Drain (Pre Edge)</v-btn>
      <v-btn @click.stop="rollDrain(false)">Resist Drain</v-btn>
    </v-card-actions>

    <v-card-actions v-if="state === 'DRAIN'">
      <v-spacer></v-spacer>
      <v-btn v-if="canPostEdgeDrain" @click.stop="postEdgeDrain()">Post Edge ({{ postEdgeDrainDice }})</v-btn>
      <v-btn @click.stop="applyEffects()">Apply Effects</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { IMagicCreation } from '../../interfaces/magicModels'
import { EDGE, MAGIC } from '../../interfaces/attributes'
import { DamageTracks } from '../../interfaces/damageTracks'

import { MAGIC_CREATION, MESSAGE } from '../../store/index'

import { roll } from '../../services/diceService'

@Component({
  name: 'roll-magic-card'
})
export default class RollMagicCard extends Vue {
  public showDrainDetails: boolean = false

  get state(): 'MAGIC' | 'DRAIN' {
    return this.details && this.details.drain && this.details.drain.roll && this.details.drain.roll.length > 0
      ? 'DRAIN'
      : 'MAGIC'
  }

  get details(): IMagicCreation {
    return this.$store.state.magicCreation
  }
  set details(details: IMagicCreation) {
    this.$store.commit(MAGIC_CREATION, details)
  }

  get canPostEdge(): boolean {
    return !!this.details
      && !!this.details.roll
      && (!this.details.roll.preEdge || this.details.roll.preEdge.length === 0)
      && (!this.details.roll.postEdge || this.details.roll.postEdge.length === 0)
      && this.postEdgeDice > 0
  }

  get canPostEdgeDrain(): boolean {
    return !!this.details
      && !!this.details.drain
      && (!this.details.drain.preEdge || this.details.drain.preEdge.length === 0)
      && (!this.details.drain.postEdge || this.details.drain.postEdge.length === 0)
      && this.postEdgeDrainDice > 0
  }

  get postEdgeDice(): number {
    if (!this.details || !this.details.roll)
      return 0

    return this.postEdgeDiceCount(this.details.roll.roll)
  }

  get postEdgeDrainDice(): number {
    if (!this.details || !this.details.drain || !this.details.drain.roll)
      return 0

    return this.postEdgeDiceCount(this.details.drain.roll)
  }

  public hits(dice: number[]): number {
    return dice.filter(d => d > 4).length
  }

  public drain(drainDetail: Array<{ label: string, value: string }>): number {
    return drainDetail
      .map(d => parseInt(d.value, 10))
      .reduce((s, d) => s + d, 0)
  }

  public postEdge(): void {
    const r = { ...this.details.roll }

    const dice = this.postEdgeDice
    r.postEdge = roll(dice)

    this.details = {
      ...this.details,
      roll: r
    }
  }

  public postEdgeDrain(): void {
    const r = { ...this.details.drain }

    const dice = this.postEdgeDrainDice
    r.postEdge = roll(dice)

    this.details = {
      ...this.details,
      drain: r
    }
  }

  public rollDrain(preEdge: boolean): void {
    const hits: number = this.hits(
      this.details.roll.roll
        .concat(this.details.roll.preEdge)
        .concat(this.details.roll.postEdge)
    )

    const limit: number = this.details.limit
    const magic: number = this.$store.state.magician.attributes[MAGIC]
    const actualHits = hits > limit ? hits : limit

    const drain = {
      ...this.details.drain
    }

    const r = {
      ...this.details.roll
    }

    if (r.oppositionDiePool > 0) {
      r.opposition = roll(r.oppositionDiePool)

      if (drain.oppositionDrainMultiplier > 0)
        drain.details.push({ label: 'Opposition', value: this.hits(r.opposition) * drain.oppositionDrainMultiplier })
    }

    if (preEdge) {
      const edge: number = this.$store.state.magician.attributes[EDGE]
      drain.preEdge = roll(edge) // TODO: Get edge
    }

    drain.roll = roll(this.details.drain.drainResistDice)
    drain.postEdge = []
    drain.drainType = actualHits > magic
      ? DamageTracks.PHYSICAL
      : DamageTracks.STUN

    this.details = {
      ...this.details,
      drain,
      roll: r
    }
  }

  public applyEffects(): void {
    this.$store.commit(MESSAGE, null)
    this.$store.dispatch(this.details.createdAction, this.details)
  }

  private postEdgeDiceCount(dieRoll: number[]): number {
    return dieRoll.filter(r => r < 5).length
  }
}
</script>

