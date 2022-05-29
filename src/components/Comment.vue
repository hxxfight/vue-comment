<template>
  <div>
    <div class="comment" :key="item.id" v-for="item in comments">
      <!-- <span>{{item}}</span> -->
      <span class="title" v-if="item.isReply">回复：</span>
      <span class="title" v-else>评论{{item.id}}:</span>
      <button @click="fold(item.id)" >折叠</button>
      <div v-show="!item.isShow">
        <span>{{item.content}}</span>
        <button @click="toShowReply(item.id)">回复</button>
        <div v-show="item.showReply">
          <input type="text" v-model="input">
          <button @click="addReply(item.id)">提交回复</button>
        </div>
        <Comment :comments="item.replyContent"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {comments: Array},
  data () {
    return {
      input: ''
    }
  },
  inject: ['saveComment'],
  methods: {
    fold (id) {
      const index = this.comments.findIndex((role) => role.id === id)
      this.comments[index]['isShow'] = !this.comments[index]['isShow']
      this.saveComment()
    },
    toShowReply (id) {
      const index = this.comments.findIndex((role) => role.id === id)
      this.comments[index]['showReply'] = !this.comments[index]['showReply']
      this.saveComment()
      this.input = ''
    },
    addReply (id) {
      const ind = this.comments.findIndex((role) => role.id === id)
      if (!this.input) {
        alert('输入内容为空')
      } else {
        let com = {}
        console.log(this.comments)
        com.content = this.input
        com.id = id * 10 + this.comments[ind]['repalyCount'] + 1
        com.isShow = false
        com.isReply = true
        com.showReply = false
        com.repalyCount = 0
        com.replyContent = []
        this.comments[ind]['replyContent'].unshift(com)
        this.comments[ind]['repalyCount'] = this.comments[ind]['replyContent'].length
        this.comments[ind]['showReply'] = false
        this.input = ''
      }
      this.saveComment()
    }

  }
}
</script>

<style scoped>
.comment{
  margin-left:15px;
  margin-top: 8px
}
.title {
  font-weight: 600;
}
button {
  border:1px solid #eee;
  margin-left:5px
}
</style>>
