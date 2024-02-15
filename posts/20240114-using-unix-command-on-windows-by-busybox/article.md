---
postdate: 2024.01.14
keywords:
copyright: Copyright(c) 2020-2024 麦（青竹） All rights reserved.
summary: WindowsでUNIXコマンドを使うよい手法を模索し、BusyBoxを試しました。
---

# using-unix-command-on-windows-by-busybox

## WindowsでUNIXコマンドを手軽に使う環境整備（BusyBox編）

### 近況報告（わたしはげんきです）

気付けば前回の記事を書いてから4か月が経ってしまっていました。寝たり起きたりご飯
やお菓子を食べたり、世の中のニュースや天変地異に驚いたりしていたらもう1月も半分
過ぎようとしています。時の流れが速いです。

### でもPCはげんきじゃありませんでした

その時の流れの中で、職場のパソコンが急に昇天したり、自宅のパソコンが急に昇天し
かかったのでWindowsを再インストールするなど環境再構築を繰り返していました。

自宅の環境はフルスペックの開発ができるようにするため、Windows Subsystem for 
Linux (WSL)やUbuntu仮想マシンなどの環境を手間暇かけて整えていましたが、職場のパ
ソコンではまだ再整備できていません。

職場のパソコンにもWSLを入れようと考えていたところでしたが、あれは地味に面倒で、
しかもWSLからWindowsのファイルシステムを操作するとスリーテンポくらい遅くなるの
で精神衛生上良くありません。ビルドとかしなくていいからWindowsの環境でUNIXコマン
ド群だけサクッと使いたいなー……

### BusyBoxによるUNIXコマンド環境構築

……と思って調べてようやく知ったのがBusyBoxでした。BusyBoxの存在はだいぶ前から知
っていましたが、WindowsでのUNIXコマンド実行環境整備にも使えるとは今の今まで知ら
なかったので、新年早々またひとつ賢くなりました。よきかなよきかな。

#### 1. BusyBoxのダウンロード

