<template>
  <div class="footer">
    <footer>
      <div class="footer_wrap">
        <div class="wrap_wrap">
          <div class="contact_area">
            <h3>お問い合わせ</h3>
            <a class="contact" href="https://discord.gg/7tc82xq3DF">
              <font-awesome-icon :icon="['fab','discord']" />
              <div class="wrap">
                新聞について問い合わせる
                <span>Vキャス非公式Discord #Vキャス新聞チャンネル</span>
              </div>
            </a>
            <a class="contact" href="https://twitter.com/nekozuki_dev">
              <font-awesome-icon :icon="['fab','twitter']" />
              <div class="wrap">
                このサイトについて問い合わせる
                <span>@nekozuki_dev</span>
              </div>
            </a>
          </div>
          <div class="policy_area">
            <nuxt-link class="policy" to="/policy#data">データ収集について</nuxt-link>
            <nuxt-link class="policy" to="/policy#disclaimer">免責事項</nuxt-link>
          </div>
        </div>
        <div class="credit_area">
          <h3>スタッフ</h3>
          <div class="user">
            <p class="part">主催・2-4面作成・VCI更新</p>
            <p class="name">
              江戸でち
              <a href="https://twitter.com/edo_vcas" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab','twitter']" />
              </a>
            </p>
          </div>
          <div class="user">
            <p class="part">1面作成</p>
            <p class="name">
              HQ
              <a href="https://twitter.com/HHitoqucuri" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab','twitter']" />
              </a>
            </p>
          </div>
          <div class="user">
            <p class="part">Web版構築・管理・更新</p>
            <p class="name">猫月遥歩（ねこづきあゆむ）
              <a href="https://twitter.com/nekozuki_dev" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab','twitter']" />
              </a>
            </p>
          </div>
          <div class="user">
            <p class="part">題字</p>
            <p class="name">みい
            </p>
          </div>
          <div class="user">
            <p class="part">連載『今日のイチ押し！』</p>
            <p class="name">ゆぅくりっど
              <a href="https://twitter.com/akatanana" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab','twitter']" />
              </a>
            </p>
          </div>
          <div class="user">
            <p class="part">校閲</p>
            <p class="name">冷水
              <a href="https://twitter.com/ReisuiRemy" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab','twitter']" />
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="cr">
        <small>© Vキャス新聞製作委員会</small>
      </div>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.footer{
  background-color: #252525;
  color: white;
  padding: 1em auto 0;
}
.footer_wrap{
  max-width: 1336px;
  margin: 1em auto 0;
  display: flex;
  justify-content: space-around;
}
.footer_wrap > div{
  width: 45%;
  display: flex;
  flex-direction: column;
}

.footer_wrap h3{
  margin: 1em 0;
  padding: 0 .5em;
  font-weight: bold;
  font-size: 18px;
  border-left: 2px solid white;
}

.footer_wrap .contact_area a{
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  margin: .5em;
  padding: .5em ;
  font-size: 16px;
  background-color: #0080ff;
  border-radius: 10px;
}
.footer_wrap .contact_area a:hover{
  opacity: .8;
}
.footer_wrap .contact_area a svg{
  font-size: 24px;
}
.footer_wrap .contact_area a .wrap{
  width: 80%;
}
.footer_wrap .contact_area a span{
  display: block;
  font-size: 12px;
  margin: .75em 0 0;
}
.footer_wrap .policy_area{
  margin: 2em;
}
.footer_wrap .policy_area a{
  display: block;
  line-height: 1.7;
}
.footer_wrap .policy_area a:hover{
  text-decoration: underline;
}

.footer_wrap .credit_area{
  display: flex;
  flex-direction: column;
}
.footer_wrap .credit_area .user{
  margin: .5em .5em;
}
.footer_wrap .credit_area .user .part{
  margin: .5em 0;
  padding: 0 1em 0 1em;
  border-bottom: 1px solid #999;
}
.footer_wrap .credit_area .user .name{
  padding: 0 1em 0 1.5em;
}
footer .cr{
  text-align: center;
  padding: 2em;
}
</style>