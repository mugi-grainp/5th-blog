---
postdate: 2021.08.03
keywords: 鉄道, 西鉄, 情報科学, データベース, プログラミング
copyright: Copyright(c) 2020-2021 麦（青竹） All rights reserved.
summary: 車両運用データベースシステムについてのまとめです。
---

# about-train-operation-database

## 車両運用データベースシステムの構築、そして爆速同人誌生成（総論）

　みなさま、ブログではお久しぶりです。毎日更新を掲げながら、結局三日坊主に終わりました。

　ブログを書いていない間は、本業の大学院生としての活動のほか、西鉄電車の車両運用関係資料
（車両運用表・箱ダイヤ・列車編成両数表）を一気に作り上げる活動をしていました。ここでは、
車両運用関係資料を作るために、私が構築した車両運用データベースと、そのまわりのシステム
についてまとめます。

　私はおよそ10年間、西鉄電車の車両運用について調べ続け、2016年からはその成果を同人誌と
してまとめて発表しています。今回作成する2021年3月改正の同人誌は、4回目の作成となります。
過去3回、私はLaTeXによる組版を実施して、書式設定の手間を半自動化しつつ、入力作業を完全
手作業でしていました。人間はミスを犯すもの、その成果物には初校の段階で数十箇所のミスが
見つかり、さらに刊行後に知り合いにチェックしてもらったところ、大幅な情報抜けが発覚する
などしてそのミスが数百箇所まで積み上がり、改訂版を発行するに至りました。ミスがあると死
に至るような危険な業務ではありませんが、このようなミスが恒常的に発生するのは私の沽券に
関わります。情報科学徒としても、ミスを防ぐためには、ミスを誘発する作業を自動化すること
が肝要です。我が師匠いわく、「膨大な作業を手でやる姿勢は、情報科学徒とはいえません」と
のことですし、プログラマの三大美徳として挙げられる「怠惰」「短気」「傲慢」を正しく実践
してこそ、我が存在が確立されるともいえます。

　そこで、私は車両運用情報をリレーショナルデータベースを用いて相互に関連付けながら集積し、
データベースから必要な情報を引っ張ってきてLaTeXコマンドを発行するプログラムを作りました。
また、今回初めて製作する箱ダイヤについても、Gnuplotコマンドを発行することにより、生成
自動化を達成しました。システムの利点は、プログラムにバグがない状態において、ミスは全て
データベースへのデータ入力ミスに限定することができます。ひとつのデータからプログラムを
使って各資料用の生成コマンドを発行するため、ひとつの資料で間違えた箇所は他すべての資料
でもミスとして見つかることになります。このことにより、違う観点から生成される資料を見比
べて、ミスの発見が容易になります。

　このシステムにより、完全手作業ではおよそ2か月半かかると見積っていたところを、設計に
2週間、並行してデータ入力に約2週間、成果物組版コマンド生成は一瞬、組版に1週間、校正に
1週間、全工程1か月で完成しました。システム構築部分を除く同人誌作成工程は実質半月です。
大幅に短い期間で、大幅に少ないミスで、さらに2種類から3種類に増えたダイヤへの対応ととも
に、新しい資料の作成を成し遂げられました。

　今回のシステムに使ったソフトウェアは、先人たちの成果の結晶を多く取り入れたものです。

- Ruby（プログラミング言語）：データ入力、組版用コマンド生成スクリプト製作に利用
- LaTeX（組版システム）：車両運用表、列車編成両数表の組版出力に利用
- LibreOffice Writer（ワープロソフト）：箱ダイヤの紙面組版に利用
- Gnuplot（グラフ生成システム）：箱ダイヤの生成に利用
- SQLite3（データベースシステム）：車両運用情報の蓄積に利用

　これらはすべて簡単に入手できます。あと必要なのは情報科学に関する知識と技術です。実際、
このシステムを作る際に、自分の持てる技術の総復習をして、一層技術力を向上させられたと思っ
ています。

　次回以降、システムの各要素を解説しようと思います。そしてその解説をもまた同人誌として
まとめることを考えています。気長にお待ちくだされば幸いです。

