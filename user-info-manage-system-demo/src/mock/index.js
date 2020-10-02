import Mock from 'mockjs';
const findall = Mock.mock(
'/api/findAll','get', (req, res) =>{
return {
code:200,
data:[{
    date:'2017-04-01',
    name:'11',
    email:'1@1.net',
    title:'11',
    description :'des1',
    status:'11'

},{
    date:'2017-04-01',
    name:'22',
    email:'1@2.net',
    title:'22',
    description :'des2',
    status:'112'
 
}],
message:'查询成功'
}
} )
const user_add = Mock.mock(
'/api/add','post', (req, res) =>{
return {
code:200,
data:{
id:1,
sex:1,
age:25,
createTime:'2017-04-01'
},
message:'查询成功'
}
} )
 
const delete_proxy = Mock.mock(
    RegExp( "/api/data/.*"),'delete', (options) =>{
        console.log('**************');
        console.log(options);
        console.log('**************');
    return {
    code:200,
    data:{
    rst:null
    },
    message:'查询成功'
    }
    } )

const update_proxy = Mock.mock(
    RegExp( "/api/update/.*"),'put', (options) =>{
            console.log('**************');
            console.log(options);
            console.log('**************');
        return {
        code:200,
        data:{
        rst:null
        },
        message:'查询成功'
        }
        } )
export default { findall,user_add ,delete_proxy,update_proxy}