<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form
            v-if="Object.keys(user).length"
            class="card comment-form"
            @submit.prevent="addComment"
          >
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="comment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
              <nuxt-link
                :to="{
                  path:
                    user.username === comment.author.username
                      ? '/profile'
                      : '/profileOther',
                  query: { username: comment.author.username },
                }"
                class="comment-author"
              >
                <img :src="comment.author.image" class="comment-author-img" />
              </nuxt-link>
              &nbsp;
              <nuxt-link
                :to="{
                  path:
                    user.username === comment.author.username
                      ? '/profile'
                      : '/profileOther',
                  query: { username: comment.author.username },
                }"
                class="comment-author"
                >{{ comment.author.username }}</nuxt-link
              >
              <span class="date-posted">{{
                comment.createdAt | date("MMM DD, YYYY")
              }}</span>
              <span
                @click="delComment(comment.id)"
                class="mod-options"
                v-if="user.username === comment.author.username"
              >
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, getComments, addComment, delComment } from "@/api/article";
import articleMeta from "./components/articleMeta";
import MarkDownIt from "markdown-it";
import { mapState } from "vuex";

export default {
  name: "article",
  components: { articleMeta },
  async asyncData({ query }) {
    const { slug } = query;

    const [articleRes, commentRes] = await Promise.all([
      getArticle(slug),
      getComments(slug),
    ]);

    const { article } = articleRes.data;
    const { comments } = commentRes.data;

    const md = new MarkDownIt();
    article.body = md.render(article.body);

    return {
      article,
      comments,
      comment: "",
      slug,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async addComment() {
      const slug = this.slug;
      await addComment(slug, {
        comment: {
          body: this.comment,
        },
      });
      const { data } = await getComments(slug);
      this.comments = data.comments;
      this.comment = "";
    },

    async delComment(id) {
      const slug = this.slug;
      await delComment(slug, id);
      const { data } = await getComments(slug);
      this.comments = data.comments;
    },
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>