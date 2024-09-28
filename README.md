2024/9/28  
(c)onu.  

# takoyaki
オクトパスエナジー https://octopusenergy.co.jp/ で使用した電力量データを取得するツール ※非公式アプリ

# usage
1. [takoyaki.html](./app/takoyaki.html)をダウンロードしてブラウザで開く ※Google Chromeで動作確認済み
2. E-mail, お客様番号, パスワードを入力
3. データを取得したい範囲を指定
4. Download ボタンをクリック

# file format
- csv形式

|date|power consumption|estimate cost|
|----|-----------------|-------------|
|2024-09-01T00:00:00+00:00|0.100000|2.96|
|...|...|...|

- date: 日付
- power consumption: 消費電力
- estimate cost: 推定料金（実際の請求とは誤差が生じうる）