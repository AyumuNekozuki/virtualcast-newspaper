<template>
  <div>
    <div class="about_container">
      <section id="visual">
        <div class="pages_container_wrap">
          <div class="text_wrapper">
            <p class="wrap_text">バーチャルキャストの</p>
            <p class="wrap_text">『今』を伝える</p>
            <p class="wrap_text">VRメディア</p>
            <p class="wrap_text logo"></p>
          </div>
          <div class="img_wrap"></div>
        </div>
      </section>
      <section id="visual_2">
        <div class="pages_container_wrap dis_flex">
          <p class="wrap_text">あなたにあった読み方で</p>
          <div class="wrap_wrap">
            <div class="wrap">
              <p class="wrap_text">VRで読む</p>
              <a href="https://seed.online/products/375e29f8544b8fd86bc40458f4f1cbbf93f4996296d6d370f378c2cf4c48ea1d"><img src="~assets/imgs/about/view_vci.png" alt=""></a>
            </div>
            <div class="wrap">
              <p class="wrap_text">Webで読む</p>
              <a href="/"><img src="~assets/imgs/about/view_web.png" alt=""></a>
            </div>
          </div>
        </div>
      </section>
      
    </div>
    <div class="pages_container_wrap about">
      <section id="adseles">
        <h2>寄稿・ネタ・広告募集中！</h2>
        <p>Vキャス新聞では、随時ネタ・寄稿/社説・広告等を募集しています！</p>
        <h3>寄稿・ネタ提供・記事広告</h3>
        <p>専用フォームにて下記項目をご記入ください。</p>
        <ul>
          <li class="optional">ペンネーム</li>
          <li class="necessary">ネタのジャンル</li>
          <li class="necessary">内容</li>
          <li class="necessary">出来事の時期（だいたいでOK）</li>
          <li class="optional">画像や動画、PDFなどのファイル</li>
        </ul>
        <p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeqR-XqgypTRewf_gZyyxynXTRt3H9EqNp9go14AuXHemUSMA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            >投稿フォームはこちら</a
          >
        </p>
        <h3>Webページバナー広告</h3>
        <p>現在準備中です。今しばらくお待ち下さい。</p>
      </section>
      <section id="staff">
        <h2>編集スタッフ募集中！</h2>
        <p>Vキャス新聞では、随時、スタッフも募集中です！</p>
        <ul>
          <li>新聞の記事を書いていただける方</li>
          <li>アタック25の記事を書いていただける方</li>
          <li>占いコーナーを担当していただける方</li>
          <li>マンガ連載を担当していただける方</li>
        </ul>
        <p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeqR-XqgypTRewf_gZyyxynXTRt3H9EqNp9go14AuXHemUSMA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            >応募フォームはこちら</a
          >
        </p>

        <h3>Web更新担当も募集中です！</h3>
        <p>
          上記とは別に、WebのVキャス新聞サイトの更新作業を手伝っていただける方を募集中です！
        </p>
        <dl>
          <dt>作業内容</dt>
          <ul>
            <li>毎週火曜に発行される新聞の画像データを、管理ページから登録</li>
            <li>Webで表示するTOPICSの文章決め／登録</li>
            <li>
              記事内で紹介されたVCI／ニコニココンテンツ／TwitterなどのURLを登録
            </li>
          </ul>
        </dl>
        <p>
          手伝っていただける方いらっしゃいましたら
          <a
            href="https://twitter.com/nekozuki_dev"
            target="_blank"
            rel="noopener noreferrer"
            >@nekozuki_dev</a
          >
          までご連絡ください！
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import Meta from "~/mixins/meta";

export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "Vキャス新聞とは？",
        description: "Vキャス新聞とは？",
        type: "pages",
        url: "https://vcnp.nekozuki.me/about",
      },
    };
  },
};
</script>


<style>
div.pages_container_wrap {
  margin: 0 auto;
  padding: 1em 2em;
  max-width: 1336px;
}

div.about section {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  margin: 10px 5px 20px;
  padding: 15px;
  line-height: 1.7;
}

div.about section h2 {
  font-weight: bold;
  font-size: 24px;
  margin: 0.25em 0.25em 0.25em;
  padding: 0 0.5em;
  border-bottom: 1px solid #999;
}
div.about section h3 {
  font-weight: bold;
  font-size: 18px;
  margin: 1.5em 0.25em 0.25em;
  padding: 0 0.5em;
}
div.about section p {
  font-size: 16px;
  margin: 0.75em 0.25em;
  padding: 0 0.5em;
}
div.about section a {
  color: #0080ff;
}
div.about section a:hover {
  text-decoration: underline;
}

div.about section ul {
  margin: 0.75em 0.25em;
  padding: 0 2em;
  list-style-type: disc;
}
div.about section li.optional::before {
  content: "任意";
  font-size: 90%;
  margin: 0 0.5em 0 0.25em;
  padding: 0 0.25em;
  border: 1px solid #666;
  border-radius: 5px;
}
div.about section li.necessary::before {
  content: "必須";
  color: red;
  font-size: 90%;
  margin: 0 0.5em 0 0.25em;
  padding: 0 0.25em;
  border: 1px solid red;
  border-radius: 5px;
}
div.about section dl {
  margin: 0.75em 2em;
  padding: 1em;
  border: 1px solid #ccc;
}
div.about section dl ul {
  margin: 0;
}



div.about_container section#visual{
  background-color: #bae4f8;
  display: flex;
}
div.about_container div.pages_container_wrap{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
div.about_container .text_wrapper{
  display: flex;
  flex-direction: column;
  width: 45%;
  min-height: 500px;
  justify-content: space-evenly;
}
div.about_container .wrap_text{
  align-self: flex-end;
  background: #0080ff;
  padding: .5em 1em;
  color: white;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: .15em;
  text-align: right;
  white-space: nowrap;
}
div.about_container .wrap_text.logo{
  font-size: 32px;
  height: 2.5em;
  width: 9.5em;
  background-image: url('~/assets/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
div.about_container .img_wrap{
  width: 45%;
  min-height: 500px;
  background-image: url('~/assets/imgs/about/about_head.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
div.about_container #visual_2{
  background-color: #fee996;
}
div.about_container #visual_2 div.pages_container_wrap.dis_flex{
  display: flex;
  flex-direction: column;
  padding: 2em;
}

div.about_container #visual_2 div.pages_container_wrap.dis_flex .wrap_text{
  text-align: center;
  display: inline-block;
  align-self: center;
  font-size: 22px;
}
div.about_container #visual_2 div.pages_container_wrap.dis_flex .wrap_wrap{
  display: flex;
  justify-content: space-evenly;
}
div.about_container #visual_2 div.pages_container_wrap.dis_flex .wrap_wrap .wrap{
  width: 45%;
  margin: 1em 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
div.about_container #visual_2 div.pages_container_wrap.dis_flex .wrap_wrap .wrap .wrap_text{
  font-size: 18px;
  margin-bottom: .5em;
}
div.about_container #visual_2 div.pages_container_wrap.dis_flex .wrap_wrap .wrap img{
  width: 100%;
}
div.about_container #visual_2 div.pages_container_wrap.dis_flex .wrap_wrap .wrap a:hover{
  opacity: .9;
}
</style>