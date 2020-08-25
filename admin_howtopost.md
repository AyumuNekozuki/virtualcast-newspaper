# 運営用 How to Post

> このファイルは運営用です

## はじめに
用語はある程度わかりやすく説明しますが、わからないことあったら猫月遥歩まで。
後日、サイト上GUIで簡単に更新できるようにしたいと思ってます。

## 必要なもの

### 必須
- テキストエディタ(オススメ：VSCode)
- GitHubアカウント

### やっていたほうが良いもの
- WSLなどのLinux環境(オススメ：WSL(Ubuntu) や vagrant環境)
- Python3の導入


## 手順

### 1. GitHubからcloneする(初回のみ)
事前にGitHubのリポジトリへのアクセス許可を出します。それを承諾しておいてください。

このリポジトリへアクセスできたら、コードを `clone` します。
`clone`とは GitHub上にあるコードをローカルにダウンロードすることです（簡単に言うと）

CUIの場合、ディレクトリ(フォルダ階層)を移動し、置きたい場所で、
```console
$ git clone git@github.com:AyumuNekozuki/virtualcast-newspaper.git
```

これで`clone`完了です。

### 1. GitHubからpullする(2回目以降)
初回はローカルにデータがなかったので、全てデータを取得するために`clone`しました。

ですが2回目以降は、データがあるので、GitHubとデータのズレが無いかチェック、あった場合DLしてくる処理をします。

```console
$ git pull
```

これで `pull` 完了です。

### 2. 記事の更新
テキストエディタを起動します。
更新ファイルは以下の通り。

