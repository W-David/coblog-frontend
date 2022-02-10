<template>
  <div class="home-container">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
        <article-card :article="article"></article-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'

export default {
  name: 'home',
  components: { ArticleCard },
  setup() {
    const article = reactive({
      title: '这是一段知乎找来的句子合集',
      content: `我们都是在夜里崩溃过的人, 我们都是心里头有部分死掉了的人,我们每天都在变得更无所谓 ，我们拒绝了煽情之后的每一天都在哈哈哈， 在我们堆砌起来的不羁里， 总该有什么藏在最深处吧， 已经很努力地把人生过成喜剧，却仍有唏嘘在心头,人生是一场旅程。
			          我们经历了几次轮回，才换来这个旅程。而这个旅程很短，因此不妨大胆一些，不妨大胆一些去爱一个人，去攀一座山，去追一个梦……有很多事我都不明白。但我相信一件事：上天让我们来到这个世上，就是为了让我们创造奇迹。不必太纠结于当下，也不必太忧虑未来，快乐的时候不要想以后，痛哭的时候多想想将来，当你经历过一些事情的时候，眼前的风景已经和从前不一样了，哪里会有人喜欢孤独，不过是不喜欢失望。 ​​​​愿你成为自己想成为的人，忠于自己，余生不将就。其实最催泪的情书 是聊天记录，聊天记录是最不能翻的东西，翻开就知道两个人，是怎样从无话不说到无话可说。从未放弃过爱你，只是从浓烈变得悄无声息。我们总爱说来日方长，可回头看看那些曾经支撑你前进的力量，在你不精心呵护的漫漫岁月里已经悄无声息的离开，支离破碎。尝过懊悔和无奈才能更明白活在当下的意义。
								趁还年轻，别辜负年华，要记得年少二字应与平庸相斥，在触手可及的眼前，拼命抓住，别等，别遗憾。`,
      createTime: '2021-10-10',
      tags: [
        { id: 1, name: 'tag1' },
        { id: 2, name: 'tag2' }
      ],
      categorys: [
        { id: 1, name: 'cate1' },
        { id: 2, name: 'cate2' }
      ]
    })
    onMounted(() => {})
    return {
      article
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  @include layout(100%, 100%, 0, 16px);
  .el-row {
    margin-bottom: $row-gutter;
  }
}
</style>