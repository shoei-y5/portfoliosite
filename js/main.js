// 1) 必要な要素を取得
const menuToggle = document.querySelector('.menu-toggle');  // ハンバーガーアイコン
const slideMenu  = document.querySelector('.slide-menu');   // スライドメニュー全体

// 2) ハンバーガーアイコンのクリックでメニュー開閉
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  slideMenu.classList.toggle('open');
});

// 3) メニュー内のリンクをクリック → メニューを閉じる
const menuLinks = document.querySelectorAll('.slide-menu ul li a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    slideMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

// 4) メニュー外をクリック → メニューを閉じる
document.addEventListener('click', (event) => {
  // クリック対象が、スライドメニュー内部にもハンバーガーにも属していない
  if (
    !slideMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    slideMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  }
});


//モックアップ画像の切り替え
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".fade-img");
  let currentIndex = 0;

  function changeImage() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }

  setInterval(changeImage, 5000); // 3秒ごとに切り替え
});

//fade-in 
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("animated-text");
  const originalHTML = textElement.innerHTML;
  textElement.innerHTML = ""; // 一旦空にする

  function splitTextWithTags(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const elements = tempDiv.childNodes;
    let newHTML = "";

    elements.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // テキストノード（文字部分） → 1文字ずつ <span> にする
        [...node.textContent].forEach((char, index) => {
          if (char.trim() === "") {
            newHTML += " "; // 空白はそのまま
          } else {
            newHTML += `<span class="fade-char" style="animation-delay: ${index * 0.1}s">${char}</span>`;
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // HTMLタグの場合、そのままのタグを追加
        let outerHTML = node.outerHTML;
        if (node.innerHTML) {
          outerHTML = outerHTML.replace(node.innerHTML, splitTextWithTags(node.innerHTML));
        }
        newHTML += outerHTML;
      }
    });

    return newHTML;
  }

  textElement.innerHTML = splitTextWithTags(originalHTML);

  // アニメーションのクラスを追加（トリガー）
  setTimeout(() => {
    document.querySelectorAll(".fade-char").forEach((char) => {
      char.classList.add("show");
    });
  }, 500);
});


// #thoughts
document.addEventListener("DOMContentLoaded", () => {
  const thoughtsSection = document.querySelector("#thoughts .content");

  function fadeInOnScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const sectionTop = thoughtsSection.getBoundingClientRect().top + scrollY;
    
    if (scrollY + windowHeight > sectionTop + 100) { // 画面の少し前で発火
      thoughtsSection.classList.add("fade-in");
      window.removeEventListener("scroll", fadeInOnScroll); // 1回発火したら削除
    }
  }

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // 初回チェック
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // 画面遷移を防ぐ

    const formData = new FormData(form);

    fetch("send.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.trim() === "success") {
          alert("お問い合わせを送信しました。ありがとうございました！");
          form.reset(); // フォームをリセット
        } else {
          alert("お問い合わせの送信に失敗しました。");
        }
      })
      .catch((error) => {
        console.error("エラー:", error);
        alert("通信エラーが発生しました。");
      });
  });
});
