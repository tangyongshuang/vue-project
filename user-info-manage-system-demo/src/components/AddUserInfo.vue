<template>
  <div class="hello">
    <el-dialog title="添加用户信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="日期" prop="createDate">
            <el-date-picker
              v-model="formDate.createDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formDate.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="formDate.mail"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formDate.title"></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="description">
          <el-input v-model="formDate.description"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="formDate.status"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formdong')">确 定</el-button>
      </div>
    </el-dialog>
  
  <!-- <span style="font-size: 14px;">this.$emit('update');   子组件数据发生改变了，父组件视图却没有更新，这时候通过子创父，this.$emit,向父组件发送子组件传递的方法</span> -->
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  props:{
    dialogAdd:Object
  },
  data () {
    return {
      formDate:{
        date:'',
        name:'',
        email:'',
        title:'',
        evaluate:'',
        state:''
      },
      formrules:{
        date:[{required:true,message:"日期不能为空",trigger:"blur"}],
        name:[{required:true,message:"用户名不能为空",trigger:"blur"}],
        email:[{required:true,message:"邮箱不能为空",trigger:"blur"}],
      }
    }
  },
  methods:{
    dialogFormAdd(formdong) {
        this.$refs.formdong.validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:8010/api/add',this.formDate).then(res => {
                this.$message({
                    type:"success",
                    message:"添加信息成功"
                })
                this.dialogAdd.show = false;
                this.$emit('update');   
 
            })
            this.formDate  = ""
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
