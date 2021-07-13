<template>
  <div class="pages_container policy">
    <section id="data">
      <h2>データ収集について</h2>
      <p>
        当サイトでは、 Google LLC 提供の Googleアナリティクスを利用しています。<br />
        Googleアナリティクスでは、トラフィックデータの収集のためにCookieを利用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。収集されないようにしたい場合は、ブラウザの設定からCookieを無効化していただくようお願い致します。
      </p>
      <p><a href="https://policies.google.com/technologies/cookies?gl=jp">詳細はこちらからご確認いただけます。（Googleポリシーページへ飛びます）</a></p>
    </section>
    <section id="disclaimer">
      <h2>免責事項</h2>
      <h3>当サイトの情報の正確性について</h3>
      <p>
        当サイトのコンテンツや情報において、可能な限り正確な情報を掲載するよう努めています。しかし、誤情報が入り込んだり、情報が古くなったりすることもあります。必ずしも正確性を保証するものではありません。また合法性や安全性なども保証しません。</p>
      <h3>損害等の責任について</h3>
      <p>
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。<br>
        また当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。<br>
        当サイトの保守、火災、停電、その他の自然災害、ウィルスや第三者の妨害等行為による不可抗力によって、当サイトによるサービスが停止したことに起因して利用者に生じた損害についても、何ら責任を負うものではありません。<br>
        当サイトを利用する場合は、自己責任で行う必要があります。</p>
      
      <h3>画像の著作権や肖像権等について</h3>
      <p>
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。<br>
        また当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。<br>
        当サイトで掲載している画像の著作権や肖像権等は、各権利所有者に帰属します。万が一問題がある場合は、以下お問い合わせよりご連絡いただけますよう宜しくお願い致します。</p>
    </section>
    <section id="disclaimer">
      <h2>問い合わせ先／管理者</h2>
      <h3>コンテンツに関するお問い合わせ</h3>
      <p>管理者：江戸でち<br>
      専用Discordチャンネル：<a href="https://discord.gg/7tc82xq3DF">Vキャス非公式Discord #Vキャス新聞 チャンネル</a><br>
      Twitter <a href="https://twitter.com/VCASHKD" target="_blank" rel="noopener noreferrer">@VCASHKD</a>
      </p>
      <h3>Webサイトに関するお問い合わせ</h3>
      <p>管理者：猫月遥歩（ねこづきあゆむ）<br>
      Twitter <a href="https://twitter.com/nekozuki_dev" target="_blank" rel="noopener noreferrer">@nekozuki_dev</a><br>
      メール <a href="mailto:ayumu@nekozuki.me">ayumu@nekozuki.me</a>
      </p>
    </section>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';

export default {
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: "ポリシー" ,
        description: 'Vキャス新聞に関するポリシーページです。',
        type: 'pages',
        url: 'https://vcnp.nekozuki.me/policy',
      },
    }
  }
};
</script>

<style>
div.pages_container {
  margin: 0 auto;
  padding: 1em 2em;
  max-width: 1336px;
}

div.policy section {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  margin: 20px 5px;
  padding: 15px;
  line-height: 1.7;
}

div.policy section h2{
  font-weight: bold;
  font-size: 24px;
  margin: .25em .25em .25em;
  padding: 0 .5em;
  border-bottom: 1px solid #999;
}
div.policy section h3{
  font-weight: bold;
  font-size: 18px;
  margin: 1.5em .25em .25em;
  padding: 0 .5em;
}
div.policy section p{
  font-size: 16px;
  margin: .75em .25em;
  padding: 0 .5em;
}
div.policy section a{
  color: #0080ff;
}
div.policy section a:hover{
  text-decoration: underline;
}
</style>