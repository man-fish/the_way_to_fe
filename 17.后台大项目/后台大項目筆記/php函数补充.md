mysql_fetch_assoc 得到的是[关联数组](https://www.baidu.com/s?wd=%E5%85%B3%E8%81%94%E6%95%B0%E7%BB%84&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)。
mysql_fetch_array 可以得到[关联数组](https://www.baidu.com/s?wd=%E5%85%B3%E8%81%94%E6%95%B0%E7%BB%84&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)也可以得到索引数组，也可以二者都有。

假如从数据库取出一个用户的用户名和密码

username password
test 123456

用assoc 结果是array（[username]=>'test',[password]=>'123456'）
用array 根据参数不同结果可能是以下三种之一
array（[username]=>'test',[password]=>'123456'）
array（[0]=>'test',[1]=>'123456'）
array（[username]=>'test',[password]=>'123456'，[0]=>'test',[1]=>'123456'）