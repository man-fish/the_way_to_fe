`AudioContext`接口表示由链接在一起的音频模块构建的音频处理图，每个模块由一个[`AudioNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioNode)表示。音频上下文控制它包含的节点的创建和音频处理或解码的执行，在做任何其他操作之前，您需要创建一个`AudioContext`对象，因为所有事情都是在上下文中发生的。![image-20200818143357266](assets/image-20200818143357266.png)

建议创建一个`AudioContext`对象并复用它，而不是每次初始化一个新的`AudioContext`对象，并且可以对多个不同的音频源和管道同时使用一个`AudioContext`对象。

## 音频上下文 `AudioContext` 

音频中的 `AudioContext` 可以类比于 `canvas` 中的 `context`，其中包含了一系列用来处理音频的 `API`，简而言之，就是可以用来控制音频的各种行为，比如播放、暂停、音量大小等等等等：

```js
const audioContext = new AudioContext();
```

在继续了解 `AudioContext` 之前，我们先来回顾一下，平时我们是如何播放音频的：

```html
<audio autoplay src="path/to/music.mp3"></audio>
```

或者：

```js
const audio = new Audio();
audio.autoplay = true;
audio.src = 'path/to/music.mp3';
```

没错，非常简单的几行代码就实现了音频的播放，但是这种方式播放的音频，只能控制播放、暂停等等一些简单的操作。但是如果我们想要控制音频更「高级」的属性呢，比如声道的合并与分割、混响、音调、声相控制和音频振幅压缩等等，可以做到吗？答案当然是肯定的，一切都基于 `AudioContext`。我们以最简单的栗子来了解一下 `AudioContext` 的用法：

```js
const URL = 'path/to/music.mp3';
const audioContext = new AudioContext();
const playAudio = function (buffer) {
   const source = audioContext.createBufferSource();
   source.buffer = buffer;
   source.connect(audioContext.destination);
   source.start();
};
const getBuffer = function (url) {
   const request = new XMLHttpRequest();
   return new Promise((resolve, reject) => {
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = () => {
					audioContext.decodeAudioData(request.response, 
                                       buffer => buffer 
                                       ? resolve(buffer) 
																		: reject('decoding error'));
             };
     request.onerror = error => reject(error);
     request.send();
   });
};
const buffer = await getBuffer(URL);
buffer && playAudio(buffer);
```

点讲一下 `playAudio` 这个函数，首先我们通过 `audioContext.createBufferSource()` 方法创建了一个「容器」 `source` 并装入接收进来的「水」 `buffer`；其次通过「管道」 `connect` 把它和「出口」 `destination` 连接起来；最终「出口」 `destination` 「流」出来的就是我们所听到的音频了。

![img](assets/v2-1d87be05fd371715f24be7439f79941d_1440w.png)

