<template>
  <v-app>
    <v-navigation-drawer
      fixed
      app
      v-model="drawer"
    >
      <v-list>
        <!-- TODO Apply filters -->
        <v-text-field append-icon="search" placeholder="Filter" clearable hide-details single-line></v-text-field>

        <v-divider></v-divider>

        <v-list-tile class="grey lighten-3" to="/alchemy">
          <v-list-tile-title>Alchemy</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          class="ml-2"
          v-for="(prep, i) in preparations"
          :key="'p' + i"
          :to="'/alchemy/' + prep.key"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="prep.value.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ prep.value | prepDuration }}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile class="grey lighten-3" to="/conjuring">
          <v-list-tile-title>Conjuring</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          class="ml-2"
          v-for="(item, i) in spirits"
          :key="'g' + i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-badge overlap>
              <span slot="badge" v-text="item.services"></span>
              <v-icon v-if="item.bound">lock</v-icon>
              <v-icon v-if="!item.bound">brightness_4</v-icon>
            </v-badge>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile class="grey lighten-3" to="/ritual">
          <v-list-tile-title>Ritual Spellcasting</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          class="ml-2"
          v-for="(item, i) in rituals"
          :key="'r' + i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ item.duration }}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile class="grey lighten-3" to="/spellcasting">
          <v-list-tile-title>Spellcasting</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile
          class="ml-2"
          v-for="(item, i) in spells"
          :key="'s' + i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile class="grey lighten-3" to="/magician">
          <v-list-tile-title>Magician</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/settings" icon><v-icon>settings</v-icon></v-btn>
      <v-btn to="/magician" icon><v-icon>home</v-icon></v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <router-view></router-view>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { IPreparation } from './interfaces/preparationModels'

interface IKeyValue<T> {
  key: string
  value: T
}

@Component({
  name: 'app',
  filters: {
    prepDuration(prep: IPreparation): string {
      return `${prep.initialPotency} hours`
    }
  }
})
export default class extends Vue {
  public drawer: boolean = true
  public fixed: boolean = true
  public title: string = 'SR5-Mage'

  get spells(): any[] {
    return [
      { title: 'Spell Text 1', sustained: false },
      { title: 'Spell Text 2', sustained: false },
      { title: 'Spell Text 3', sustained: true }
    ]
  }

  get preparations(): Array<IKeyValue<IPreparation>> {
    const preps: { [key: string]: IPreparation } = this.$store.state.alchemy.preparations
    return Object.keys(preps).map(key => {
      return { key, value: preps[key] }
    })
  }

  get rituals(): any[] {
    return [
      { title: 'Ritual Text 1', duration: '1 day' },
      { title: 'Ritual Text 2', duration: '7 days' }
    ]
  }

  get spirits(): any[] {
    return [
      { title: 'Spirit Text 1', bound: false, services: 3 },
      { title: 'Spirit Text 2', bound: true, services: 1 }
    ]
  }
}
</script>
