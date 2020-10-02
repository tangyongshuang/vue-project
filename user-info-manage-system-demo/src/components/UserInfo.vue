<template>
<div class="info">
<h1>用户信息管理系统</h1>
    <el-row>
        <el-col :span="20" :push='2'>
            <div>
                <el-form :inline="true">
                    <el-form-item style="float: left" label="查询用户信息:">
                        <el-input v-model="keyUser" placeholder="查询所需要的内容......"></el-input>
                    </el-form-item>
                    <el-form-item style="float: right">
                        <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="hanldeAdd()">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table">
                <el-table :data="searchUserinfo(keyUser)" border style="width: 100%" >
                    <el-table-column
                      type="index"
                      label="序号"
                      align="center"
                      width="60">
                    </el-table-column>
                    <el-table-column
                      label="日期"
                      align="center"
                      width="150"
                     
                      >
                      <template slot-scope="scope">
                        <span>{{ scope.row.createDate | moment }}</span>  <!-- 格式化日期 -->
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="姓名"
                      align="center"
                      width="100"
                      prop="name">
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="邮箱"
                      align="center"
                      width="160"
                      prop="mail">
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.mail }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="标题"
                      align="center"
                      width="160"
                      prop="title">
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.title }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="评价"
                      align="center"
                      width="350"
                      prop="description">
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.description }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="状态"
                      align="center"
                      width="160"
                      prop="status">
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.status }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
            </div>
        </el-col>
    </el-row>
    <!-- 使用这个组件 -->
    <AddUser :dialogAdd="dialogAdd" @update="getUserInfo"></AddUser> 
    <!-- 使用这个组件 -->
     <EditUser :dialogEdit="dialogEdit" :form="form" @updateEdit="getUserInfo"></EditUser>
    </div>
</template>

<script>
import AddUser from './AddUserInfo.vue'   //引入组件  
import EditUser from './EditUser.vue'

export default {
    name:'info',
    data() {
        return {
            tableData:[],
            dialogEdit:{
              show:false,
            },
            dialogAdd:{
              show:false
            },
            keyUser:"",
            form:{    //编辑信息
              name:'',
              mail:'',
              title:'',
              description:'',
              status:'',
              createDate:''
            },
        }
   },
 methods:{
    getUserInfo() {
        this.$axios.get('/api/findAll').then(res => {
        console.log(res)
        console.log(JSON.stringify(res))
        this.tableData = res.data.data
        console.log("下面打印name")
        console.log(JSON.stringify(this.tableData))
        console.log(this.tableData)
        })
    },
    hanldeAdd(){  //添加
        this.dialogAdd.show = true;
    },
    handleEdit(index,row){  //编辑
        this.dialogEdit.show = true; //显示弹
        this.form = {
            name:row.name,
            mail:row.mail,
            title:row.title,
            description:row.description,
            status:row.status,
            createDate:row.createDate,
            id:row.id
        }
      console.log(row)
    },
    handleDelete(index,row) {
        // 删除用户信息
        this.$axios.delete(`/api/data/${row.id}`).then(res =>{
          console.log('删除时的res'+JSON.stringify(res))
            this.$message({
                type:"success",
                message:"删除信息成功"
            })
            this.getUserInfo()    //删除数据，更新视图
        })
    },
    searchUserinfo(keyUser) {
        return this.tableData.filter((user) => {
            console.log("下面是user")
            console.log(user);
            if(user.name.includes(keyUser) || 
               user.mail.includes(keyUser) ||
               user.title.includes(keyUser) ||
               user.description.includes(keyUser)||
               user.status.includes(keyUser)) {
                return user
            }
        })
    }
  },
    created(){
    console.log("cerate方法")
    this.getUserInfo()
  },
    // dialogEdit:{
    //     show:false,
    //   },
    // dialogAdd:{
    //     show:false
    // },
    components:{
      AddUser,
      EditUser
  }
}
</script>

<style>
h1{
    font-size: 30px;
    color: #333;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 5px;
    border-bottom: 2px solid #409EFF;
    width: 300px
}
</style>
