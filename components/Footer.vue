<template>
  <div class="footer">
    <footer>
      <div class="footer_wrap">
        <div class="contact_area">
          <h3>お問い合わせ</h3>
          <a class="contact" href="">
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
        <div class="credit_area">
          <h3>スタッフ</h3>
          <div class="user">
            <p class="part">主催・2-4面作成・VCI更新</p>
            <p class="name">江戸でち</p>
          </div>
          <div class="user">
            <p class="part">1面作成</p>
            <p class="name">HQ</p>
          </div>
          <div class="user">
            <p class="part">Webサイト構築・更新</p>
            <p class="name">猫月遥歩（ねこづきあゆむ）</p>
          </div>
          <div class="user">
            <p class="part">題字</p>
            <p class="name">みい</p>
          </div>
          <div class="user">
            <p class="part">連載『今日のイチ押し！』</p>
            <p class="name">ゆぅくりっど</p>
          </div>
          <div class="user">
            <p class="part">校閲</p>
            <p class="name">冷水</p>
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
}
.footer_wrap{
  max-width: 1152px;
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
</style>