- index.html
- new_read.html
- /archives/index.html
- /archives/[発行日]/*

#### 2-1. 記事ファイルの作成

まず、/archives/[発行日] ディレクトリを作成し、その中に新聞の画像データを入れます。
ここまでで、こうなればOK。

```
/
  index.html
  new_read.html
  /archives
    index.html
    /YYYYMMDD
      /head.png :トップページなどに置くサムネイル。608x702など画像を荒くする。
      /1.png :1面。1300x1500推奨。画像サイズが大きいと読み込みが長くなってしまう。
      /2.png :2面。画像の名前はこれ通りにすること。しないと読み込まれない。
      /3.png :3面
      /4.png :4面
```

次に、前回更新分(`/archives/[前回更新日]`)から index.htmlをコピーし、今回更新のフォルダにペースト。

そして、ペーストしたファイルを以下の通り編集。
書いてない部分は変更なしです。

```html: /archives/YYYYMMDD/index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <title>YYYY年MM月DD日 - Vキャス新聞</title> <!--日付を修正-->
  <meta property="og:title" content="YYYY年MM月DD日 - Vキャス新聞" /> <!--日付を修正-->
  <meta property="og:image" content="https://vcnp.nekozuki.me/archives/YYYYMMDD/head.png" /> <!--日付を修正-->
</head>

<body>
  <div class="main">
    <h1>YYYY年MM月DD日</h1> <!--日付を修正-->

    <section class="tab_content" id="topics_content">
      <h2>TOPICS</h2> <!-- TOPICS内を今回データに修正 -->
      <div class="item-list">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p><span><!--spanで囲むと四角で囲まれます--></span>4</p>
      </div>
    </section>

    <section class="tab_content" id="vci_content">
      <h2>関連VCI</h2> <!-- VCI内を今回データに修正 -->
      <div class="item-box">
        <!-- =の後にseedのURLをペースト(https含めて) -->
        <iframe
          src="https://hatenablog.com/embed?url="
          frameborder="0"></iframe>
        <iframe
          src="https://hatenablog.com/embed?url=https://seed.online/products/XXXXXXXX"
          frameborder="0"></iframe>
      </div>
    </section>

    <section class="tab_content" id="nico_content">
      <h2>関連動画・生放送</h2> <!-- 動画/生放送内を今回データに修正 -->
      <div class="item-box"> 
        <!-- iframeはニコ動/ニコ生内のブログパーツからコピペ -->
        <!-- Youtubeの場合はサイズをニコ生と合わせる (w312 h176) -->
        <iframe width="312" height="176" src="https://live.nicovideo.jp/embed/lv327470589" scrolling="no"
          style="border:solid 1px #d0d0d0; background-color: #f6f6f6;" frameborder="0"></iframe>
      </div>
    </section>

    <section class="tab_content" id="url_content">
      <h2>関連URL</h2> <!-- 関連URLを今回データに修正 -->
      <div class="item-list">
        <a href="http://example.com/">example</a>
        <!-- <i class="fab fa-twitter"></i>でTwitterのロゴを前に出せる -->
        <!-- fontawesomeでぐぐって -->
        <a href="http://example.com/"><i class="fab fa-twitter"></i>example</a>
        <!-- <i class="icon2-niconico"></i>でニコニコテレビちゃん -->
        <!-- <i class="icon2-nicolive"></i>でナマコのアイコンを出せる -->
        <a href="http://example.com/"><i class="icon2-niconico"></i>example</a>
        <a href="http://example.com/"><i class="icon2-nicolive"></i>example</a>
      </div>
    </section>

    <!--以下変更なし-->
</body>
```

ここまで出来たら一度チェックしてみましょう。
リポジトリの一番TOPの階層に移動し、コンソールで、

```console
$ python -m SimpleHTTPServer 4000
```

で、[http://localhost:4000/](http://localhost:4000/) にアクセスするとローカルサーバーで確認できます。

[http://localhost:4000/archives/YYYYMMDD/(http://localhost:4000/archives/YYYYMMDD/) にアクセスしたときに正常に表示できればOKです。


#### 2-2. 各ファイルの更新

次に、`/archives/index.html`を更新します。アーカイブ一覧のページです。

以下のように更新します

```html: /archives/index.html
<!DOCTYPE html>
<html lang="ja">
<head><!--変更なし--></head>

<body>
  <h1>アーカイブ</h1>

  <section class="tab_content topics"> <!--一番上に新しく追加してください-->
    <div class="headimg">
      <img src="/archives/YYYYMMDD/head.png"> <!--日付を修正-->
    </div>
    <h2>YYYY年MM月DD日</h2> <!--日付を修正-->
    <div class="item-list">
      <!--先程のTOPICSからコピペ-->
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p><a href="YYYYMMDD/">新聞を読む</a></p> <!--日付を修正-->
    </div>
  </section>

  <!--以下変更なし-->

```

[http://localhost:4000/archives/(http://localhost:4000/archives/) にアクセスしたときに正常に表示できればOKです。


次に、トップページを更新します。

```html: /index.html
<!DOCTYPE html>
<html lang="ja">
<head><!--変更なし--></head>

<body>
  <!--変更なし-->

  <!--書き換えてください-->
  <section class="topics">
    <div class="headimg">
      <img src="/archives/YYYYMMDD/head.png" alt="" srcset=""> <!--日付を修正-->
    </div>
    <h2>YYYY年MM月DD日</h2> <!--日付を修正-->
    <div class="item-list">
      <!--先程のTOPICSからコピペ-->
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p><a href="/archives/YYYYMMDD/">新聞を読む</a></p> <!--日付を修正-->
    </div>
  </section>

  <!--以下変更なし-->


```

[http://localhost:4000/(http://localhost:4000/) にアクセスしたときに正常に表示できればOKです。


最後に、new_read.htmlを更新します。
ここは、サイト右上の最新刊を読むをクリックした際に、最新刊に飛ぶ用のページです。

```html: /index.html
<!DOCTYPE html>
<html lang="ja">
<head><!--変更なし--></head>

<body>
  <!--変更なし-->

  <!--書き換えてください-->
  <script>
    location.href = 'https://vcnp.nekozuki.me/archives/YYYYMMDD/'; //日付を修正
  </script>

</body>
</html>
```

これですべての更新が完了です。

### 記事の公開

サイトの更新・チェックが終わったら、公開します。
コンソールで、サイトの一番上の階層に移動し、

```console
$ git add . 
$ git commit -m "post YYYYMMDD"
$ git push -u origin master
```

説明します。

まず、`git add .` で更新したデータをすべて選択し、登録します。

次に、`git commit -m "post YYYYMMDD"` でどんな変更を行ったのかメッセージを書きます。今回は記事の更新なので、YYYYMMDDの記事を投稿した ことを書けばOKです。

最後に `git push -u origin master` でデータをGitHub上にアップロードします。

お疲れさまでした！数分後にはWeb上で見れるようになっています。


## さいごに

ここまでが手順書です。
なにかあれば猫月遥歩までお願いします。

最初にも書きましたが、後日簡単にWeb上で更新できるように再構成したいと思ってますので今しばらくお待ち下さい。

### 更新
- 2020/08/26 初版作成