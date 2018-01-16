<template>
  <v-dialog max-width="960px" v-if="message" lazy :persistent="message.persistent" v-model="message">
    <component :is="message.message"></component>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { MESSAGE } from '../store/index'
import { IMessage } from '../interfaces/messageModels'

@Component({
  name: 'message'
})
export default class Message extends Vue {
  get message(): IMessage {
    return this.$store.state.message
  }
  set message(value): IMessage {
    this.$store.commit(MESSAGE, value)
  }
}
</script>
