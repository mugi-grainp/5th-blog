---
postdate: 2021.03.27
keywords: コンピュータ, Vim
copyright: Copyright(c) 2020-2021 麦（青竹） All rights reserved.
summary: WSL上のVimでクリップボードを有効化する作業をしました。
---

# enable-vim-clipboard-on-wsl

## WSL上のLinuxで動かしているVimとクリップボードを連携させる手順

### はじめに

わたしはVimが好きです。そしてUNIX的なコマンドが使える環境が好きです。今まで
Windows上でGVimを主に使ってきましたが、最近、Windows Subsystem for Linux上の
LinuxでCUI版Vimを利用するようになりました。

基本的にはVimのパッケージをそのままインストール（Ubuntuでしたら apt install vim）
して設定すれば最高の環境が得られますが、ひとつだけ問題があります。パッケージとし
て配布されているVimはクリップボード連携機能が無効化されてビルドされています。そ
のままでは、Windowsの他のアプリケーションとの間でやり取りするのに苦労します。

クリップボードを利用できるようにするにはいくつか方法がありますが、そのうちのひと
つ、VcXsrv Windows X Server を利用する方法を紹介します。

### 手順概略

1. Vimの機能有効化状態を確認
1. Vimをクリップボード機能有効にしてビルド
1. VcXsrv をセットアップ
1. VcXsrv に接続

### 1. Vimの機能有効化状態を確認

Vimを起動した状態で「:version」コマンドを実行するか、シェルコマンドラインから次
のコマンドを実行します。

    $ vim --version

このときに、「+clipboard」とあればクリップボード機能は有効化されていますので手順
3に進んでください。「-clipboard」でしたら、手順2のビルド作業をします。

ビルド作業をするのでしたら、ついでに各種スクリプト言語のインタプリタとの連携機能
も有効化しておくと、将来的にいろいろ捗るかもしれません。「python」「python3」
「ruby」「lua」などについて、頭に「-」がついていたら手順2で有効化できます。

### 2. Vimをクリップボード機能有効にしてビルド

基本的に、必要な（必要そうな）ライブラリを入れて make すると完了です。

    # ビルドのために最低限必要なツールを導入
    $ sudo apt install git gettext libtinfo-dev libacl1-dev libgpm-dev build-essential
    
    # Python2, Python3, Ruby, Lua, Perl連携に必要なツールとライブラリを導入
    $ sudo apt install python python-dev python3 python3-dev ruby ruby-dev lua5.3 liblua5.3-dev libperl-dev
    
    # GitHubから最新版のVimをクローン
    $ git clone https://github.com/vim/vim.git
    
    # ビルドオプションの設定
    $ cd vim/src
    $ ./configure --with-features=huge \
                  --disable-gui \
                  --enable-perlinterp=dynamic \
                  --enable-pythoninterp=dynamic \
                  --enable-python3interp=dynamic \
                  --enable-rubyinterp=dynamic \
                  --enable-luainterp=dynamic \
                  --enable-fail-if-missing
    
    # ビルドとインストール
    $ make
    $ sudo make install
    
    # 新しい Vim が呼び出せるように、コマンドへのパスのキャッシュを再構築
    $ hash -r

各インタプリタ連携については、不要なものは外しても大丈夫です。また、連携するため
のライブラリはすべてダイナミックリンクとしています。GUIについては利用しないため
無効化しました。

インストール後の最後の手順は重要です。コマンドへのパスのキャッシュがあると、意図
しない（もとのバージョンの）方のVimを呼び出してしまいます。キャッシュを再構築す
ることで新しいVimを呼び出せるようにします。

### 3. VcXsrv をセットアップ

続いて、VcXsrv Windows X Server をセットアップします。

1. <a href="https://sourceforge.net/projects/vcxsrv/">https://sourceforge.net/projects/vcxsrv/</a> からプログラムをダウンロードしてインストールします。
1. XLaunch を実行します。Disable access control <- これをチェックすることを忘れずに。Save Configuration ボタンをクリックして、 C:\Users\<Your User Name>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\config.xlaunchにファイルを保存すると、自動起動できます。

1. Windowsファイアウォール通信許可のダイアログが出たら、VcXsrvを許可するよう設定します。

### 4. VcXsrv に接続

WSLのバージョンが1であるか、2であるかによって、設定すべき内容が変わります。

    # WSL 1 の場合
    export DISPLAY=localhost:0.0

    # WSL 2 の場合
    LOCAL_IP=$(cat /etc/resolv.conf | grep nameserver | cut -d' ' -f2)
    export DISPLAY=$LOCAL_IP:0.0

上記のコマンドを .bashrc など、利用しているシェルの起動スクリプトに記述してくだ
さい。

以上で手順は終わりです。よいVimライフを！

### 参考文献

- <a href="https://qiita.com/necojackarc/items/8129ed9e6d8083aec34a1">Qiita - Ubuntu on WSL2 上の Vim でクリップボード連携</a>
- <a href="https://vim-jp.org/docs/build_linux.html">vim-jp - Linuxでのビルド方法</a>

