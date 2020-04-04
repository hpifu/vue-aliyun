<template>
  <v-navigation-drawer floating color="rgb(0, 0, 0, 0)" app cliped>
    <v-flex xs12>
      <v-card height="100" color="rgb(0, 0, 0, 0)" flat></v-card>
    </v-flex>
    <v-list dense rounded>
      <v-list-item-group v-model="idx" color="primary">
        <template v-for="(item, i) in items">
          <template v-if="item.divider">
            <v-divider :key="i"></v-divider>
          </template>
          <template v-else>
            <v-list-item :to="item.to" :key="i">
              <!-- <v-list-item-icon>
                <v-icon filled>{{ item.icon }}</v-icon>
              </v-list-item-icon>-->
              <v-list-item-content>
                <v-list-item-title>
                  <span>{{ item.title }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      idx: 1,
      items: [
        { title: "智能媒体管理", icon: "mdi-emoticon", to: "/imm" },
        { title: "对象存储", icon: "mdi-emoticon", to: "/hash" },
        { title: "表格存储", icon: "mdi-emoticon", to: "/decimal" },
        { title: "秘钥管理", icon: "mdi-emoticon", to: "/credential" },
        { title: "地址管理", icon: "mdi-emoticon", to: "/endpoint" }
        // { divider: true },
      ]
    };
  }
};
</script>
