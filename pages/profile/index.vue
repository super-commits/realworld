<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <nuxt-link
              v-if="user.username === profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>            
            <button      
              v-else
              class="btn btn-sm action-btn"
              :class="
                profile.following ? 'btn-secondary' : 'btn-outline-secondary'
              "
              :disabled="followDisabled"
              @click="onFollow(profile)"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "Unfollow" : "Follow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'my_articles' }"
                  :to="{
                    path:
                      user.username === profile.username
                        ? '/profile'
                        : '/profileOther',
                    query: {
                      tab: 'my_articles',
                      username: profile.username,
                    },
                  }"
                  exact
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'favorited_articles' }"
                  :to="{
                    path:
                      user.username === profile.username
                        ? '/profile'
                        : '/profileOther',
                    query: {
                      tab: 'favorited_articles',
                      username: profile.username,
                    },
                  }"
                  exact
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <article-preview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          ></article-preview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFollow, removeFollow, getProfile } from "@/api/user";
import { getArticles } from "@/api/article";
import { mapState } from "vuex";
import articlePreview from "../components/articlePreview";

export default {
  name: "profile",
  components: { articlePreview },
  watchQuery: ["tab", "username"],
  async asyncData({ query }) {
    const { username, tab = "my_articles" } = query;
    const data = { limit: 10, offset: 0 };

    tab === "favorited_articles"
      ? (data.favorited = username)
      : (data.author = username);

    const [articlesRes, profileRes] = await Promise.all([
      getArticles(data),
      getProfile(username),
    ]);

    const { articles } = articlesRes.data;
    const { profile } = profileRes.data;

    articles.forEach((article) => (article.disabled = false));

    return {
      articles,
      profile,
      followDisabled: false,
      tab,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onFollow(profile) {
      this.followDisabled = true;
      const username = profile.username;
      if (profile.following) {
        await removeFollow(username);
      } else {
        await addFollow(username);
      }
      profile.following = !profile.following;
      this.followDisabled = false;
    },
  },
};
</script>

<style>
</style>