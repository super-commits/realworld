<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link
        :to="{
          path:
            user.username === article.author.username
              ? '/profile'
              : '/profileOther',
          query: { username: article.author.username },
        }"
        ><img :src="article.author.image"
      /></nuxt-link>
      <div class="info">
        <nuxt-link
          class="author"
          :to="{
            path:
              user.username === article.author.username
                ? '/profile'
                : '/profileOther',
            query: { username: article.author.username },
          }"
          >{{ article.author.username }}</nuxt-link
        >
        <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
      </div>
      <button
        v-if="Object.keys(user).length"
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{ active: article.favorited }"
        @click="onFavorite(article)"
        :disabled="article.disabled"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link
      :to="{ path: '/article', query: { slug: article.slug } }"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>

<script>
import {
  addFavorite,
  removeFavorite,
} from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "articlePreview",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onFavorite(article) {
      article.disabled = true;
      if (article.favorited) {
        await removeFavorite(article.slug);
        article.favoritesCount -= 1;
      } else {
        await addFavorite(article.slug);
        article.favoritesCount += 1;
      }
      article.favorited = !article.favorited;
      article.disabled = false;
    },
  },  
};
</script>

<style>
</style>