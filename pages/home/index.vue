<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="Object.keys(user).length">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ path: '/', query: { tab: 'your_feed' } }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ path: '/', query: { tab: 'global_feed' } }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ path: '/', query: { tab: 'tag' } }"
                  exact
                  >{{ tag }}</nuxt-link
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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{ path: '/', query: { tab: 'tag', tag } }"
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTags } from "@/api/tags";
import { getArticles, getFeedArticles } from "@/api/article";
import { mapState } from "vuex";
import articlePreview from "../components/articlePreview";

export default {
  name: "home",
  components: { articlePreview },
  watchQuery: ["tag", "tab"],
  async asyncData({ query, store }) {
    // const page = Number.parseInt(query.page || 1);
    const { length } = Object.keys(store.state.user);
    const { tag } = query;
    const tab = query.tab || (length ? "your_feed" : "global_feed");
    // const limit = 10;
    const loadArticles =
      length && tab === "your_feed" ? getFeedArticles : getArticles;

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        tag,
        limit: 10,
        // offset: (page - 1) * limit,
        offset: 0,
      }),
      getTags(),
    ]);

    const { articles } = articleRes.data;
    const { tags } = tagRes.data;

    articles.forEach((article) => (article.disabled = false));

    return {
      tab,
      tag,
      articles,
      tags,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>