[BusyBoxの公式サイト](https://frippery.org/busybox/)ではLinux版およびそのソース
コードのみが入手可能ですので、Windows向けのバイナリを
[busybox-w32の配布サイト](https://frippery.org/busybox/)から入手します。最近の
Windowsは64ビット環境ですので、busybox64.exeの方をダウンロードすると良いです。

Windows 10や11を利用していて、UTF-8のファイルを主に扱うなど、PowerShellのコンソ
ール出力もUTF-8に揃えてしまっても良い場合は、busybox64u.exeを利用した方が面倒
がないかもしれません。

#### 2. BusyBox実行ファイルの配置とPath設定

ダウンロードしたbusybox64.exeを適当なディレクトリ（フォルダ）に配置し、そのディ
レクトリをWindowsのユーザー環境変数「Path」に加えるとインストール完了です。環境
変数設定手順は次の通りです。

1. 「設定 > システム > バージョン情報 > システムの詳細設定」と選んで「システムのプロパティ」画面を出す。
2. 「システムのプロパティ」画面で「環境変数」ボタンをクリックし、環境変数の一覧画面を出す。
3. 画面の「ユーザー環境変数」と書かれた欄の側にある「Path」を選択し、「編集」ボタンをクリックする。
4. クリックして出てきた画面で「新規」ボタンをクリックし、出てきた欄にbusybox64.exeの配置ディレクトリへのパスを記載する。

PowerShellを開き直すとBusyBoxが持つコマンドが使えるようになります。 `busybox64`
に続いて、呼び出したいコマンドを書きます。

    C:\Users\hogehoge\Documents> busybox64 uname -a
    Windows_NT HOGEHUGA-PC 10.0 22631 x86_64 MS/Windows

呼び出せるコマンドの一覧は `busybox64 --list` を実行すると表示できます。

#### 3. コマンド呼び出し用リンクの作成（オプション）

busybox-w32の作者はこのリンク作成を「コマンドとして用意はしているが推奨しない」
と述べており、上記のように頭に `busybox64` を付けて呼び出すか、BusyBoxでシェル 
(ash)を起動してから各種コマンドを実行するのが最も良いとの見解を示しています。

その理由のひとつとして、PowerShellとBusyBoxで同一名称のコマンドエイリアスがあっ
た際に、基本的にはPowerShellのエイリアスが優先して呼ばれるため、思った通りの実
行ができなくなる可能性があるからではないかと考えられます。

BusyBoxを配置したフォルダ以下にコマンド呼び出し用のリンクを作成する場合、
busybox64.exeをディレクトリC:\Users\hogehoge\BusyBox に置いた場合は、PowerShell
で次のコマンドを実行してください。

    C:\Users\hogehoge\BusyBox> busybox64 --install .\bin

これにより、C:\Users\hogehoge\BusyBox\binのディレクトリにBusyBoxが持つコマンド
へのリンクが生成され、頭に `busybox64` と付けずにコマンド名だけで実行できるよう
になります。

### PowerShell表示が文字化けした場合

Windowsの日本語環境は、今もShift_JIS (CP932) とUnicodeが入り交じるような形とな
っており、Unicode (とりわけUTF-8エンコーディング) のテキストファイルを
PowerShellで扱おうとすると画面表示が文字化けすることがあります。画面表示が文字
化けするだけでファイルの処理自体は行えていて、ファイルを別のテキストエディタ等
で開くとUTF-8で普通に読めますが、画面できちんと見たい場合はいくつか対策をする必
要があります。

#### (1) PowerShellの出力表示をUTF-8にして、BusyBoxのUnicode対応版を使う

最初のセクションで述べた、BusyBoxのUnicode対応版 (busybox64u.exe) をダウンロー
ドして配置します。次にPowerShellで次のコマンドを実行して、出力をUTF-8に変更して
ください。

    [Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding('utf-8')

設定を常に有効にするには、上記のコマンドをPowerShellプロファイルに記載します。
PowerShellのコマンドラインから `notepad $PROFILE` を実行するとプロファイルが開
かれるので、このコマンドを追記してください。

#### (2) BusyBoxの従来版を利用しつつ、画面表示の方だけをShift_JISに変更する

他のプログラムとの兼ね合いでPowerShellの出力エンコーディングを変更できない場合
は、パイプ機能とiconvコマンドにより、処理結果を画面に出す部分だけをShift_JISに
変更することができます。一例として、UTF-8のまま画面に出力されてしまうコマンド
sample-cmd1 があった場合、次のコマンドで文字化けを直して表示できます。

    sample-cmd1 | iconv -c -f utf8 -t sjis

iconvコマンドに -c オプションを指定することで、UTF-8からShift_JISに変換できない
文字が出現した場合にも処理を止めずに文字を飛ばして続行できます。UTF-8による正し
い出力を別ファイルに保持して確認したい場合は、

    sample-cmd1 > output-log-utf8.txt

あるいは、

    sample-cmd1 | tee output-log-utf8.txt | iconv -c -f utf8 -t sjis

とすると、output-log-utf8.txtにUTF-8で記録された出力が得られ、確認できます。

なお、後者のteeコマンドを呼び出す時、PowerShellの環境だとPowerShellのコマンドレ
ットTee-Object のエイリアスとして認識され、意図した通りの挙動が実現されないこと
があります。その時はashを起動して実行するか、 `busybox64 tee` と書き換えて、明
示的にBusyBoxのteeを呼び出してみてください。

### 課題

BusyBoxをWindows上で動かす場合、いくつか互換性がない仕様があります。

* UNIXでの実行を前提にしたシェルスクリプトを実行しようとすると、ディレクトリ構造やデバイス定義の違いによりエラーが出る。
    * `/dev/urandom` を明示的に呼び出している場合 → 別の乱数・ランダム文字列生成法への置き換えを試みる
    * 一時ファイルディレクトリとして `/tmp` を明示的に呼び出している場合 → `mktemp` を使って一時ファイルディレクトリを用意するよう変更

上記の課題が出てくるプログラムを作成実行する場面に遭遇したら、おそらくWSLや
Linux仮想マシンを構築するに値する状況であると思われますので、本格的環境構築をお
すすめします。
