# vessi 日本向けプロモーションサイト（架空）　

## サイトURL
[Vessi | 世界初の100%防水スニーカー - 日本向けプロモーション]

https://intp.site/1539/vessi/

※職務経歴書記載のパスワードのご入力をお願いいたします。


## 概要
実在するカナダの防水シューズの通販サイトvessiの日本向けプロモーションサイトをオリジナルで作成するという課題のもと制作。

※こちらはvessi様に特定の条件下で訓練校の課題として利用する許可をいただき作成しているため、限定公開としている。

[vessi様の公式サイト](https://vessi.com/)


## 担当内容、制作期間
- デザイン:2週間
- コーディング（レスポンシブ対応）：3週間


## 使用言語、ツール
- HTML
- CSS（SCSS）
- JavaScript(jQuery)
- Illustrator
- Photoshop
- Adobe XD
- VSCode


##　　制作意図
新たに日本向けにプロモーションをするためにサイトを新設するという設定である。
日本では認知度が低いため認知度向上をメインにし、オンラインショップへの誘導を行うことを目的として作成した。


## 制作時のポイント、苦労したこと
- 防水シューズのためできる限り水を意識した作りにし、また植物から作られている靴なのでメインカラーをアースカラーにした。
- テクノロジーsectionではposition:absoluteを利用してテキスト表示を行なっているが、レイアウト崩れが起きないよう計算しながら作成したので苦労した。
- スクロールのアニメーションや、波のアニメーションなども初めて実装するため調べながら試行錯誤した。
- メインビジュアルのテキストのアニメーションはcssとjQueryを併用して実装したが、safariだけはどうしても改行が入ってしまい修正できなかった。
- ハンバーガーメニューは高さが画面より大きくなる場合があるためスクロールできるように設定
- レビューsectionとFAQセクションの直前にある画像はそれぞれ異なる動きにしているが、レビューsectionの直前の画像のcssが一部のブラウザで効かないことがわかったため、FAQsectionの直前の画像と同じ表示方法になるように対応した。
- ローディング画面はロゴを利用しsvgでアニメーションにして読み込んでいる。