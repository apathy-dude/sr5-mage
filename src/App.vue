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

        <v-list-tile>
          <v-list-tile-title>Preparations</v-list-tile-title>
          <v-list-tile-action-text><v-icon>add</v-icon></v-list-tile-action-text>
        </v-list-tile>
        <v-list-tile
          class="ml-2"
          v-for="(item, i) in preparations"
          :key="'p' + i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ item.duration }}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile>
          <v-list-tile-title>Sustained Spells</v-list-tile-title>
          <v-list-tile-action-text><v-icon>add</v-icon></v-list-tile-action-text>
        </v-list-tile>
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

        <v-list-tile>
          <v-list-tile-title>Rituals</v-list-tile-title>
          <v-list-tile-action-text><v-icon>add</v-icon></v-list-tile-action-text>
        </v-list-tile>
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

        <v-list-tile>
          <v-list-tile-title>Spirits</v-list-tile-title>
          <v-list-tile-action-text><v-icon>add</v-icon></v-list-tile-action-text>
        </v-list-tile>
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

      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
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

export default {
  data() {
    return {
      drawer: true,
      fixed: true,
      title: 'SR5-Mage',
      visible: {
        preparations: true,
        spells: true,
        rituals: true,
        spirits: true
      }
    }
  },
  computed: {
    spells() {
      return [
        { title: 'Spell Text 1', sustained: false },
        { title: 'Spell Text 2', sustained: false },
        { title: 'Spell Text 3', sustained: true }
      ]
    },
    preparations() {
      return [
        { title: 'Prep Text 1', duration: '1 hour' },
        { title: 'Prep Text 2', duration: '2 hours' },
        { title: 'Prep Text 3', duration: '6 hours' }
      ]
    },
    rituals() {
      return [
        { title: 'Ritual Text 1', duration: '1 day' },
        { title: 'Ritual Text 2', duration: '7 days' }
      ]
    },
    spirits() {
      return [
        { title: 'Spirit Text 1', bound: false, services: 3 },
        { title: 'Spirit Text 2', bound: true, services: 1 }
      ]
    }
  }
}
</script>

