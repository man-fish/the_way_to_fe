# 读取和写入🍼

## 读取🚧

### io.Reader接口🗼

首先GO语言中所有的读取都是基于`io.Reader`接口的，不管我们是要读取什么类型的数据我们都需要调用其实现的`io.Reader`接口的`Read`方法，首先来看一下`Read`方法的参数和返回值吧。

```go
 Read(p []byte) (n int, err error)
```

> 参数：要读取到的字节数组。
>
> 返回值：读取字节数，错误类型。

#### 封装 ReadFrom 方法🌿

知道了Read接口的参数和返回值之后，我们只要根据他们来调用会接受返回值就行了。

```go
func ReadFrom(reader io.Reader,num int) ([]byte,error){
	con := make([]byte,num)
	n, err := reader.Read(con)
	fmt.Println("读取的字节数:",n)
	if err != nil && err!=io.EOF {
		panic(err)
	}
	return con,err
}
```

##### io.EOF

`读取到文件结尾的时候会返回io.EOF的error类型，这个时候我们要记得判断进去。`

##### 尿点

切片数组终究不是变长数组，它需要append方法来实现变长数组的效果所以说我们往往无法预知要读取文件的大小，而切片数组又必须先被声明长度，这就形成一个尿点。



#### 官方实现的ReadAll方法🍳

自己封装的ReadFrom方法其实是有很多问题的，比如数据读不完或者创建容量太大，没有使用bufio读取速度会比较慢，所以官方为我们提供了i`outil.ReadAll`方法，区别就是只需要传入Reader实现者，他会返回给你一个字节数组。

```go
func ReadAll(r io.Reader) ([]byte, error) {
	return readAll(r, bytes.MinRead)
}
```



### Reader接口的实现者们Bufio.Writer本身的write方法🙆

#### file实现的Reader接口Bufio.Writer本身的write方法🎲

```go
func (f *File) Read(b []byte) (n int, err error)
```

##### 自己实现的ReadFromFIleBufio.Writer本身的write方法🔬

```go
func ReadFromFile(filename string, num int) ([]byte,error) {
	con := make([]byte,num)
	fr, err := os.Open(filename)
	if err != nil {
		return nil,err
	}
	_, err = fr.Read(con)
	if err != nil {
		return nil,err
	}
	return con,err
}
```

##### 官方实现的ReadFile

```go
  func ReadFile(filename string) ([]byte, error)
```

#### bufio实现的Reader接口💽

就简略的说一下吧，`bufio.NewReader`会将底层的io接口包裹返回一个`bufio.reader`,然后数据会存到`bufio.reader`的缓存里，Peek方法可以返回一个字节数组。

```go
func readBufio(reader io.Reader) ([]byte,error) {
	br := bufio.NewReader(reader)
	line, err := br.Peek(100)
	fmt.Println(line)
	return line, err
}
```

#### strings实现的Reader接口🎮

直接上源码吧。

```go
func NewReader(s string) *Reader { return &Reader{s, 0, -1} }
type Reader struct {
	s        string
	i        int64 // current reading index
	prevRune int   // index of previous rune; or < 0
}	

func (r *Reader) Read(b []byte) (n int, err error) {
	if r.i >= int64(len(r.s)) {
		return 0, io.EOF
	}
	r.prevRune = -1
	n = copy(b, r.s[r.i:])
	r.i += int64(n)
	return
}
```

#### response实现的Reader接口🔌

```go
import "http"

func main(){	
	resp, err := http.Get("http://127.0.0.1:8888/getData")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
|
```



## 写入✍

### io.Writer接口🔭

首先GO语言中所有的读取都是基于`io.Writer`接口的，不管我们是要读取什么类型的数据我们都需要调用其实现的`io.Writer`接口的`Write`方法，首先来看一下`Write`方法的参数和返回值吧。

```go
Write(p []byte) (n int, err error)
```

> 参数：要写入的字节数组。
>
> 返回值：写入字节数，错误类型。

#### 封装 WriteTo方法📚

知道了Writer接口的参数和返回值之后，我们只要根据他们来调用会接受返回值就行了。

```go
func WriteTo(writer io.Writer,con []byte) error {
	n, err := writer.Write(con)
	if err != nil {
		panic(err)
	}
	fmt.Println(n)
	return err
}
```

##### 尿点

写入的时候就没有Reader的尿点了，数组长度并不重要而且还是已知的。

### Writer接口的实现者们📸

#### file实现的Writer接口📦

没什么好说的

```go
func (f *File) Write(b []byte) (n int, err error)
```

#### bufio实现的Writer接口🎧

bufio实现的Writer接口用于向将值写入缓存。

```go
func writeFileBufio(filename string,content []uint8){
	frw, err := os.OpenFile(filename,os.O_RDWR|os.O_CREATE|os.O_TRUNC,0666)
	if err != nil {
		panic(err)
	}
	bw := bufio.NewWriter(frw)
	defer bw.Flush()
	fmt.Fprintf(bw,string(content))
}
```

### io.Writer的使用者🔪

**fmt**

fmt包实现将字节/字节数组写入传入的Writer。

```
func Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error) {
	p := newPrinter()
	p.doPrintf(format, a)
	n, err = w.Write(p.buf)
	p.free()
	return
}
```

