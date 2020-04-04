<template>
  <v-layout justify-center row fill-height text-center>
    <v-flex xs10 md8 lg8 xl6 text-center>
      <v-layout wrap text-center>
        <v-flex xs4 mb-4>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="green"
            @click="createEndpoint"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="indigo"
            @click="saveEndpoint"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="error"
            @click="cancel"
          >
            <v-icon>mdi-undo</v-icon></v-btn
          >
        </v-flex>
        <v-flex xs12>
          <v-select
            v-model="category"
            :items="categorys"
            label="category"
            required
            outlined
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-if="!this.readonly"
            v-model="endpoint"
            outlined
            label="endpoint"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 text-left>
          <v-list flat rounded color="rgb(0, 0, 0, 0)">
            <v-list-item-group v-model="idx">
              <v-list-item v-for="(e, i) in endpoints" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="e"></v-list-item-title>
                </v-list-item-content>
                <v-btn
                  class="ma-2"
                  outlined
                  x-small
                  fab
                  color="error"
                  @click="deleteEndpoint(e)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-flex>
      </v-layout>
      <v-layout wrap text-left></v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
const axios = require("axios");

export default {
  async mounted() {
    await this.loadCategory();
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.num2);
      } catch (err) {
        this.errors = [err];
      }
    },
    async loadCategory() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/endpoint", {
          withCredentials: true
        });
        console.log(res);
        if (res.status != 200) {
          return;
        }
        this.categorys = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    createEndpoint() {
      this.readonly = false;
    },
    cancel() {
      this.readonly = true;
    },
    async saveEndpoint() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/endpoint/" + this.category,
          {
            endpoint: this.endpoint
          },
          {
            withCredentials: true
          }
        );
        console.log(res);
        this.readonly = true;
        this.loadEndpoints();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteEndpoint(e) {
      try {
        const res = await axios.delete(
          "http://127.0.0.1:8000/endpoint/" + this.category,
          {
            data: {
              endpoint: e
            }
          },
          {
            withCredentials: true
          }
        );
        console.log(res);
        this.readonly = true;
        this.loadEndpoints();
      } catch (err) {
        console.log(err);
      }
    },
    loadEndpoints() {
      if (!this.readonly) {
        return;
      }
      axios
        .get("http://127.0.0.1:8000/endpoint/" + this.category)
        .then(res => {
          console.log(res);
          this.endpoints = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    category: function() {
      this.loadEndpoints();
    }
  },
  data: function() {
    return {
      readonly: true,
      category: null,
      categorys: [],
      endpoints: [],
      endpoint: "",
      idx: 0
    };
  }
};
</script>
