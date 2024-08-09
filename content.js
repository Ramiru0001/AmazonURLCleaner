(function() {
    let url = new URL(window.location.href);
    
    // URLパスから商品のASINを取得
    let asinMatch = url.pathname.match(/\/dp\/[A-Z0-9]{10}/);
    if (asinMatch) {
      let shortUrl = `${url.origin}${asinMatch[0]}`;
      
      // 評価数の要素を見つける
      let targetElement = document.querySelector('#acrCustomerReviewText');
      
      if (targetElement) {
        
          // 評価数の親要素を取得
          let parentElement = targetElement.parentNode;
          // 評価数の親要素の親要素を取得
          let grandparentElement = parentElement.parentNode;
          
          // 文字リンクの作成
          let link = document.createElement('span');
          link.textContent = 'CopyShortURL';
          link.style.marginLeft = '10px';
          link.style.color = '#007185';
          link.style.cursor = 'pointer';
          link.style.fontSize = '14px';
          //link.style.textDecoration = 'underline';
        
          // 通知メッセージを表示するための要素を作成
          let notification = document.createElement('div');
          notification.style.display = 'none'; // 初期状態では非表示
          notification.style.position = 'fixed';
          notification.style.bottom = '10px'; // 画面下から10px
          notification.style.right = '10px';  // 画面右から10px
          notification.style.backgroundColor = '#6c757d'; // グレーに設定
          notification.style.color = 'white';
          notification.style.padding = '10px';
          notification.style.borderRadius = '5px';
          notification.style.fontSize = '14px';
          notification.style.zIndex = '1000';
          notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';

          // リンクのクリックイベント
            link.addEventListener('click', function(event) {
                event.stopPropagation(); // クリックイベントの伝播を停止
                navigator.clipboard.writeText(shortUrl).then(function() {
                    // コピー成功時に通知メッセージを表示
                    notification.textContent = 'URL copied to clipboard!';
                    notification.style.display = 'inline'; // メッセージを表示
                    setTimeout(function() {
                        notification.style.display = 'none'; // 3秒後にメッセージを非表示
                    }, 3000);
                }, function(err) {
                    console.error('Failed to copy URL: ', err);
                });
            });

          // さらに一段階上の親要素にリンクを追加
          grandparentElement.style.position = 'relative'; // 親要素を相対位置に設定
          grandparentElement.appendChild(link);
          grandparentElement.appendChild(notification); // 通知メッセージを追加

      }
  }
  })();