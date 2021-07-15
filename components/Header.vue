<template>
  <div class="navbar">
    <header>
      <nav class="navigation">
        <div class="wrap wide">
          <div class="wrap_left">
            <h1 class="logo">
              <nuxt-link to="/">
              </nuxt-link>
            </h1>
            <a class="header_links" href="/archives">アーカイブ</a>
            <nuxt-link class="header_links" to="/special">特集一覧</nuxt-link>
            <nuxt-link class="header_links" to="/about"
              >Vキャス新聞とは</nuxt-link
            >
          </div>
          <div class="wrap_right">
            <nuxt-link class="header_links blue" to="/newest"
              >最新刊を読む</nuxt-link
            >
          </div>
        </div>
        <div class="wrap solid">
          <div class="wrap_left">
            <nuxt-link to="/news">お知らせ</nuxt-link>
            <a href="https://virtualcast.jp/" target="_blank">
              バーチャルキャスト<font-awesome-icon
                :icon="['fas', 'external-link-alt']"
              />
            </a>
            <a href="https://seed.online/" target="_blank">
              THE SEED ONLINE<font-awesome-icon
                :icon="['fas', 'external-link-alt']"
              />
            </a>
            <a href="https://id.pokemori.jp/vcas-calendar/" target="_blank">
              Vキャスイベカレ<font-awesome-icon
                :icon="['fas', 'external-link-alt']"
              />
            </a>
          </div>
          <div class="wrap_right">
            <nuxt-link to="/admin">管理パネル</nuxt-link>
            <a
              href="https://seed.online/products/375e29f8544b8fd86bc40458f4f1cbbf93f4996296d6d370f378c2cf4c48ea1d"
              target="_blank"
              >Vキャスで読む<font-awesome-icon
                :icon="['fas', 'external-link-alt']"
              />
            </a>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style>
header {
  background: #252525;
  color: #fafafa;
}
.navigation {
  display: flex;
  flex-direction: column-reverse;
  margin: 0 auto;
  max-width: 1336px;
}

.navigation .wrap.solid {
  display: flex;
  justify-content: space-between;
  height: 32px;
}
.navigation .wrap.solid div {
  display: flex;
}

.navigation .wrap.solid a {
  display: block;
  font-size: 14px;
  line-height: 32px;
  padding: 0 0.75em;
  position: relative;
}
.navigation .wrap.solid a.disabled {
  cursor: not-allowed;
}
.navigation .wrap.solid a:not(:last-child)::after {
  content: "";
  border-right: 0.5px solid #555;
  width: 1px;
  height: 16px;
  position: absolute;
  right: -1px;
  top: 8px;
}
.navigation .wrap.solid a:hover {
  background-color: #555;
}
.navigation .wrap.solid a:not(:last-child):hover::after {
  border: none;
}

.navigation .wrap.wide {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.navigation .wrap.wide div {
  display: flex;
  align-items: flex-end;
}
.navigation .wrap.wide h1 a{
  display: block;
  font-size: 32px;
  width: 275px;
  height: 60px;
  margin-left: .5em;
  background-image: url('~/assets/logo.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.navigation .wrap.wide .header_links {
  line-height: 20px;
  font-size: 16px;
  margin: 1em 0.1em 0.5em;
  padding: 0.5em 1em;
  border-radius: 5px;
  font-weight: bold;
  color: #ddd;
}
.svg-inline--fa {
  margin: 0 0.25em;
  font-size: 100%;
}
.navigation .wrap.wide .header_links:hover {
  background-color: #555;
  color: white;
}
.navigation .wrap.wide .header_links.blue {
  background: #0080ff;
  color: white;
}
.navigation .wrap.wide .header_links.blue:hover {
  opacity: 0.8;
}
</style>