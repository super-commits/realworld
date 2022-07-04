<template>
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
    <template v-if="Object.keys(user).length">
      <template v-if="user.username === article.author.username">
        <nuxt-link
          class="btn btn-outline-secondary btn-sm"
          :to="{ path: '/createArticle', query: { slug: article.slug } }"
        >
          <i class="ion-edit"></i> Edit Article
        </nuxt-link>
        <button class="btn btn-outline-danger btn-sm" @click="delArticle">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </template>
      <template v-else>
        <button
          class="btn btn-sm"
          :class="
            article.author.following ? 'btn-secondary' : 'btn-outline-secondary'
          "
          :disabled="followDisabled"
          @click="onFollow(article.author)"
        >
          <i class="ion-plus-round"></i>
          &nbsp; {{ article.author.following ? "Unfollow" : "Follow" }}
          {{ article.author.username }}
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm"
          :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
          :disabled="favoriteDisabled"
          @click="onFavorite(article)"
        >
          <i class="ion-heart"></i>
          &nbsp; {{ article.favorited ? "Unfavorite" : "Favorite" }} Article
          <span class="counter">({{ article.favoritesCount }})</span>
        </button>
      </template>
    </template>
  </div>
</template>

<script>
import { addFollow, removeFollow } from "@/api/user";
import { addFavorite, removeFavorite, delArticle } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "articleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followDisabled: false,
      favoriteDisabled: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async delArticle() {
      await delArticle(this.article.slug);
      this.$router.push("/");
    },

    async onFavorite(article) {
      this.favoriteDisabled = true;
      const slug = article.slug;
      if (article.favorited) {
        await removeFavorite(slug);
        article.favoritesCount -= 1;
      } else {
        await addFavorite(slug);
        article.favoritesCount += 1;
      }
      article.favorited = !article.favorited;
      this.favoriteDisabled = false;
    },

    async onFollow(author) {
      this.followDisabled = true;
      const username = author.username;
      if (author.following) {
        await removeFollow(username);
      } else {
        await addFollow(username);
      }
      author.following = !author.following;
      this.followDisabled = false;
    },
  },
};
</script>

<style>
</style>