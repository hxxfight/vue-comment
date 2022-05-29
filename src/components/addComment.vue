<template>
  <div class = "comment_box">
    <div class="title">发表你的评论吧</div>
    <span style="color:gray;font-size:14px">使用sessionStorage保存评论，只在本页面内有效</span>
    <div class = "add_comment">
      <textarea class="input" v-model = "input"></textarea>
      <button class ="add_btn" @click="addComment()">发表评论</button>
    </div>
    <Comment style="margin-top:30px" :comments="commentLists"></Comment>
  </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  },
  data () {
    return {
      commentLists: [
        {
          id: 1,
          content: '默认一级评论展示', // 评论内容
          isShow: false, // 折叠状态
          isReply: false, // 是否是一级评论
          showReply: false, // 回复状态
          repalyCount: 1, // 回复评论数
          replyContent: [
            {
              id: 11,
              content: '默认二级评论展示',
              isShow: false,
              isReply: true,
              showReply: false,
              repalyCount: 0,
              replyContent: [
                {
                  id: 111,
                  content: '默认三级评论展示',
                  isShow: false,
                  isReply: true,
                  showReply: false,
                  repalyCount: 0,
                  replyContent: []
                }
              ]
            }
          ]
        }
      ],
      input: ''
    }
  },
  created () {
    if (JSON.parse(window.sessionStorage.getItem('comment'))) {
      this.commentLists = JSON.parse(window.sessionStorage.getItem('comment'))
    }
  },
  methods: {
    // 保存到sessionStorage
    saveComment () {
      // console.log(this.commentLists)
      window.sessionStorage.setItem('comment', JSON.stringify(this.commentLists))
    },
    addComment () {
      if (!this.input) {
        alert('输入内容为空')
      } else {
        let com = {}
        console.log(this.commentLists)
        com.content = this.input
        com.id = this.commentLists.length + 1
        com.isShow = false
        com.isReply = false
        com.showReply = false
        com.repalyCount = 0
        com.replyContent = []
        this.commentLists.unshift(com)
        this.input = ''
      }
      this.saveComment()
    }
  },
  provide () {
    return {
      saveComment: this.saveComment
    }
  }

}
</script>

<style scoped>
.title {
  font-weight: 600;
  line-height: 50px;
  font-size: 18px
}
.comment_box {
  margin:auto;
  width: 500px;
}
.input {
  width: 500px;
  height: 100px;
  /* margin-left:50px; */
}

</style>>
