<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter="addTag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="tag in article.tagList"
                    :key="tag"
                  >
                    <i class="ion-close-round" @click="delTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from "@/api/article";

export default {
  name: "createArticle",
  middleware: "authenticated",
  async asyncData({ query }) {
    let axiosSuccess = null;
    const slug = query.slug;
    if (slug) axiosSuccess = await getArticle(query.slug);
    return {
      article: (axiosSuccess && axiosSuccess.data.article) || { tagList: [] },
      slug,
    };
  },
  data() {
    return {
      errors: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.slug
          ? await updateArticle({ article: this.article }, this.slug)
          : await createArticle({ article: this.article });
        this.$router.push({
          path: "/article",
          query: { slug: data.article.slug },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    delTag(tag) {
      const tagIndex = this.article.tagList.findIndex((item) => item === tag);
      this.article.tagList.splice(tagIndex, 1);
    },
    addTag(e) {
      const value = e.target.value;
      const tag = this.article.tagList.find((tag) => tag === value);
      if (!tag) this.article.tagList.push(value);
    },
  },
};
</script>

<style>
</style>