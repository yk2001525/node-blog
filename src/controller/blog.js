const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blog where 1=1 `  //这样子写防止后面两个都为空然后报错
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}$%' `
    }
    sql += `order by createtime desc;`

    //返回promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blog where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]  //变成对象的形式
    })
}

const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象，包含title content属性
    // console.log('newBlog blogData...',blogData)
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
        insert into blog (title, content ,createtime, author)
        values ('${title}','${content}',${createtime},'${author}');
    `
    return exec(sql).then(insertData => {
        console.log('insertData is: ',insertData)
        return {
            id:insertData.insertId
        }
    })
    
}

const updateBlog = (id,blogData ={})=>{
    //id就是要更新博客的id
    //blogData 是一个博客对象，包含title content 属性
    // console.log('update blog',id, blogData)

    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blog set title='${title}', content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0){
            return true
        }
        return false
        
    })
}

const delBlog = (id, author) =>{
    //id就是要删除博客的id
    const sql = `delete from blog where id='${id}' and author='${author}';`//保证id和作者保持一致，具有安全性
    return exec(sql).then(delData => {
        if(delData.affectedRows>0){
            return true
        }
        return false
    })

}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}