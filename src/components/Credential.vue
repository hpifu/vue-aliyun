<template>
  <v-layout justify-center row fill-height text-center>
    <v-flex xs10 md8 lg8 xl6 text-center>
      <v-layout wrap text-center>
        <v-flex xs3 mb-4>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="green"
            @click="createCredential"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="indigo"
            @click="saveCredential"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="error"
            @click="cancel"
          >
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3>
          <v-btn
            class="ma-2"
            outlined
            x-small
            fab
            color="error"
            @click="deleteCredential"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="accessKeyID"
            outlined
            label="access key id"
            :disabled="readonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="accessKeySecret"
            outlined
            label="access key secret"
            :disabled="readonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            v-if="this.readonly"
            v-model="credential"
            :items="credentials"
            label="credential"
            required
            outlined
          ></v-select>
          <v-text-field
            v-else
            v-model="credential"
            outlined
            label="credential"
            :disabled="readonly"
          ></v-text-field>
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
    await this.loadCredential();
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.num2);
      } catch (err) {
        this.errors = [err];
      }
    },
    async loadCredential() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/credential", {
          withCredentials: true
        });
        if (res.status != 200) {
          console.log(res);
          return;
        }
        this.credentials = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    createCredential() {
      this.readonly = false;
    },
    cancel() {
      this.readonly = true;
    },
    async saveCredential() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/credential",
          {
            filename: this.credential,
            accessKeyID: this.accessKeyID,
            accessKeySecret: this.accessKeySecret
          },
          {
            withCredentials: true
          }
        );
        console.log(res);
        this.readonly = true;
        this.loadCredential();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCredential() {
      try {
        const res = await axios.delete(
          "http://127.0.0.1:8000/credential/" + this.credential,
          {},
          {
            withCredentials: true
          }
        );
        console.log(res);
        this.readonly = true;
        this.loadCredential();
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch: {
    credential: function(val) {
      if (!this.readonly) {
        return;
      }
      axios
        .get("http://127.0.0.1:8000/credential/" + val)
        .then(res => {
          console.log(res);
          this.accessKeyID = res.data.accessKeyID;
          this.accessKeySecret = res.data.accessKeySecret;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data: function() {
    return {
      readonly: true,
      credential: null,
      credentials: [],
      accessKeyID: "",
      accessKeySecret: ""
    };
  }
};
</script>
