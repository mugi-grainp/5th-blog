const copyArticleTitleAndLinkButton = document.getElementById('copy-article-title-and-link-button')
copyArticleTitleAndLinkButton.addEventListener('click',
    e => {
        const siteTitle = '青竹雑記帖（5代目）'
        const articleTitle = document.getElementById('article-title')
        const strSiteTitleAndArticleTitle = siteTitle + " - " + articleTitle.textContent
        const linkUrl = document.URL
        const allText = strSiteTitleAndArticleTitle + "\r\n" + linkUrl

        // クリップボード操作
        navigator.clipboard.writeText(allText).then(
            () => {
                // 成功
                copyArticleTitleAndLinkButton.textContent = 'コピーしました!'
            },
            () => {
                // 失敗
                copyArticleTitleAndLinkButton.textContent = 'コピーできませんでした'
            }
        )
})
