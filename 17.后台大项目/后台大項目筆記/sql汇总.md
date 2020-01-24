### 数据库查询

select count(1) as num from posts;----['num']

select count(1)  from posts;       ----['count(1)']

count一般用于获取数据数目，单纯想获取总数居数，就可以在后面传入参数一

想获取某一个字段的某种状态的总条数，就可以在后面传入这个字段

'select count(status) as num from posts where status = "drafted" '----['num'];

'delete from categories where id in ('.$id.');'

'SELECT * FROM users UNION ALL SELECT * FROM enable_users‘

